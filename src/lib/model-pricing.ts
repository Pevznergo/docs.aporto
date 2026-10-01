export const RUB_MULTIPLIER = 1.4;
export const FX_CACHE_MS = 15 * 60 * 1000;

export type FxQuote = {
    cbrRate: number;
    cbrDate: string;
    effectiveDate: string;
    requestedDate: string;
    checkedAt: string;
    multiplier: number;
    /** Legacy invoice quote rounded up to four places; do not use for RUB request tariffs. */
    rubPerUsd: number;
};

/** RUB request factor before the single final money rounding. */
export const rubUsagePerUsd = (cbrRate: number) => cbrRate * RUB_MULTIPLIER;

export const moscowDate = (date = new Date()) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow" }).format(date);

export function cacheSeconds(now = new Date(), limit = 5 * 60): number {
    const [year, month, day] = moscowDate(now).split("-").map(Number);
    const nextMidnight = Date.UTC(year, month - 1, day + 1) - 3 * 60 * 60 * 1000;
    return Math.max(1, Math.min(limit, Math.floor((nextMidnight - now.getTime()) / 1000)));
}

function validIsoDate(value: string): boolean {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function parseCbrUsd(xml: string, requestedDate: string, checkedAt: string): FxQuote {
    const usd = xml.match(/<CharCode>USD<\/CharCode>[\s\S]*?<Nominal>(\d+)<\/Nominal>[\s\S]*?<Value>([\d,.]+)<\/Value>/);
    const published = xml.match(/<ValCurs[^>]*\bDate="(\d{2})\.(\d{2})\.(\d{4})"/);
    if (!usd || !published) throw new Error("CBR response is missing the USD rate or date");

    const nominal = Number(usd[1]);
    const value = Number(usd[2].replace(",", "."));
    const cbrRate = value / nominal;
    if (!Number.isFinite(nominal) || nominal <= 0 || !Number.isFinite(cbrRate) || cbrRate < 20 || cbrRate > 500) {
        throw new Error("CBR returned an implausible USD rate");
    }

    const cbrDate = `${published[3]}-${published[2]}-${published[1]}`;
    if (!validIsoDate(cbrDate) || cbrDate > requestedDate) throw new Error("CBR returned an invalid or future date");

    return {
        cbrRate,
        cbrDate,
        effectiveDate: cbrDate,
        requestedDate,
        checkedAt,
        multiplier: RUB_MULTIPLIER,
        rubPerUsd: Math.ceil(rubUsagePerUsd(cbrRate) * 10_000) / 10_000,
    };
}

export function isCurrentQuote(quote: unknown, now = new Date()): quote is FxQuote {
    if (!quote || typeof quote !== "object") return false;
    const fx = quote as Partial<FxQuote>;
    const checkedAt = typeof fx.checkedAt === "string" ? Date.parse(fx.checkedAt) : NaN;
    const age = now.getTime() - checkedAt;
    const expected = typeof fx.cbrRate === "number"
        ? Math.ceil(rubUsagePerUsd(fx.cbrRate) * 10_000) / 10_000
        : NaN;
    return fx.requestedDate === moscowDate(now)
        && typeof fx.cbrDate === "string"
        && validIsoDate(fx.cbrDate)
        && fx.effectiveDate === fx.cbrDate
        && fx.cbrDate <= fx.requestedDate
        && typeof fx.cbrRate === "number"
        && Number.isFinite(fx.cbrRate)
        && fx.cbrRate >= 20
        && fx.cbrRate <= 500
        && fx.multiplier === RUB_MULTIPLIER
        && fx.rubPerUsd === expected
        && Number.isFinite(checkedAt)
        && age >= -60_000
        && age <= FX_CACHE_MS;
}
