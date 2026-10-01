import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AIModelsPageClient, { type PageTab } from "../../capabilities/ai-models/AIModelsPageClient";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import { DOC_CONTENT, type DocPage } from "@/lib/docs-content";

type PageProps = {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ tab?: string | string[] }>;
};

const metadata: Record<DocPage | "capabilities/ai-models", { title: string; description: string }> = {
    introduction: {
        title: "Aporto LLM API — документация",
        description: "Обзор Aporto LLM API, совместимых эндпоинтов, моделей и тарификации.",
    },
    "quick-start": {
        title: "Быстрый старт — Aporto LLM API",
        description: "Первый запрос к Aporto LLM API через curl, Python или JavaScript.",
    },
    "api-reference": {
        title: "Справочник API — Aporto LLM API",
        description: "Авторизация, эндпоинты, потоковые ответы, ошибки и повторные запросы.",
    },
    billing: {
        title: "Оплата в USD и RUB — Aporto LLM API",
        description: "Тарифы моделей, баланс в USD и расчёт стоимости в рублях по курсу ЦБ РФ.",
    },
    "capabilities/ai-models": {
        title: "Модели и цены — Aporto LLM API",
        description: "Актуальные модели Aporto, совместимые эндпоинты и живые тарифы в USD и RUB.",
    },
};

const docPages = new Set<DocPage>(["introduction", "quick-start", "api-reference", "billing"]);

function pathFrom(slug?: string[]): string {
    return (slug || []).join("/");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const path = pathFrom((await params).slug);
    return metadata[path as keyof typeof metadata] || metadata.introduction;
}

export default async function RussianDocsPage({ params, searchParams }: PageProps) {
    const path = pathFrom((await params).slug);
    if (!path) redirect("/ru/introduction");

    if (docPages.has(path as DocPage)) {
        return <MarkdownRenderer content={DOC_CONTENT.ru[path as DocPage]} />;
    }

    if (path === "capabilities/ai-models") {
        const tab = (await searchParams).tab;
        const initialPageTab: PageTab = tab === "endpoints" || tab === "pricing" ? tab : "overview";
        return <AIModelsPageClient key={initialPageTab} initialPageTab={initialPageTab} locale="ru" />;
    }

    notFound();
}
