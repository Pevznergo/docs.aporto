"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "./AIModelsPageClient";

type PricingModel = {
    model_name: string;
    vendor_id: number;
    model_ratio: number;
    completion_ratio: number;
    supported_endpoint_types?: string[];
    billing_mode?: string;
    billing_expr?: string;
};

type PricingResponse = {
    success: boolean;
    data: PricingModel[];
    vendors: { id: number; name: string }[];
    pricing_version: string;
    quota_per_unit: number;
};

const TOKEN_LABELS: Record<Locale, Record<string, string>> = {
    en: { p: "Input", c: "Output", img: "Image input", img_o: "Image output", cr: "Cache read", cc: "Cache write" },
    ru: { p: "Ввод", c: "Вывод", img: "Изображение на входе", img_o: "Изображение на выходе", cr: "Чтение кеша", cc: "Запись кеша" },
};

const money = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 6 })}`;

function priceLabels(model: PricingModel, quotaPerUnit: number, locale: Locale) {
    if (model.billing_mode === "tiered_expr" && model.billing_expr) {
        const matches = [...model.billing_expr.matchAll(/\b(img_o|img|p|c|cr|cc)\s*\*\s*([0-9.]+)/g)];
        const labels = [...new Set(matches.map(([, token, value]) => `${TOKEN_LABELS[locale][token]} ${money(Number(value))}/1M`))];
        if (labels.length) return labels;
    }

    const input = model.model_ratio * (1_000_000 / quotaPerUnit);
    return [`${TOKEN_LABELS[locale].p} ${money(input)}/1M`, `${TOKEN_LABELS[locale].c} ${money(input * model.completion_ratio)}/1M`];
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
    } : {
        title: "Models & Pricing",
        description: (count: number) => `Live gateway pricing for ${count} models. Token prices are in USD per 1 million tokens and may vary by modality or cache tier.`,
        search: "Search models",
        loading: "Loading current model pricing…",
        unavailable: "Pricing is unavailable.",
        showing: (count: number, version: string) => `Showing ${count} models · Pricing version ${version}`,
        headings: ["Model", "Provider", "Pricing", "Endpoints"],
    };

    useEffect(() => {
        fetch("/api/model-pricing")
            .then(async (response) => {
                const payload = await response.json();
                if (!response.ok || payload.success !== true) throw new Error(payload.message || copy.unavailable);
                setPricing(payload);
            })
            .catch((reason) => setError(reason instanceof Error ? reason.message : copy.unavailable));
    }, [copy.unavailable]);

    const vendors = useMemo(
        () => new Map((pricing?.vendors || []).map((vendor) => [vendor.id, vendor.name])),
        [pricing],
    );
    const models = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return (pricing?.data || [])
            .filter((model) => !needle || model.model_name.toLowerCase().includes(needle) || (vendors.get(model.vendor_id) || "").toLowerCase().includes(needle))
            .sort((a, b) => a.model_name.localeCompare(b.model_name));
    }, [pricing, query, vendors]);

    if (error) return <p style={{ color: '#ff8a8a' }}>{error}</p>;
    if (!pricing) return <p style={{ color: '#888' }}>{copy.loading}</p>;

    return (
        <section aria-labelledby="model-pricing-heading">
            <h2 id="model-pricing-heading" style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{copy.title}</h2>
            <p style={{ color: '#888', marginBottom: '24px' }}>
                {copy.description(pricing.data.length)}
            </p>
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
                                    {priceLabels(model, pricing.quota_per_unit, locale).map((label) => <div key={label}>{label}</div>)}
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
