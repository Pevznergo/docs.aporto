"use client";

import { useState } from "react";
import EndpointsTab from "./EndpointsTab";
import ModelPricingTab from "./ModelPricingTab";

export type PageTab = "overview" | "endpoints" | "pricing";
export type Locale = "en" | "ru";

const codeStyle = {
    margin: 0,
    padding: '18px',
    overflowX: 'auto' as const,
    color: '#bbb',
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    fontSize: '13px',
};

export default function AIModelsPageClient({ initialPageTab, locale }: { initialPageTab: PageTab; locale: Locale }) {
    const [activePageTab, setActivePageTab] = useState<PageTab>(initialPageTab);
    const copy = locale === "ru" ? {
        title: "Модели и цены",
        intro: "Актуальные модели, совместимые API-эндпоинты и тарифы Aporto из одного живого каталога.",
        tabs: { overview: "Обзор", endpoints: "Эндпоинты", pricing: "Модели и цены" },
        tabList: "Документация LLM API",
        overviewTitle: "Выберите модель по совместимости",
        overview: "Получите список моделей для своего ключа через GET /v1/models или используйте вкладку цен. Полный ID модели передаётся в поле model.",
        next: "Цена зависит от модели и типа использования. Для рублёвого ориентира откройте вкладку цен: она применяет действующий курс ЦБ × 1,40 к тому же USD-тарифу.",
        quickStart: "Быстрый старт",
        apiReference: "Справочник API",
    } : {
        title: "Models & Pricing",
        intro: "Current Aporto models, compatible API endpoints, and tariffs from one live catalog.",
        tabs: { overview: "Overview", endpoints: "Endpoints", pricing: "Models & Pricing" },
        tabList: "LLM API documentation",
        overviewTitle: "Choose by endpoint compatibility",
        overview: "List the models available to your key with GET /v1/models or use the pricing tab. Send the full model ID in the model field.",
        next: "Prices vary by model and billable unit. The pricing tab reads the live USD tariff published by the gateway.",
        quickStart: "Quick Start",
        apiReference: "API Reference",
    };
    const prefix = locale === "ru" ? "/ru" : "";

    function selectPageTab(tab: PageTab) {
        setActivePageTab(tab);
        const url = new URL(window.location.href);
        if (tab === "overview") url.searchParams.delete("tab");
        else url.searchParams.set("tab", tab);
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }

    return (
        <div lang={locale} style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>{copy.title}</h1>
            <p style={{ fontSize: '20px', marginBottom: '48px', color: '#888' }}>{copy.intro}</p>

            <div role="tablist" aria-label={copy.tabList} style={{ display: 'flex', gap: '8px', marginBottom: '40px', borderBottom: '1px solid #333', overflowX: 'auto' }}>
                {([
                    ['overview', copy.tabs.overview],
                    ['endpoints', copy.tabs.endpoints],
                    ['pricing', copy.tabs.pricing],
                ] as const).map(([id, label]) => (
                    <button
                        key={id}
                        role="tab"
                        aria-selected={activePageTab === id}
                        onClick={() => selectPageTab(id)}
                        style={{
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activePageTab === id ? '2px solid #00dc82' : '2px solid transparent',
                            color: activePageTab === id ? '#00dc82' : '#888',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {activePageTab === 'pricing' ? <ModelPricingTab locale={locale} /> : activePageTab === 'endpoints' ? <EndpointsTab locale={locale} /> : (
                <section aria-labelledby="models-overview-heading">
                    <h2 id="models-overview-heading" style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{copy.overviewTitle}</h2>
                    <p style={{ color: '#aaa', marginBottom: '20px' }}>{copy.overview}</p>
                    <pre style={{ ...codeStyle, marginBottom: '24px' }}><code>{`curl https://api.aporto.tech/v1/models \\
  -H "Authorization: Bearer $APORTO_API_KEY"`}</code></pre>
                    <p style={{ color: '#888', marginBottom: '28px' }}>{copy.next}</p>
                    <p>
                        <a href={`${prefix}/quick-start`} style={{ color: '#00dc82', marginRight: '24px' }}>{copy.quickStart}</a>
                        <a href={`${prefix}/api-reference`} style={{ color: '#00dc82' }}>{copy.apiReference}</a>
                    </p>
                </section>
            )}
        </div>
    );
}
