"use client";

import { useEffect, useMemo, useState } from "react";
import { FX_CACHE_MS, cacheSeconds, isCurrentQuote } from "@/lib/model-pricing";
import type { Locale } from "./AIModelsPageClient";

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

type Fx = {
    cbrRate: number;
    cbrDate: string;
    effectiveDate: string;
    requestedDate: string;
    checkedAt: string;
    multiplier: number;
    rubPerUsd: number;
};

type PricingResponse = {
    success: boolean;
    data: PricingModel[];
    vendors: { id: number; name: string }[];
    pricing_version: string;
    quota_per_unit: number;
    fx: Fx | null;
};

const TOKEN_LABELS: Record<Locale, Record<string, string>> = {
    en: { p: "Input", c: "Output", img: "Image input", img_o: "Image output", ai: "Audio input", cr: "Cache read", cc: "Cache write", cc1h: "1h cache write" },
    ru: { p: "Ввод", c: "Вывод", img: "Изображение на входе", img_o: "Изображение на выходе", ai: "Аудио на входе", cr: "Чтение кеша", cc: "Запись кеша", cc1h: "Запись кеша на 1 ч" },
};

const money = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;
const rubles = (value: number, fx: Fx) =>
    `${(value * fx.rubPerUsd).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽`;

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
        description: (count: number) => `Актуальные тарифы для ${count} моделей. Цены указаны в долларах США за 1 млн токенов и могут различаться по типу данных и кешированию.`,
        search: "Поиск моделей",
        loading: "Загружаем актуальные цены…",
        unavailable: "Цены временно недоступны.",
        showing: (count: number, version: string) => `Показано моделей: ${count} · Версия цен: ${version}`,
        headings: ["Модель", "Провайдер", "Цена", "Эндпоинты"],
        fxNote: (fx: Fx) =>
            `Действующий курс ЦБ РФ на ${new Date(`${fx.cbrDate}T00:00:00Z`).toLocaleDateString("ru-RU", { timeZone: "UTC" })}: 1 USD = ${fx.cbrRate.toLocaleString("ru-RU", { maximumFractionDigits: 4 })} ₽. ` +
            `Расчёт Aporto: USD-тариф × курс ЦБ × ${fx.multiplier.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}; ` +
            `${fx.rubPerUsd.toLocaleString("ru-RU", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ₽ за $1 тарифа. ` +
            `Проверено ${new Date(fx.checkedAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК. Баланс ведётся в USD, курс нового платежа фиксируется до оплаты.`,
        fxUnavailable: "Рублёвый расчёт временно недоступен: курс ЦБ не получен. USD-тарифы ниже остаются актуальными.",
        conditional: "Диапазон опубликованных ставок; итог зависит от условий тарифа.",
        conditionalOnly: "Условный тариф; точная ставка зависит от параметров запроса.",
        topUp: "Пополнить в рублях",
    } : {
        title: "Models & Pricing",
        description: (count: number) => `Live gateway pricing for ${count} models. Token prices are in USD per 1 million tokens and may vary by modality or cache tier.`,
        search: "Search models",
        loading: "Loading current model pricing…",
        unavailable: "Pricing is unavailable.",
        showing: (count: number, version: string) => `Showing ${count} models · Pricing version ${version}`,
        headings: ["Model", "Provider", "Pricing", "Endpoints"],
        fxNote: (_fx: Fx) => "",
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
                if (!response.ok || payload.success !== true) throw new Error(payload.message || copy.unavailable);
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
                    setError(reason instanceof Error ? reason.message : copy.unavailable);
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

    if (error) return <p style={{ color: '#ff8a8a' }}>{error}</p>;
    if (!pricing) return <p style={{ color: '#888' }}>{copy.loading}</p>;

    // Re-check on every render; the expiry timer clears the quote before refresh.
    const currentFx = isCurrentQuote(pricing.fx) ? pricing.fx : null;
    const showRubles = locale === "ru" && currentFx !== null;

    return (
        <section aria-labelledby="model-pricing-heading">
            <h2 id="model-pricing-heading" style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{copy.title}</h2>
            <p style={{ color: '#888', marginBottom: showRubles ? '12px' : '24px' }}>
                {copy.description(models.length)}
            </p>
            {showRubles && currentFx && (
                <>
                    <p style={{ color: '#888', marginBottom: '16px', fontSize: '14px' }}>{copy.fxNote(currentFx)}</p>
                    <a
                        href="https://app.aporto.tech/dashboard?lang=ru&topup=rub"
                        style={{ display: 'inline-block', marginBottom: '24px', padding: '10px 18px', background: '#6be195', color: '#04140b', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}
                    >
                        {copy.topUp}
                    </a>
                </>
            )}
            {locale === "ru" && !currentFx && (
                <p role="status" style={{ color: '#f0bd66', marginBottom: '24px', fontSize: '14px' }}>{copy.fxUnavailable}</p>
            )}
            <label style={{ display: 'block', marginBottom: '20px' }}>
                <span style={{ display: 'block', color: '#aaa', marginBottom: '8px', fontSize: '14px' }}>{copy.search}</span>
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="openai/gpt, claude, gemini…"
                    style={{ width: '100%', padding: '12px 14px', color: '#fff', background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
            </label>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
                {copy.showing(models.length, pricing.pricing_version)}
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333' }}>
                    <thead style={{ background: '#1a1a1a' }}>
                        <tr>
                            {copy.headings.map((heading) => (
                                <th key={heading} style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', color: '#fff', fontSize: '13px' }}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model) => (
                            <tr key={model.model_name}>
                                <td style={{ padding: '12px', border: '1px solid #333' }}><code style={{ color: '#e2e2e2' }}>{model.model_name}</code></td>
                                <td style={{ padding: '12px', border: '1px solid #333' }}>{vendors.get(model.vendor_id) || model.model_name.split('/')[0]}</td>
                                <td style={{ padding: '12px', border: '1px solid #333' }}>
                                    {priceLines(model, pricing.quota_per_unit, locale).map((line) => (
                                        <div key={`${line.token}:${line.minUsd}:${line.maxUsd}`}>
                                            {showRubles && currentFx ? (
                                                <>
                                                    {line.token}{' '}
                                                    {line.minUsd === line.maxUsd ? rubles(line.minUsd, currentFx) : `${rubles(line.minUsd, currentFx)}–${rubles(line.maxUsd, currentFx)}`}/1M{' '}
                                                    <span style={{ color: '#666', fontSize: '12px' }}>
                                                        ({line.minUsd === line.maxUsd ? money(line.minUsd) : `${money(line.minUsd)}–${money(line.maxUsd)}`})
                                                    </span>
                                                </>
                                            ) : (
                                                `${line.token} ${line.minUsd === line.maxUsd ? money(line.minUsd) : `${money(line.minUsd)}–${money(line.maxUsd)}`}/1M`
                                            )}
                                        </div>
                                    ))}
                                    {model.billing_mode === "tiered_expr" && (
                                        <small style={{ display: 'block', color: '#777', marginTop: '6px' }}>
                                            {priceLines(model, pricing.quota_per_unit, locale).length ? copy.conditional : copy.conditionalOnly}
                                        </small>
                                    )}
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #333', color: '#aaa' }}>{(model.supported_endpoint_types || []).join(', ') || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
