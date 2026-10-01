"use client";

import { useState } from "react";
import EndpointsTab from "./EndpointsTab";
import ModelPricingTab from "./ModelPricingTab";
import styles from "@/components/MarkdownRenderer.module.css";

export type PageTab = "overview" | "endpoints" | "pricing";
export type Locale = "en" | "ru";

export default function AIModelsPageClient({ initialPageTab, locale }: { initialPageTab: PageTab; locale: Locale }) {
    const [activePageTab, setActivePageTab] = useState<PageTab>(initialPageTab);
    const copy = locale === "ru" ? {
        title: "Модели и цены",
        intro: "Актуальные модели, совместимые API-эндпоинты и тарифы Aporto из одного живого каталога.",
        tabs: { overview: "Обзор", endpoints: "Эндпоинты", pricing: "Модели и цены" },
        tabList: "Документация LLM API",
        overviewTitle: "Выберите модель по совместимости",
        overview: "Получите список моделей для своего ключа через GET /v1/models или используйте вкладку цен. Полный ID модели передаётся в поле model.",
        next: "Цена зависит от модели и типа использования. Для поддерживаемых текстовых запросов RUB-кошелька вкладка цен применяет действующий курс ЦБ × 1,40 к тому же USD-тарифу один раз.",
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
        <div lang={locale} className={`${styles.markdown} ${styles.modelDocs}`}>
            <h1>{copy.title}</h1>
            <p className={styles.modelIntro}>{copy.intro}</p>

            <div role="tablist" aria-label={copy.tabList} className={styles.tabs}>
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
                        className={styles.tab}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {activePageTab === 'pricing' ? <ModelPricingTab locale={locale} /> : activePageTab === 'endpoints' ? <EndpointsTab locale={locale} /> : (
                <section aria-labelledby="models-overview-heading">
                    <h2 id="models-overview-heading">{copy.overviewTitle}</h2>
                    <p className={styles.overviewCopy}>{copy.overview}</p>
                    <pre><code>{`curl https://api.aporto.tech/v1/models \\
  -H "Authorization: Bearer $APORTO_API_KEY"`}</code></pre>
                    <p className={styles.overviewNext}>{copy.next}</p>
                    <p className={styles.overviewLinks}>
                        <a href={`${prefix}/quick-start`}>{copy.quickStart}</a>
                        <a href={`${prefix}/api-reference`}>{copy.apiReference}</a>
                    </p>
                </section>
            )}
        </div>
    );
}
