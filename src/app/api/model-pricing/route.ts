import { NextResponse } from "next/server";

const API_BASE = "https://api.aporto.tech/api";

export async function GET() {
    const headers = { "User-Agent": "Aporto Docs Pricing/1.0" };
    const [pricingResponse, statusResponse] = await Promise.all([
        fetch(`${API_BASE}/pricing`, { headers, next: { revalidate: 300 } }),
        fetch(`${API_BASE}/status`, { headers, next: { revalidate: 300 } }),
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
        },
        { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
    );
}
