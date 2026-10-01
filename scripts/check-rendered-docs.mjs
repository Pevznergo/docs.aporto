import assert from "node:assert/strict";

const base = process.env.DOCS_BASE_URL || "http://127.0.0.1:3002";

let ready = false;
for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
        const response = await fetch(`${base}/quick-start`);
        if (response.ok) {
            ready = true;
            break;
        }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
}
assert.ok(ready, "docs server did not become ready");

const english = await (await fetch(`${base}/quick-start`)).text();
assert.match(english, /<html lang="en"/);
assert.match(english, /Quick Start/);

const russian = await (await fetch(`${base}/ru/quick-start`)).text();
assert.match(russian, /<html lang="ru"/);
assert.match(russian, /Быстрый старт/);
assert.match(russian, /href="\/ru\/api-reference"/);

const endpoints = await (await fetch(`${base}/ru/capabilities/ai-models?tab=endpoints`)).text();
assert.match(endpoints, /<html lang="ru"/);
assert.match(endpoints, /Эндпоинты API/);

const legacy = await fetch(`${base}/capabilities/ai-models?tab=pricing&lang=ru`, { redirect: "manual" });
assert.equal(legacy.status, 308);
const legacyTarget = new URL(legacy.headers.get("location"), base);
assert.equal(legacyTarget.pathname, "/ru/capabilities/ai-models");
assert.equal(legacyTarget.search, "?tab=pricing");

const redirected = await fetch(`${base}/ru/integration/http-clients/fetch`, { redirect: "manual" });
assert.equal(redirected.status, 308);
assert.equal(new URL(redirected.headers.get("location"), base).pathname, "/ru/quick-start");

console.log("PASS: rendered EN/RU pages, metadata locale, and canonical redirects");
