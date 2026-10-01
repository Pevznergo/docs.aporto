"use client";

import { useEffect, useMemo, useState } from "react";
import { FX_CACHE_MS, cacheSeconds, isCurrentQuote, rubUsagePerUsd, type FxQuote } from "@/lib/model-pricing";
import type { Locale } from "./AIModelsPageClient";
import styles from "@/components/MarkdownRenderer.module.css";

type PricingModel = {
    model_name: string;
    vendor_id: number;
    model_ratio: number;
    completion_ratio: number;
    supported_endpoint_types?: string[];
    billing_mode?: string;
    billing_expr?: string;
    quota_type?: number;
    enable_groups?: string[];
};

/**
 * A published price is an offer, so only rows we can price correctly are shown.
 * Same rule main-aporto applies: default-group per-token billing only, and
 * never NewAPI's unconfigured-price fallback of ratio 37.5 with completion 1.
 * Conditional expressions stay visible as rate ranges; flattening them to one
 * number would hide the context, time, or modality condition.
 */
function isPublishable(model: PricingModel): boolean {
    if (!model.enable_groups?.includes("default")) return false;
    if (model.quota_type !== undefined && model.quota_type !== 0) return false;
    if (model.billing_mode === "tiered_expr") return Boolean(model.billing_expr);
    if (model.billing_mode || model.billing_expr) return false;
    const { model_ratio: ratio, completion_ratio: completion } = model;
    if (!Number.isFinite(ratio) || ratio <= 0 || !Number.isFinite(completion) || completion <= 0) return false;
    return !(ratio === 37.5 && completion === 1);
}

type PricingResponse = {
    success: boolean;
    data: PricingModel[];
    vendors: { id: number; name: string }[];
    pricing_version: string;
    quota_per_unit: number;
    fx: FxQuote | null;
};

const TOKEN_LABELS: Record<Locale, Record<string, string>> = {
    en: { p: "Input", c: "Output", img: "Image input", img_o: "Image output", ai: "Audio input", cr: "Cache read", cc: "Cache write", cc1h: "1h cache write" },
    ru: { p: "Ввод", c: "Вывод", img: "Изображение на входе", img_o: "Изображение на выходе", ai: "Аудио на входе", cr: "Чтение кеша", cc: "Запись кеша", cc1h: "Запись кеша на 1 ч" },
};

const money = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
const rubles = (value: number, fx: FxQuote) =>
    `${(value * rubUsagePerUsd(fx.cbrRate)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽`;

type PriceLine = { token: string; minUsd: number; maxUsd: number };

function priceLines(model: PricingModel, quotaPerUnit: number, locale: Locale): PriceLine[] {
    if (model.billing_mode === "tiered_expr" && model.billing_expr) {
        // A service-tier multiplier wraps the whole expression, so token-only
        // extraction cannot state its complete range honestly.
        if (model.billing_expr.includes('param("service_tier")')) return [];
        const rates = new Map<string, number[]>();
        for (const [, token, value] of model.billing_expr.matchAll(/\b(img_o|cc1h|img|ai|cr|cc|p|c)\s*\*\s*([0-9.]+)/g)) {
            const rate = Number(value);
            if (Number.isFinite(rate)) rates.set(token, [...(rates.get(token) || []), rate]);
        }
        return [...rates].map(([token, values]) => ({
            token: TOKEN_LABELS[locale][token],
            minUsd: Math.min(...values),
            maxUsd: Math.max(...values),
        }));
    }

    const input = model.model_ratio * (1_000_000 / quotaPerUnit);
    return [
        { token: TOKEN_LABELS[locale].p, minUsd: input, maxUsd: input },
        { token: TOKEN_LABELS[locale].c, minUsd: input * model.completion_ratio, maxUsd: input * model.completion_ratio },
    ];
}

