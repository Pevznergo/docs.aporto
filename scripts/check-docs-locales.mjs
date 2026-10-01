import assert from "node:assert/strict";
import nextConfig from "../next.config.ts";
import { DOC_CONTENT } from "../src/lib/docs-content.ts";
import { localeFromPathname, withLocale } from "../src/lib/docs-locale.ts";

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
assert.match(DOC_CONTENT.ru.billing, /Суммы в каталоге — справочная оценка/);
assert.match(DOC_CONTENT.ru["api-reference"], /повторное списание/);

assert.equal(localeFromPathname("/quick-start"), "en");
assert.equal(localeFromPathname("/ru/quick-start"), "ru");
assert.equal(withLocale("/capabilities/ai-models?tab=pricing", "ru"), "/ru/capabilities/ai-models?tab=pricing");
assert.equal(withLocale("/ru/capabilities/ai-models", "en"), "/capabilities/ai-models");
assert.equal(withLocale("/ru/capabilities/ai-models", "en", "?tab=endpoints#request"), "/capabilities/ai-models?tab=endpoints#request");

const redirects = await nextConfig.redirects();
for (const redirect of redirects.filter(({ source }) => !source.startsWith("/ru/"))) {
    assert.ok(
        redirects.some(({ source, destination }) => source === `/ru${redirect.source}` && destination === `/ru${redirect.destination}`),
        `${redirect.source} needs a locale-preserving RU redirect`,
    );
}

console.log("PASS: RU content, locale links, and redirects");
