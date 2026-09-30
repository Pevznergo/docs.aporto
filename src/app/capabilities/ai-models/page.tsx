import AIModelsPageClient, { type PageTab } from "./AIModelsPageClient";

type PageProps = {
    searchParams: Promise<{ tab?: string | string[]; lang?: string | string[] }>;
};

export default async function AIModelsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const tab = params.tab;
    const initialPageTab: PageTab = tab === "endpoints" || tab === "pricing" ? tab : "overview";
    const locale = params.lang === "ru" ? "ru" : "en";
    return <AIModelsPageClient key={`${initialPageTab}:${locale}`} initialPageTab={initialPageTab} locale={locale} />;
}