export default function ModelPricingTab({ locale }: { locale: Locale }) {
    const [pricing, setPricing] = useState<PricingResponse | null>(null);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const copy = locale === "ru" ? {
        title: "Модели и цены",
        description: (count: number) => `Актуальные тарифы для ${count} моделей. Суммы в ₽ показывают расчёт поддерживаемых текстовых запросов RUB-кошелька и не являются отметкой совместимости модели.`,
        search: "Поиск моделей",
        loading: "Загружаем актуальные цены…",
        unavailable: "Цены временно недоступны.",
        empty: "Модели не найдены.",
        showing: (count: number, version: string) => `Показано моделей: ${count} · Версия цен: ${version}`,
        headings: ["Модель", "Провайдер", "Цена", "Эндпоинты"],
        fxNote: (fx: FxQuote) =>
            `Действующий курс ЦБ РФ на ${new Date(`${fx.cbrDate}T00:00:00Z`).toLocaleDateString("ru-RU", { timeZone: "UTC" })}: 1 USD = ${fx.cbrRate.toLocaleString("ru-RU", { maximumFractionDigits: 4 })} ₽. ` +
            `Расчёт RUB-запроса: USD-тариф × курс ЦБ × ${fx.multiplier.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} без промежуточного округления; ` +
            `≈ ${rubUsagePerUsd(fx.cbrRate).toLocaleString("ru-RU", { maximumFractionDigits: 6 })} ₽ за $1 тарифа. Итоговая денежная сумма округляется один раз. ` +
            `Проверено ${new Date(fx.checkedAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК. Ставка фиксируется до запроса; пополнение RUB-кошелька зачисляется 1:1 и её не использует.`,
        fxUnavailable: "Свежий проверенный курс ЦБ РФ не получен. USD-тарифы ниже остаются актуальными; RUB-запросы выполняются только со свежей ставкой.",
        conditional: "Диапазон опубликованных ставок; итог зависит от условий тарифа.",
        conditionalOnly: "Условный тариф; точная ставка зависит от параметров запроса.",
        topUp: "Открыть RUB-кошелёк",
    } : {
        title: "Models & Pricing",
        description: (count: number) => `Live gateway pricing for ${count} models. Token prices are in USD per 1 million tokens and may vary by modality or cache tier.`,
        search: "Search models",
        loading: "Loading current model pricing…",
        unavailable: "Pricing is unavailable.",
        empty: "No models found.",
        showing: (count: number, version: string) => `Showing ${count} models · Pricing version ${version}`,
        headings: ["Model", "Provider", "Pricing", "Endpoints"],
        fxNote: (_fx: FxQuote) => "",
        fxUnavailable: "",
        conditional: "Published rate range; the applied rate depends on tariff conditions.",
        conditionalOnly: "Conditional tariff; the exact rate depends on request parameters.",
        topUp: "",
    };

    useEffect(() => {
        let cancelled = false;
        let timer: number | undefined;
        const schedule = (delay: number, clearFx = false) => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                if (clearFx && !cancelled) {
                    setPricing((current) => current ? { ...current, fx: null } : current);
                }
                if (document.visibilityState === "visible") void load();
            }, delay);
        };
        const load = (): Promise<void> => {
            window.clearTimeout(timer);
            setPricing((current) => current?.fx && !isCurrentQuote(current.fx) ? { ...current, fx: null } : current);
            return fetch("/api/model-pricing", { cache: "no-store" }).then(async (response) => {
                const payload = await response.json();
                if (!response.ok || payload.success !== true) throw new Error(copy.unavailable);
                if (!Array.isArray(payload.data) || !Array.isArray(payload.vendors) || !Number.isFinite(payload.quota_per_unit) || payload.quota_per_unit <= 0) {
                    throw new Error(copy.unavailable);
                }
                const fx = isCurrentQuote(payload.fx) ? payload.fx : null;
                if (!cancelled) {
                    setPricing({ ...payload, fx });
                    setError("");
                    const now = new Date();
                    schedule(
                        fx
                            ? Math.max(1_000, Math.min(
                                Date.parse(fx.checkedAt) + FX_CACHE_MS - now.getTime(),
                                cacheSeconds(now, 24 * 60 * 60) * 1_000,
                            ))
                            : 5 * 60 * 1000,
                        Boolean(fx),
                    );
                }
            })
            .catch((reason) => {
                if (!cancelled) {
                    setError(reason instanceof Error && reason.message === copy.unavailable ? reason.message : copy.unavailable);
                    schedule(60_000);
                }
            });
        };
        const refreshVisible = () => {
            if (document.visibilityState === "visible") void load();
        };
        void load();
        document.addEventListener("visibilitychange", refreshVisible);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            document.removeEventListener("visibilitychange", refreshVisible);
        };
    }, [copy.unavailable]);

    const vendors = useMemo(
        () => new Map((pricing?.vendors || []).map((vendor) => [vendor.id, vendor.name])),
        [pricing],
    );
    const models = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return (pricing?.data || [])
            .filter(isPublishable)
            .filter((model) => !needle || model.model_name.toLowerCase().includes(needle) || (vendors.get(model.vendor_id) || "").toLowerCase().includes(needle))
            .sort((a, b) => a.model_name.localeCompare(b.model_name));
    }, [pricing, query, vendors]);

    if (error) return <p role="alert" className={`${styles.state} ${styles.errorState}`}>{error}</p>;
    if (!pricing) return <p role="status" className={styles.state}>{copy.loading}</p>;

    // Re-check on every render; the expiry timer clears the quote before refresh.
    const currentFx = isCurrentQuote(pricing.fx) ? pricing.fx : null;
    const showRubles = locale === "ru" && currentFx !== null;
    const unit = locale === "ru" ? "/1 млн" : "/1M";

    return (
        <section aria-labelledby="model-pricing-heading">
            <h2 id="model-pricing-heading">{copy.title}</h2>
            <p className={styles.pricingIntro}>
                {copy.description(models.length)}
            </p>
            {showRubles && currentFx && (
                <>
                    <p className={styles.fxNote}>{copy.fxNote(currentFx)}</p>
                    <a
                        href="https://app.aporto.tech/dashboard?wallet=RUB&lang=ru"
                        className={styles.primaryAction}
                    >
                        {copy.topUp}
                    </a>
                </>
            )}
            {locale === "ru" && !currentFx && (
                <p role="status" className={styles.warning}>{copy.fxUnavailable}</p>
            )}
            <label className={styles.searchLabel}>
                <span className={styles.searchTitle}>{copy.search}</span>
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="openai/gpt, claude, gemini…"
                    className={styles.searchInput}
                />
            </label>
            <p className={styles.modelMeta}>
                {copy.showing(models.length, pricing.pricing_version)}
            </p>
            <div className={styles.tableWrap}>
                <table>
                    <thead>
                        <tr>
                            {copy.headings.map((heading) => (
                                <th key={heading}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!models.length && (
                            <tr>
                                <td colSpan={4}>{copy.empty}</td>
                            </tr>
                        )}
                        {models.map((model) => (
                            <tr key={model.model_name}>
                                <td><code>{model.model_name}</code></td>
                                <td>{vendors.get(model.vendor_id) || model.model_name.split('/')[0]}</td>
                                <td>
                                    {priceLines(model, pricing.quota_per_unit, locale).map((line) => (
                                        <div key={`${line.token}:${line.minUsd}:${line.maxUsd}`}>
                                            {showRubles && currentFx ? (
                                                <>
                                                    {line.token}{' '}
                                                    ≈ {line.minUsd === line.maxUsd ? rubles(line.minUsd, currentFx) : `${rubles(line.minUsd, currentFx)}–${rubles(line.maxUsd, currentFx)}`}{unit}{' '}
                                                    <span className={styles.secondaryPrice}>
                                                        ({line.minUsd === line.maxUsd ? money(line.minUsd) : `${money(line.minUsd)}–${money(line.maxUsd)}`})
                                                    </span>
                                                </>
                                            ) : (
                                                `${line.token} ${line.minUsd === line.maxUsd ? money(line.minUsd) : `${money(line.minUsd)}–${money(line.maxUsd)}`}${unit}`
                                            )}
                                        </div>
                                    ))}
                                    {model.billing_mode === "tiered_expr" && (
                                        <small className={styles.tierNote}>
                                            {priceLines(model, pricing.quota_per_unit, locale).length ? copy.conditional : copy.conditionalOnly}
                                        </small>
                                    )}
                                </td>
                                <td>{(model.supported_endpoint_types || []).join(', ') || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
