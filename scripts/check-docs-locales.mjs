import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import nextConfig from "../next.config.ts";
import { DOC_CONTENT } from "../src/lib/docs-content.ts";
import { localeFromPathname, withLocale } from "../src/lib/docs-locale.ts";
import { themeCookie } from "../src/lib/theme.ts";

const pages = ["introduction", "quick-start", "api-reference", "billing"];
for (const page of pages) {
    const english = DOC_CONTENT.en[page];
    const russian = DOC_CONTENT.ru[page];
    assert.match(russian, /[А-Яа-яЁё]/, `${page} needs Russian copy`);
    assert.ok(english.length > 500 && russian.length > 500, `${page} content is incomplete`);
    for (const [, link] of russian.matchAll(/\]\((\/[^)]+)\)/g)) {
        assert.ok(link === "/ru" || link.startsWith("/ru/"), `${page} loses RU locale at ${link}`);
    }
}

const activeCopy = JSON.stringify(DOC_CONTENT);
assert.doesNotMatch(activeCopy, /@aporto\/core|client\.services\.|MCP router/i);
assert.match(DOC_CONTENT.ru.billing, /курс ЦБ РФ USD\/RUB × 1,40/);
assert.match(DOC_CONTENT.ru.billing, /свежий, проверенный и уже вступивший в силу курс/);
assert.match(DOC_CONTENT.ru["api-reference"], /повторное списание/);

const englishBilling = DOC_CONTENT.en.billing;
const russianBilling = DOC_CONTENT.ru.billing;
assert.match(englishBilling, /One Aporto login[\s\S]+USD is the default[\s\S]+manager enables the RUB wallet by request/);
assert.match(russianBilling, /В одном аккаунте Aporto[\s\S]+USD-кошелёк используется по умолчанию[\s\S]+RUB-кошелёк подключает менеджер по заявке/);
assert.match(englishBilling, /10,000 RUB\*\* credits exactly \*\*10,000 RUB/);
assert.match(russianBilling, /10 000 RUB\*\* зачисляет ровно \*\*10 000 RUB/);
assert.match(englishBilling, /published Aporto USD tariff for actual usage × effective CBR USD\/RUB rate × 1\.40/);
assert.match(russianBilling, /опубликованный тариф Aporto в USD за фактическое использование × действующий курс ЦБ РФ USD\/RUB × 1,40/);
assert.match(englishBilling, /applied exactly once[\s\S]+separate 1:1 credit/);
assert.match(russianBilling, /применяются к стоимости запроса ровно один раз[\s\S]+отдельное зачисление 1:1/);
assert.match(englishBilling, /exact product is not rounded up first[\s\S]+final money amount is rounded once/);
assert.match(russianBilling, /точное произведение не округляется вверх заранее[\s\S]+итоговая денежная сумма/);
assert.match(englishBilling, /same https:\/\/api\.aporto\.tech\/v1 endpoint[\s\S]+API key fixes the wallet and billing currency[\s\S]+no currency override/);
assert.match(russianBilling, /один адрес https:\/\/api\.aporto\.tech\/v1[\s\S]+API-ключ фиксирует кошелёк и валюту списания[\s\S]+Автоматической конвертации/);
assert.match(englishBilling, /text POST \/v1\/chat\/completions[\s\S]+non-streaming and streaming[\s\S]+cache usage/);
assert.match(russianBilling, /текстовый POST \/v1\/chat\/completions[\s\S]+обычные и потоковые ответы[\s\S]+тарификацией кеша/);
assert.match(englishBilling, /Images, audio, video, realtime, background jobs, and server-executed tools[\s\S]+require a USD key/);
assert.match(russianBilling, /Изображения, аудио, видео, режим реального времени, фоновые задачи и серверные инструменты[\s\S]+требуют USD-ключа/);
assert.match(englishBilling, /bank invoice confirmed by a manager[\s\S]+no automatic checkout/);
assert.match(russianBilling, /Пополнение проходит по банковскому счёту[\s\S]+оплату подтверждает менеджер[\s\S]+автоматической оплаты нет/);
assert.match(englishBilling, /snapshots the effective CBR rate and the published tariff[\s\S]+Existing balances and completed history are not revalued/);
assert.match(russianBilling, /фиксирует действующий курс ЦБ и опубликованный тариф[\s\S]+баланс и завершённая история не переоцениваются/);
assert.match(englishBilling, /request\/status view[\s\S]+never approves access/);
assert.match(russianBilling, /экран заявки и её статуса[\s\S]+Сама ссылка не одобряет доступ/);
assert.match(englishBilling, /\?topup=rub[\s\S]+saved terms of its invoice[\s\S]+does not select or fund the independent RUB wallet/);
assert.match(russianBilling, /\?topup=rub[\s\S]+сохранённым условиям выставленного счёта[\s\S]+не выбирает и не пополняет независимый RUB-кошелёк/);
assert.doesNotMatch(englishBilling, /Coming soon|Preparing for launch|not live yet|not available in production yet/i);
assert.doesNotMatch(russianBilling, /Скоро|Готовится к запуску|пока не запущен|пока недоступны/i);

