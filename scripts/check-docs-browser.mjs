import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:3002";
const output = resolve(process.argv[3] || "browser-out");
await mkdir(output, { recursive: true });

const errors = [];
const browser = await chromium.launch({ headless: true });
const origin = new URL(base).origin;
const requestedDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow" }).format(new Date());
const cbrRate = 92.5;
const pricingBody = JSON.stringify({
    success: true,
    data: [{
        model_name: "openai/gpt-ci",
        vendor_id: 1,
        model_ratio: 0.5,
        completion_ratio: 2,
        supported_endpoint_types: ["openai", "openai-response"],
        quota_type: 0,
        enable_groups: ["default"],
    }],
    vendors: [{ id: 1, name: "OpenAI" }],
    pricing_version: "ci",
    quota_per_unit: 500000,
    fx: {
        cbrRate,
        cbrDate: requestedDate,
        effectiveDate: requestedDate,
        requestedDate,
        checkedAt: new Date().toISOString(),
        multiplier: 1.4,
        rubPerUsd: Math.ceil(cbrRate * 1.4 * 10000) / 10000,
    },
});

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

async function routePricing(page, fail = false) {
    await page.route("**/api/model-pricing", (route) => route.fulfill({
        contentType: "application/json",
        body: fail ? JSON.stringify({ success: false }) : pricingBody,
    }));
}

async function assertTheme(page, theme) {
    await page.waitForFunction((expected) => {
        const button = document.querySelector('button[aria-label="Switch theme"], button[aria-label="Сменить тему"]');
        return document.documentElement.dataset.llmTheme === expected
            && button?.getAttribute("aria-pressed") === String(expected === "dark");
    }, theme);
    assert.equal(
        await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--background").trim()),
        theme === "dark" ? "#010106" : "#f4f6fc",
    );
}

async function switchTheme(page, theme) {
    const current = await page.locator("html").getAttribute("data-llm-theme");
    if (current !== theme) await page.getByRole("button", { name: /Switch theme|Сменить тему/ }).click();
    await assertTheme(page, theme);
}

async function checkContactLinks(scope, path) {
    for (const [name, href] of [
        [/^Email(?::|$)/, "mailto:pevzner@aporto.tech"],
        [/^Telegram(?::|$)/, "https://t.me/apitoai_bot"],
    ]) {
        const link = scope.getByRole("link", { name });
        assert.equal(await link.count(), 1, `${path} must expose one ${name.source} link`);
        assert.equal(await link.getAttribute("href"), href, `${path} has the wrong ${name.source} link`);
        assert.ok(await link.isVisible(), `${path} hides the ${name.source} link`);
    }
}

async function checkDocument(page, locale, path, heading) {
    const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    assert.ok(response?.ok(), `${path} returned ${response?.status()}`);
    assert.equal(await page.locator("html").getAttribute("lang"), locale, `${path} has the wrong html lang`);
    assert.equal((await page.locator("h1").first().textContent())?.trim(), heading, `${path} has the wrong heading`);
    await checkContactLinks(page.locator("header"), `${path} header`);
    if (path.endsWith("/introduction") || path.endsWith("/billing")) {
        await checkContactLinks(page.locator("main > div"), `${path} content`);
    }
    const width = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(width.scroll <= width.client + 1, `${path} overflows horizontally (${width.scroll} > ${width.client})`);
}

