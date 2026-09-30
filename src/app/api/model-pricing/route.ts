import { NextResponse } from "next/server";
import {
    FX_CACHE_MS,
    cacheSeconds,
    isCurrentQuote,
    moscowDate,
    parseCbrUsd,
    type FxQuote,
} from "@/lib/model-pricing";

const API_BASE = "https://api.aporto.tech/api";
const CBR_URL = "https://www.cbr.ru/scripts/XML_daily.asp";

let fxCache: { quote: FxQuote; expiresAt: number } | null = null;

/**
 * The USD rate CBR published for today in Moscow. `date_req` is always sent:
 * without it CBR can return a rate before its Moscow effective date.
 * Any failure yields null — this route must keep serving prices.
 */
async function fetchCbrUsd(retryAfterMidnight = true): Promise<FxQuote | null> {
    try {
        const requestedDate = moscowDate();
        if (fxCache && fxCache.quote.requestedDate === requestedDate && fxCache.expiresAt > Date.now()) {
            return fxCache.quote;
        }
        const [year, month, day] = requestedDate.split("-");
        const response = await fetch(`${CBR_URL}?date_req=${day}/${month}/${year}`, {
            headers: { "User-Agent": "Aporto Docs Pricing/1.0" },
            cache: "no-store",
            signal: AbortSignal.timeout(4_000),
        });
        if (!response.ok) return null;
        const quote = parseCbrUsd(await response.text(), requestedDate, new Date().toISOString());
        if (!isCurrentQuote(quote)) return retryAfterMidnight ? fetchCbrUsd(false) : null;
        fxCache = { quote, expiresAt: Date.parse(quote.checkedAt) + FX_CACHE_MS };
        return quote;
    } catch {
        return null;
    }
}

export async function GET() {
    const headers = { "User-Agent": "Aporto Docs Pricing/1.0" };
    const [pricingResponse, statusResponse, firstFx] = await Promise.all([
        fetch(`${API_BASE}/pricing`, { headers, next: { revalidate: 300 } }).catch(() => null),
        fetch(`${API_BASE}/status`, { headers, next: { revalidate: 300 } }).catch(() => null),
        fetchCbrUsd(),
    ]);

    if (!pricingResponse?.ok || !statusResponse?.ok) {
        return NextResponse.json({ success: false, message: "Pricing is temporarily unavailable." }, { status: 502 });
    }

    const [pricing, status] = await Promise.all([pricingResponse.json(), statusResponse.json()]);
    const retriedFx = firstFx && !isCurrentQuote(firstFx) ? await fetchCbrUsd() : firstFx;
    const responseNow = new Date();
    const fx = retriedFx && isCurrentQuote(retriedFx, responseNow) ? retriedFx : null;
    return NextResponse.json(
        {
            success: pricing.success === true,
            data: pricing.data,
            vendors: pricing.vendors,
            pricing_version: pricing.pricing_version,
            quota_per_unit: status.data?.quota_per_unit,
            fx,
        },
        {
            headers: {
                "Cache-Control": `public, max-age=0, s-maxage=${cacheSeconds(
                    responseNow,
                    fx && fxCache ? Math.min(5 * 60, Math.max(1, Math.floor((fxCache.expiresAt - Date.now()) / 1000))) : 5 * 60,
                )}, must-revalidate`,
            },
        },
    );
}