const pricingSource = await readFile(new URL("../src/app/capabilities/ai-models/ModelPricingTab.tsx", import.meta.url), "utf8");
assert.match(pricingSource, /dashboard\?wallet=RUB&lang=ru/);
assert.match(pricingSource, /пополнение RUB-кошелька зачисляется 1:1/);
assert.match(pricingSource, /rubUsagePerUsd\(fx\.cbrRate\)/);
assert.doesNotMatch(pricingSource, /value \* fx\.rubPerUsd/);
assert.doesNotMatch(pricingSource, /dashboard\?lang=ru&topup=rub|Баланс ведётся в USD/);
const ruRouteSource = await readFile(new URL("../src/app/ru/[[...slug]]/page.tsx", import.meta.url), "utf8");
assert.match(ruRouteSource, /Независимые USD- и RUB-кошельки/);
assert.doesNotMatch(ruRouteSource, /готовящийся отдельный RUB-кошелёк/);

assert.equal(localeFromPathname("/quick-start"), "en");
assert.equal(localeFromPathname("/ru/quick-start"), "ru");
assert.equal(withLocale("/capabilities/ai-models?tab=pricing", "ru"), "/ru/capabilities/ai-models?tab=pricing");
assert.equal(withLocale("/ru/capabilities/ai-models", "en"), "/capabilities/ai-models");
assert.equal(withLocale("/ru/capabilities/ai-models", "en", "?tab=endpoints#request"), "/capabilities/ai-models?tab=endpoints#request");

const sharedThemeCookie = "aporto-theme=dark; Path=/; Max-Age=31536000; SameSite=Lax; Domain=.aporto.tech; Secure";
assert.equal(themeCookie("dark", "aporto.tech", "https:"), sharedThemeCookie);
assert.equal(themeCookie("dark", "docs.aporto.tech", "https:"), sharedThemeCookie);
assert.doesNotMatch(themeCookie("light", "aporto.tech.example", "https:"), /Domain=/);
assert.doesNotMatch(themeCookie("light", "evilaporto.tech", "https:"), /Domain=/);
assert.equal(themeCookie("light", "127.0.0.1", "http:"), "aporto-theme=light; Path=/; Max-Age=31536000; SameSite=Lax");

const redirects = await nextConfig.redirects();
for (const redirect of redirects.filter(({ source }) => !source.startsWith("/ru/"))) {
    assert.ok(
        redirects.some(({ source, destination }) => source === `/ru${redirect.source}` && destination === `/ru${redirect.destination}`),
        `${redirect.source} needs a locale-preserving RU redirect`,
    );
}

console.log("PASS: RU content, locale links, and redirects");
