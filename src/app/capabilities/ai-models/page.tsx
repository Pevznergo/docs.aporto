import AIModelsPageClient, { type PageTab } from "./AIModelsPageClient";

type PageProps = {
    searchParams: Promise<{ tab?: string | string[]; lang?: string | string[] }>;
};

export default async function AIModelsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const tab = params.tab;
    const initialPageTab: PageTab = tab === "endpoints" || tab === "pricing" ? tab : "overview";
    return <AIModelsPageClient initialPageTab={initialPageTab} locale={params.lang === "ru" ? "ru" : "en"} />;
}
