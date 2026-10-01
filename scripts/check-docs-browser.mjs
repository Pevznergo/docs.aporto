import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:3002";
const output = resolve(process.argv[3] || "browser-out");
await mkdir(output, { recursive: true });

const errors = [];
const browser = await chromium.launch({ headless: true });

async function openPage(viewport) {
    const page = await browser.newPage({ viewport });
    assert.deepEqual(
        await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight })),
        viewport,
        `browser viewport must be ${viewport.width}×${viewport.height}`,
    );
    page.on("console", (message) => {
        if (message.type() === "error") errors.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
    return page;
}

async function checkDocument(page, locale, path, heading) {
    const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    assert.ok(response?.ok(), `${path} returned ${response?.status()}`);
    assert.equal(await page.locator("html").getAttribute("lang"), locale, `${path} has the wrong html lang`);
    assert.equal((await page.locator("h1").first().textContent())?.trim(), heading, `${path} has the wrong heading`);
    const width = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(width.scroll <= width.client + 1, `${path} overflows horizontally (${width.scroll} > ${width.client})`);
}

try {
    const desktop = await openPage({ width: 1440, height: 1000 });
    await desktop.route("**/api/model-pricing", (route) => route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: [], vendors: [], pricing_version: "ci", quota_per_unit: 500000, fx: null }),
    }));
    for (const [locale, path, heading] of [
        ["ru", "/ru/introduction", "Aporto LLM API"],
        ["ru", "/ru/quick-start", "Быстрый старт"],
        ["ru", "/ru/api-reference", "Справочник API"],
        ["ru", "/ru/billing", "Баланс и оплата"],
        ["en", "/introduction", "Aporto LLM API"],
        ["en", "/quick-start", "Quick Start"],
        ["en", "/api-reference", "API Reference"],
        ["en", "/billing", "Billing"],
    ]) {
        await checkDocument(desktop, locale, path, heading);
    }

    await checkDocument(desktop, "ru", "/ru/introduction", "Aporto LLM API");
    await desktop.screenshot({ path: `${output}/docs-ru-desktop.png`, fullPage: true });
    await checkDocument(desktop, "en", "/introduction", "Aporto LLM API");
    await desktop.screenshot({ path: `${output}/docs-en-desktop.png`, fullPage: true });
    await checkDocument(desktop, "ru", "/ru/billing", "Баланс и оплата");
    await desktop.screenshot({ path: `${output}/docs-ru-wallets-desktop.png`, fullPage: true });

    await desktop.goto(`${base}/ru/capabilities/ai-models#request`, { waitUntil: "networkidle" });
    await desktop.getByRole("tab", { name: "Эндпоинты", exact: true }).click();
    assert.equal(new URL(desktop.url()).search, "?tab=endpoints");
    assert.equal(new URL(desktop.url()).hash, "#request");
    let englishSwitch = desktop.locator('a[hreflang="en"]');
    await desktop.waitForFunction(() => document.querySelector('a[hreflang="en"]')?.getAttribute("href")?.includes("tab=endpoints#request"));
    assert.equal(
        new URL(await englishSwitch.getAttribute("href"), base).href,
        `${base}/capabilities/ai-models?tab=endpoints#request`,
    );
    await Promise.all([
        desktop.waitForURL(`${base}/capabilities/ai-models?tab=endpoints#request`),
        englishSwitch.click(),
    ]);
    assert.equal(await desktop.locator("html").getAttribute("lang"), "en");
    assert.equal(await desktop.getByRole("tab", { name: "Endpoints", exact: true }).getAttribute("aria-selected"), "true");

    await desktop.goto(`${base}/ru/capabilities/ai-models?tab=endpoints`, { waitUntil: "networkidle" });
    await Promise.all([
        desktop.waitForURL(`${base}/ru/capabilities/ai-models?tab=pricing`),
        desktop.getByRole("link", { name: "Модели и цены", exact: true }).click(),
    ]);
    await desktop.evaluate(() => { window.location.hash = "request"; });
    await desktop.waitForURL(`${base}/ru/capabilities/ai-models?tab=pricing#request`);
    englishSwitch = desktop.locator('a[hreflang="en"]');
    await desktop.waitForFunction(() => document.querySelector('a[hreflang="en"]')?.getAttribute("href")?.includes("tab=pricing#request"));
    await Promise.all([
        desktop.waitForURL(`${base}/capabilities/ai-models?tab=pricing#request`),
        englishSwitch.click(),
    ]);
    assert.equal(await desktop.locator("html").getAttribute("lang"), "en");
    assert.equal(await desktop.getByRole("tab", { name: "Models & Pricing", exact: true }).getAttribute("aria-selected"), "true");

    const mobile = await openPage({ width: 390, height: 844 });
    await checkDocument(mobile, "ru", "/ru/quick-start", "Быстрый старт");
    await mobile.getByRole("button", { name: "Открыть навигацию" }).click();
    const apiLink = mobile.getByRole("link", { name: "Справочник API", exact: true });
    assert.equal(new URL(await apiLink.getAttribute("href"), base).pathname, "/ru/api-reference");
    await apiLink.waitFor({ state: "visible" });
    await mobile.waitForFunction(() => Math.abs(document.querySelector("aside").getBoundingClientRect().x) < 1);
    await mobile.screenshot({ path: `${output}/docs-ru-mobile.png`, fullPage: true });
    await Promise.all([
        mobile.waitForURL(`${base}/ru/api-reference`),
        apiLink.click(),
    ]);
    assert.equal(await mobile.locator("html").getAttribute("lang"), "ru");
    assert.equal((await mobile.locator("h1").textContent())?.trim(), "Справочник API");
    await checkDocument(mobile, "ru", "/ru/billing", "Баланс и оплата");
    await mobile.screenshot({ path: `${output}/docs-ru-wallets-mobile.png`, fullPage: true });

    assert.deepEqual(errors, []);
} finally {
    await browser.close();
}

console.log("PASS: desktop/mobile locale navigation, tabs, language switch, screenshots, and overflow");
