import AIModelsPageClient, { type PageTab } from "./AIModelsPageClient";

type PageProps = {
    searchParams: Promise<{ tab?: string | string[] }>;
};

export default async function AIModelsPage({ searchParams }: PageProps) {
    const tab = (await searchParams).tab;
    const initialPageTab: PageTab = tab === "endpoints" || tab === "pricing" ? tab : "overview";
    return <AIModelsPageClient initialPageTab={initialPageTab} />;
}