try {
    const precedence = await openPage({ width: 1024, height: 768 });
    await precedence.addInitScript(() => {
        try { localStorage.setItem("aporto-llm-theme", "dark"); } catch {}
    });
    await precedence.context().addCookies([{ name: "aporto-theme", value: "light", url: origin }]);
    await precedence.goto(`${base}/introduction`, { waitUntil: "networkidle" });
    await assertTheme(precedence, "light");
    await precedence.close();

    const legacy = await openPage({ width: 1024, height: 768 });
    await legacy.addInitScript(() => {
        try { localStorage.setItem("aporto-llm-theme", "dark"); } catch {}
    });
    await legacy.goto(`${base}/introduction`, { waitUntil: "networkidle" });
    await assertTheme(legacy, "dark");
    await switchTheme(legacy, "light");
    assert.deepEqual(
        await legacy.evaluate(() => [localStorage.getItem("aporto-theme"), localStorage.getItem("aporto-llm-theme")]),
        ["light", "light"],
    );
    const savedTheme = (await legacy.context().cookies()).find(({ name }) => name === "aporto-theme");
    assert.equal(savedTheme?.value, "light");
    assert.equal(savedTheme?.path, "/");
    assert.equal(savedTheme?.sameSite, "Lax");
    assert.equal(savedTheme?.secure, new URL(base).protocol === "https:");
    assert.ok(savedTheme && savedTheme.expires > Date.now() / 1000 + 300 * 24 * 60 * 60, "theme cookie must persist for about one year");
    await legacy.close();

    const desktop = await openPage({ width: 1440, height: 1000 });
    await routePricing(desktop);
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
    await assertTheme(desktop, "light");
    await desktop.screenshot({ path: `${output}/docs-ru-desktop.png`, fullPage: true });
    await desktop.screenshot({ path: `${output}/docs-ru-light-desktop.png`, fullPage: true });
    await switchTheme(desktop, "dark");
    await checkDocument(desktop, "en", "/introduction", "Aporto LLM API");
    await assertTheme(desktop, "dark");
    await desktop.screenshot({ path: `${output}/docs-en-desktop.png`, fullPage: true });
    await desktop.screenshot({ path: `${output}/docs-en-dark-desktop.png`, fullPage: true });
    await checkDocument(desktop, "ru", "/ru/billing", "Баланс и оплата");
    await desktop.getByRole("heading", { name: "Независимые кошельки", exact: true }).scrollIntoViewIfNeeded();
    await desktop.screenshot({ path: `${output}/docs-ru-wallets-desktop.png` });
    await desktop.screenshot({ path: `${output}/docs-ru-dark-billing-desktop.png` });

    await checkDocument(desktop, "ru", "/ru/capabilities/ai-models?tab=pricing", "Модели и цены");
    await assertTheme(desktop, "dark");
    assert.equal(await desktop.getByRole("link", { name: "Модели и цены", exact: true }).getAttribute("aria-current"), "page");
    await desktop.getByRole("searchbox", { name: "Поиск моделей" }).waitFor({ state: "visible" });
    assert.ok(await desktop.getByText(/Расчёт RUB-запроса:/).isVisible(), "RU pricing must retain the detailed CBR calculation");
    await desktop.screenshot({ path: `${output}/pricing-ru-dark-desktop.png`, fullPage: true });
    await switchTheme(desktop, "light");
    await checkDocument(desktop, "en", "/capabilities/ai-models?tab=pricing", "Models & Pricing");
    await assertTheme(desktop, "light");
    await desktop.getByRole("searchbox", { name: "Search models" }).waitFor({ state: "visible" });
    await desktop.screenshot({ path: `${output}/pricing-en-light-desktop.png`, fullPage: true });

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
    await routePricing(mobile);
    await checkDocument(mobile, "ru", "/ru/quick-start", "Быстрый старт");
    await assertTheme(mobile, "light");
    await mobile.getByRole("button", { name: "Открыть навигацию" }).click();
    await mobile.waitForFunction(() => Math.abs(document.querySelector("aside").getBoundingClientRect().x) < 1);
    const apiLink = mobile.getByRole("link", { name: "Справочник API", exact: true });
    await apiLink.waitFor({ state: "visible" });
    assert.ok(await apiLink.getByText("Справочник API", { exact: true }).isVisible(), "mobile navigation labels must be visible");
    assert.equal(new URL(await apiLink.getAttribute("href"), base).pathname, "/ru/api-reference");
    await mobile.screenshot({ path: `${output}/docs-ru-mobile.png` });
    await mobile.screenshot({ path: `${output}/docs-ru-light-mobile.png` });
    await Promise.all([
        mobile.waitForURL(`${base}/ru/api-reference`),
        apiLink.click(),
    ]);
    assert.equal(await mobile.locator("html").getAttribute("lang"), "ru");
    assert.equal((await mobile.locator("h1").textContent())?.trim(), "Справочник API");
    await checkDocument(mobile, "ru", "/ru/billing", "Баланс и оплата");
    await mobile.getByRole("heading", { name: "Независимые кошельки", exact: true }).scrollIntoViewIfNeeded();
    await mobile.screenshot({ path: `${output}/docs-ru-wallets-mobile.png` });
    await mobile.getByRole("heading", { name: "Пополнение RUB-кошелька", exact: true }).scrollIntoViewIfNeeded();
    await mobile.screenshot({ path: `${output}/docs-ru-funding-mobile.png` });
    await switchTheme(mobile, "dark");
    await checkDocument(mobile, "en", "/capabilities/ai-models?tab=pricing", "Models & Pricing");
    await assertTheme(mobile, "dark");
    await mobile.getByRole("searchbox", { name: "Search models" }).waitFor({ state: "visible" });
    const selectedPricingTab = await mobile.getByRole("tab", { name: "Models & Pricing", exact: true }).boundingBox();
    assert.ok(selectedPricingTab && selectedPricingTab.x + selectedPricingTab.width <= 391, "selected mobile pricing tab must fit the viewport");
    await mobile.screenshot({ path: `${output}/pricing-en-dark-mobile.png`, fullPage: true });

    const errorPage = await openPage({ width: 390, height: 844 });
    await routePricing(errorPage, true);
    await errorPage.goto(`${base}/capabilities/ai-models?tab=pricing`, { waitUntil: "networkidle" });
    assert.ok(await errorPage.locator('main p[role="alert"]').isVisible(), "pricing error state must be visible");
    await errorPage.screenshot({ path: `${output}/pricing-en-error-mobile.png` });
    await errorPage.close();

    assert.deepEqual(errors, []);
} finally {
    await browser.close();
}

console.log("PASS: desktop/mobile locale navigation, light/dark preference, contact links, tabs, pricing states, screenshots, and overflow");
