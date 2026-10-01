import assert from "node:assert/strict";
import {
  RUB_MULTIPLIER,
  cacheSeconds,
  isCurrentQuote,
  parseCbrUsd,
  rubUsagePerUsd,
} from "../src/lib/model-pricing.ts";

const xml = (date = "30.09.2026", value = "83,5588") =>
  `<ValCurs Date="${date}"><Valute><CharCode>USD</CharCode><Nominal>1</Nominal><Value>${value}</Value></Valute></ValCurs>`;

const quote = parseCbrUsd(xml(), "2026-09-30", "2026-09-30T20:59:50.000Z");
assert.equal(RUB_MULTIPLIER, 1.4);
assert.equal(quote.effectiveDate, "2026-09-30");
assert.equal(quote.rubPerUsd, 116.9824, "legacy invoice quote remains rounded up for payload compatibility");
assert.ok(Math.abs(rubUsagePerUsd(quote.cbrRate) - 116.98232) < 1e-12);
assert.notEqual(rubUsagePerUsd(quote.cbrRate), quote.rubPerUsd, "usage must not use the rounded invoice quote");
assert.equal(isCurrentQuote(quote, new Date("2026-09-30T20:59:59.000Z")), true);
assert.equal(isCurrentQuote(quote, new Date("2026-09-30T21:00:00.000Z")), false);
assert.equal(cacheSeconds(new Date("2026-09-30T20:59:59.500Z")), 1);
assert.equal(cacheSeconds(new Date("2026-09-30T12:00:00.000Z")), 300);
const morningQuote = parseCbrUsd(xml(), "2026-09-30", "2026-09-30T09:00:00.000Z");
assert.equal(isCurrentQuote(morningQuote, new Date("2026-09-30T09:14:59.999Z")), true);
assert.equal(isCurrentQuote(morningQuote, new Date("2026-09-30T09:15:00.001Z")), false);

assert.doesNotThrow(() => parseCbrUsd(xml("27.09.2026"), "2026-09-28", "2026-09-28T09:00:00Z"));
assert.throws(() => parseCbrUsd(xml("01.10.2026"), "2026-09-30", "2026-09-30T09:00:00Z"));
assert.throws(() => parseCbrUsd(xml("31.02.2026"), "2026-09-30", "2026-09-30T09:00:00Z"));

console.log("PASS: CBR date, freshness, exact usage factor, legacy quote, and weekend checks");
