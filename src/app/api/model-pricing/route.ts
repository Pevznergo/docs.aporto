import { NextResponse } from "next/server";

const API_BASE = "https://api.aporto.tech/api";
const CBR_URL = "https://www.cbr.ru/scripts/XML_daily.asp";
/** The rouble price of a dollar is the CBR rate times this. VAT is inside it. */
const RUB_MULTIPLIER = 1.3;

/**
 * The USD rate CBR published for today in Moscow. `date_req` is always sent:
 * without it CBR returns tomorrow's rate after ~11:30 Moscow time.
 * Any failure yields null — this route must keep serving prices.
 */
async function fetchCbrUsd(): Promise<{ cbrRate: number; cbrDate: string; multiplier: number; rubPerUsd: number } | null> {
    try {
        const moscowToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow" }).format(new Date());
        const [year, month, day] = moscowToday.split("-");
        const response = await fetch(`${CBR_URL}?date_req=${day}/${month}/${year}`, {
            headers: { "User-Agent": "Aporto Docs Pricing/1.0" },
            next: { revalidate: 3600 },
        });
        if (!response.ok) return null;
        const xml = await response.text();

        const usd = xml.match(/<CharCode>USD<\/CharCode>[\s\S]*?<Nominal>(\d+)<\/Nominal>[\s\S]*?<Value>([\d,.]+)<\/Value>/);
        const published = xml.match(/<ValCurs[^>]*\bDate="(\d{2})\.(\d{2})\.(\d{4})"/);
        if (!usd || !published) return null;

        const cbrRate = Number(usd[2].replace(",", ".")) / Number(usd[1]);
        if (!Number.isFinite(cbrRate) || cbrRate < 20 || cbrRate > 500) return null;
        const cbrDate = `${published[3]}-${published[2]}-${published[1]}`;
        // A rate dated after the request means the date was ignored.
        if (cbrDate > moscowToday) return null;

        return {
            cbrRate,
            cbrDate,
            multiplier: RUB_MULTIPLIER,
            rubPerUsd: Math.ceil(cbrRate * RUB_MULTIPLIER * 10_000) / 10_000,
        };
    } catch {
        return null;
    }
}

export async function GET() {
    const headers = { "User-Agent": "Aporto Docs Pricing/1.0" };
    const [pricingResponse, statusResponse, fx] = await Promise.all([
        fetch(`${API_BASE}/pricing`, { headers, next: { revalidate: 300 } }),
        fetch(`${API_BASE}/status`, { headers, next: { revalidate: 300 } }),
        fetchCbrUsd(),
    ]);

    if (!pricingResponse.ok || !statusResponse.ok) {
        return NextResponse.json({ success: false, message: "Pricing is temporarily unavailable." }, { status: 502 });
    }

    const [pricing, status] = await Promise.all([pricingResponse.json(), statusResponse.json()]);
    return NextResponse.json(
        {
            success: pricing.success === true,
            data: pricing.data,
            vendors: pricing.vendors,
            pricing_version: pricing.pricing_version,
            quota_per_unit: status.data?.quota_per_unit,
            fx,
        },
        { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
    );
}
