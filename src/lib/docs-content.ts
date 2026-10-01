import type { DocsLocale } from "./docs-locale";

export type DocPage = "introduction" | "quick-start" | "api-reference" | "billing";

export const DOC_CONTENT: Record<DocsLocale, Record<DocPage, string>> = {
    en: {
        introduction: `# Aporto LLM API

Use OpenAI-compatible clients with an Aporto API key and choose a model by its full Aporto ID. Requests go to:

\`\`\`text
https://api.aporto.tech/v1
\`\`\`

## What is available

- OpenAI-compatible Chat Completions and model discovery
- OpenAI Responses-compatible requests for models marked \`openai-response\`
- Native Gemini requests for models marked \`gemini\`
- Server-sent event streaming on compatible endpoints
- Prepaid usage billing at the model tariff shown in the live catalog

Endpoint compatibility is listed for each model in [Models & Pricing](/capabilities/ai-models?tab=pricing). It is the source of truth when models differ.

## Start in three steps

1. [Create an account](https://app.aporto.tech/register) and verify your email.
2. [Create an API key](https://app.aporto.tech/settings?tab=api-keys). Save it when it is shown.
3. Follow the [Quick Start](/quick-start) and send one request with a model ID from the live catalog.

Keep API keys on your server and out of browser code, source control, and support messages.

## Base settings

| Setting | Value |
|---|---|
| Base URL | \`https://api.aporto.tech/v1\` |
| Authentication | \`Authorization: Bearer $APORTO_API_KEY\` |
| Model discovery | \`GET /v1/models\` |
| Billing wallets | USD by default; RUB by manager request |

Continue to [Quick Start](/quick-start), [API Reference](/api-reference), or [Billing](/billing).`,

        "quick-start": `# Quick Start

## 1. Create and store a key

Create a key in [Settings → API Keys](https://app.aporto.tech/settings?tab=api-keys), then put it in your server environment:

\`\`\`bash
export APORTO_API_KEY="your-api-key"
export APORTO_MODEL="full-model-id-from-the-catalog"
\`\`\`

Use the exact model ID from [Models & Pricing](/capabilities/ai-models?tab=pricing). Availability and endpoint compatibility can change, so examples use an environment variable instead of a hard-coded model.

## 2. Send a request

\`\`\`bash
curl https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"'"$APORTO_MODEL"'","messages":[{"role":"user","content":"Reply in one sentence."}]}'
\`\`\`

## OpenAI Python SDK

\`\`\`bash
pip install openai
\`\`\`

\`\`\`python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["APORTO_API_KEY"],
    base_url="https://api.aporto.tech/v1",
)

response = client.chat.completions.create(
    model=os.environ["APORTO_MODEL"],
    messages=[{"role": "user", "content": "Reply in one sentence."}],
)
print(response.choices[0].message.content)
\`\`\`

## OpenAI JavaScript SDK

\`\`\`bash
npm install openai
\`\`\`

\`\`\`javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APORTO_API_KEY,
  baseURL: "https://api.aporto.tech/v1",
});

const response = await client.chat.completions.create({
  model: process.env.APORTO_MODEL,
  messages: [{ role: "user", content: "Reply in one sentence." }],
});
console.log(response.choices[0].message.content);
\`\`\`

## Next

- [Endpoints and model compatibility](/capabilities/ai-models?tab=endpoints)
- [Streaming, usage, errors, and rate limits](/api-reference)
- [Live model prices and billing](/billing)`,

        "api-reference": `# API Reference

## Authentication

Send the Aporto API key as a Bearer token on every request:

\`\`\`http
Authorization: Bearer $APORTO_API_KEY
Content-Type: application/json
\`\`\`

The API base is \`https://api.aporto.tech\`. OpenAI SDKs use \`https://api.aporto.tech/v1\` as their base URL. Keep keys on the server.

## Compatibility paths

| Compatibility | Path | Model catalog marker |
|---|---|---|
| Model discovery | \`GET /v1/models\` | — |
| OpenAI Chat Completions | \`POST /v1/chat/completions\` | \`openai\` |
| OpenAI Responses | \`POST /v1/responses\` | \`openai-response\` |
| Native Gemini generateContent | \`POST /v1beta/models/{model}:generateContent\` | \`gemini\` |

Check the endpoint markers beside each model in [Models & Pricing](/capabilities/ai-models?tab=pricing). A model is not guaranteed to support every path.

## Streaming

For Chat Completions, set \`"stream": true\`. The response is a server-sent event stream and finishes with \`[DONE]\`.

\`\`\`bash
curl -N https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"'"$APORTO_MODEL"'","messages":[{"role":"user","content":"Hello"}],"stream":true}'
\`\`\`

Responses-compatible models emit Responses API events when \`stream\` is true. For native Gemini streaming, use \`:streamGenerateContent?alt=sse\`. Clients must consume the body incrementally and should close it when the caller cancels.

## Usage and billing

Compatible responses include provider usage data such as input and output token counts. Billing uses the gateway's metered usage and the active tariff for the selected model. Treat client-side estimates as estimates; the account balance and usage history are authoritative.

See [Billing](/billing) for the tariff source and currency calculation.

## Errors

| Status | Meaning | Action |
|---|---|---|
| 400 | Invalid request or unsupported parameter | Check the request body and endpoint |
| 401 | Missing or invalid API key | Check the Bearer token |
| 404 | Unknown model or path | Refresh model discovery and endpoint compatibility |
| 429 | Account, model, or upstream rate limit | Respect \`Retry-After\` when present and retry with backoff |
| 5xx | Gateway or upstream failure | Record the request ID and retry only when safe |

Error bodies can include more specific gateway or upstream details. Do not depend on provider wording as a stable machine-readable contract.

If a request is rejected for insufficient balance, follow the returned error and add funds in the dashboard; the status code can depend on the compatibility path.

## Rate limits and retries

There is no single published request-per-minute number for every model. Limits can vary by account, model, and upstream provider. A \`429\` response is the runtime signal.

Use exponential backoff with jitter for \`429\` and transient \`5xx\` responses. Do not automatically retry a generation request when the first request may have completed: duplicate output and duplicate billing are possible.`,

        billing: `# Billing

One Aporto login can have two independent prepaid wallets. USD is the default. A manager enables the RUB wallet by request. Each wallet has its own balance, API keys, and usage and billing history. There is no subscription charge for API usage.

## Live prices

[Open the live model catalog →](/capabilities/ai-models?tab=pricing)

The catalog reads the gateway's current \`default\` group tariffs and quota unit. It does not maintain a second hand-written model list. Models with conditional tariffs show their published rate variants rather than one flattened fixed price.

## RUB request tariffs

[Open current RUB request tariffs →](/capabilities/ai-models?tab=pricing&lang=ru)

For supported RUB-wallet requests, each live USD tariff is calculated in RUB by this rule:

**RUB debit = published Aporto USD tariff for actual usage × effective CBR USD/RUB rate × 1.40**

The CBR rate and the 1.40 multiplier are applied exactly once to the request charge. Their exact product is not rounded up first; only the final money amount is rounded once. Funding the RUB wallet is a separate 1:1 credit and does not use this calculation.

The catalog shows the CBR effective date and the time the rate was checked. Only a fresh, verified, already-effective rate is shown; a missing, stale, future-dated, or invented fallback rate is not used. RUB amounts explain request tariffs and do not mean that every catalog model or endpoint supports the RUB wallet.

## Independent wallets

| USD wallet · Default | RUB wallet · By request |
|---|---|
| Works for the published API capabilities | A manager enables it for the account |
| Holds USD and uses API keys linked to the USD wallet | Holds RUB and uses API keys linked to the RUB wallet |
| Keeps its own balance and usage and billing history | Keeps its own balance and usage and billing history |

[Open or request the RUB wallet →](https://app.aporto.tech/dashboard?wallet=RUB&lang=ru)

The link opens the RUB wallet when it is active, or its request/status view otherwise. It never approves access; manager approval is required.

Both key types call the same https://api.aporto.tech/v1 endpoint with the same currency-neutral request body. The API key fixes the wallet and billing currency. There is no currency override, automatic conversion, transfer, or fallback charge from the other wallet.

### RUB support scope

A RUB key supports text POST /v1/chat/completions, including non-streaming and streaming responses, with ordinary published token tariffs and cache usage. The enabled model set can be narrower than the full catalog. Images, audio, video, realtime, background jobs, and server-executed tools are not supported by the RUB wallet and require a USD key.

### Funding the RUB wallet

Funding uses a bank invoice confirmed by a manager; there is no automatic checkout.

- Paying **10,000 RUB** credits exactly **10,000 RUB** to the RUB wallet.
- No FX conversion or markup is applied to the amount credited.
- Before a supported request is sent upstream, Aporto snapshots the effective CBR rate and the published tariff. That snapshot is used for settlement and any refund. Existing balances and completed history are not revalued when the rate or tariff changes.
- If the RUB wallet cannot cover a request, the USD wallet is not charged as a fallback.
- The USD wallet, its API keys, and its charging behavior remain unchanged.

### Legacy RUB invoices for the USD wallet

The compatibility link [?topup=rub](https://app.aporto.tech/dashboard?topup=rub&lang=ru) still funds the USD wallet under the saved terms of its invoice. It does not select or fund the independent RUB wallet. Existing invoices and completed payments keep their stored accounting amounts.

## Usage

Input, output, and cache can have different rates. Use the selected model's live price lines and the wallet's supported scope. Each wallet's own usage history is authoritative for its completed requests.`,
    },

    ru: {
        introduction: `# Aporto LLM API

Подключайте OpenAI-совместимые клиенты с API-ключом Aporto и выбирайте модель по её полному ID в Aporto. Запросы отправляются на адрес:

\`\`\`text
https://api.aporto.tech/v1
\`\`\`

## Что доступно

- OpenAI-совместимые Chat Completions и получение списка моделей
- Запросы, совместимые с OpenAI Responses, для моделей с меткой \`openai-response\`
- Нативные запросы Gemini для моделей с меткой \`gemini\`
- Потоковая передача через Server-Sent Events на совместимых эндпоинтах
- Предоплатная тарификация по цене модели из актуального каталога

Совместимость с эндпоинтами указана для каждой модели в разделе [«Модели и цены»](/ru/capabilities/ai-models?tab=pricing). Если модели отличаются, ориентируйтесь на этот каталог.

## Начните за три шага

1. [Создайте аккаунт](https://app.aporto.tech/register?lang=ru) и подтвердите адрес электронной почты.
2. [Создайте API-ключ](https://app.aporto.tech/settings?tab=api-keys&lang=ru). Сохраните его сразу после создания.
3. Откройте [быстрый старт](/ru/quick-start) и отправьте запрос с ID модели из актуального каталога.

Храните API-ключи на сервере. Не добавляйте их в браузерный код, систему контроля версий и сообщения в поддержку.

## Основные настройки

| Настройка | Значение |
|---|---|
| Базовый URL | \`https://api.aporto.tech/v1\` |
| Авторизация | \`Authorization: Bearer $APORTO_API_KEY\` |
| Список моделей | \`GET /v1/models\` |
| Кошельки для оплаты | USD по умолчанию; RUB по заявке менеджеру |

Далее: [быстрый старт](/ru/quick-start), [справочник API](/ru/api-reference) и [баланс и оплата](/ru/billing).`,

        "quick-start": `# Быстрый старт

## 1. Создайте и сохраните ключ

Создайте ключ в разделе [«Настройки → API-ключи»](https://app.aporto.tech/settings?tab=api-keys&lang=ru), затем добавьте его в переменные окружения на сервере:

\`\`\`bash
export APORTO_API_KEY="your-api-key"
export APORTO_MODEL="full-model-id-from-the-catalog"
\`\`\`

Используйте точный ID из раздела [«Модели и цены»](/ru/capabilities/ai-models?tab=pricing). Доступность моделей и совместимость с эндпоинтами могут меняться, поэтому в примерах модель задаётся переменной окружения.

## 2. Отправьте запрос

\`\`\`bash
curl https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"'"$APORTO_MODEL"'","messages":[{"role":"user","content":"Ответь одним предложением."}]}'
\`\`\`

## OpenAI SDK для Python

\`\`\`bash
pip install openai
\`\`\`

\`\`\`python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["APORTO_API_KEY"],
    base_url="https://api.aporto.tech/v1",
)

response = client.chat.completions.create(
    model=os.environ["APORTO_MODEL"],
    messages=[{"role": "user", "content": "Ответь одним предложением."}],
)
print(response.choices[0].message.content)
\`\`\`

## OpenAI SDK для JavaScript

\`\`\`bash
npm install openai
\`\`\`

\`\`\`javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APORTO_API_KEY,
  baseURL: "https://api.aporto.tech/v1",
});

const response = await client.chat.completions.create({
  model: process.env.APORTO_MODEL,
  messages: [{ role: "user", content: "Ответь одним предложением." }],
});
console.log(response.choices[0].message.content);
\`\`\`

## Что дальше

- [Эндпоинты и совместимость моделей](/ru/capabilities/ai-models?tab=endpoints)
- [Потоковые ответы, расход, ошибки и лимиты](/ru/api-reference)
- [Баланс, цены и оплата](/ru/billing)`,

        "api-reference": `# Справочник API

## Авторизация

Передавайте API-ключ Aporto как Bearer-токен в каждом запросе:

\`\`\`http
Authorization: Bearer $APORTO_API_KEY
Content-Type: application/json
\`\`\`

Базовый адрес API — \`https://api.aporto.tech\`. Для OpenAI SDK используйте базовый URL \`https://api.aporto.tech/v1\`. Храните ключи на сервере.

## Совместимые пути

| Совместимость | Путь | Метка в каталоге моделей |
|---|---|---|
| Получение списка моделей | \`GET /v1/models\` | — |
| OpenAI Chat Completions | \`POST /v1/chat/completions\` | \`openai\` |
| OpenAI Responses | \`POST /v1/responses\` | \`openai-response\` |
| Нативный Gemini generateContent | \`POST /v1beta/models/{model}:generateContent\` | \`gemini\` |

Проверяйте метки эндпоинтов рядом с каждой моделью в разделе [«Модели и цены»](/ru/capabilities/ai-models?tab=pricing). Не каждая модель поддерживает все пути.

## Потоковые ответы

Для Chat Completions укажите \`"stream": true\`. Ответ придёт как поток Server-Sent Events и завершится маркером \`[DONE]\`.

\`\`\`bash
curl -N https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"'"$APORTO_MODEL"'","messages":[{"role":"user","content":"Привет"}],"stream":true}'
\`\`\`

Модели, совместимые с Responses, передают события Responses API, когда параметр \`stream\` равен \`true\`. Для нативного потокового Gemini используйте \`:streamGenerateContent?alt=sse\`. Клиент должен читать тело ответа по мере поступления данных и закрывать его при отмене запроса.

## Расход и списания

Совместимые ответы содержат данные провайдера о расходе, например число входных и выходных токенов. Списание рассчитывается по измеренному шлюзом расходу и действующему тарифу выбранной модели. Клиентские расчёты остаются оценочными; фактические значения указаны в балансе и истории использования аккаунта.

Источник тарифов и валютный расчёт описаны в разделе [«Баланс и оплата»](/ru/billing).

## Ошибки

| Статус | Значение | Действие |
|---|---|---|
| 400 | Некорректный запрос или неподдерживаемый параметр | Проверьте тело запроса и эндпоинт |
| 401 | API-ключ отсутствует или недействителен | Проверьте Bearer-токен |
| 404 | Неизвестная модель или путь | Обновите список моделей и проверьте совместимость эндпоинта |
| 429 | Лимит аккаунта, модели или вышестоящего провайдера | Учитывайте \`Retry-After\`, если он есть, и увеличивайте задержку между повторами |
| 5xx | Сбой шлюза или вышестоящего провайдера | Сохраните ID запроса и повторяйте его только когда это безопасно |

Тело ошибки может содержать более точные сведения от шлюза или провайдера. Не используйте формулировки провайдера как стабильный машиночитаемый контракт.

Если запрос отклонён из-за недостаточного баланса, следуйте сообщению ошибки и пополните счёт в личном кабинете. Код статуса может зависеть от совместимого пути.

## Лимиты и повторные запросы

Единого опубликованного лимита запросов в минуту для всех моделей нет. Ограничения могут зависеть от аккаунта, модели и вышестоящего провайдера. Ответ \`429\` сообщает о действующем ограничении.

Для \`429\` и временных ошибок \`5xx\` используйте экспоненциальную задержку со случайным разбросом. Не повторяйте запрос генерации автоматически, если первый запрос мог завершиться: это может создать дублирующий результат и повторное списание.`,

        billing: `# Баланс и оплата

В одном аккаунте Aporto могут работать два независимых предоплаченных кошелька. USD-кошелёк используется по умолчанию, RUB-кошелёк подключает менеджер по заявке. У каждого свои баланс, API-ключи и история использования и списаний. Абонентской платы за API нет.

## Актуальные цены

[Открыть каталог моделей →](/ru/capabilities/ai-models?tab=pricing)

Каталог получает текущие тарифы группы \`default\` и единицу квоты непосредственно от шлюза. Отдельного вручную составленного списка моделей нет. Для условных тарифов показаны опубликованные варианты ставок, а не одна усреднённая цена.

## Тарифы запросов в RUB

Для поддерживаемых запросов RUB-кошелька каждый актуальный USD-тариф рассчитывается в рублях по правилу:

**Списание в RUB = опубликованный тариф Aporto в USD за фактическое использование × действующий курс ЦБ РФ USD/RUB × 1,40**

Курс ЦБ и коэффициент 1,40 применяются к стоимости запроса ровно один раз. Их точное произведение не округляется вверх заранее; один раз округляется только итоговая денежная сумма. Пополнение RUB-кошелька — отдельное зачисление 1:1, этот расчёт для него не используется.

В каталоге указаны дата действия курса ЦБ и время его проверки. Показывается только свежий, проверенный и уже вступивший в силу курс; отсутствующий, устаревший, будущий или вымышленный резервный курс не используется. Суммы в RUB объясняют тариф запросов, но не означают, что RUB-кошелёк поддерживает каждую модель или эндпоинт каталога.

## Независимые кошельки

| USD-кошелёк · Стандартный | RUB-кошелёк · По заявке |
|---|---|
| Работает со всеми опубликованными возможностями API | Менеджер подключает его аккаунту по запросу |
| Хранит USD и использует привязанные к нему API-ключи | Хранит RUB и использует привязанные к нему API-ключи |
| Имеет свой баланс и свои истории использования и списаний | Имеет свой баланс и свои истории использования и списаний |

[Открыть или запросить RUB-кошелёк →](https://app.aporto.tech/dashboard?wallet=RUB&lang=ru)

Ссылка открывает RUB-кошелёк, если он активен, либо экран заявки и её статуса. Сама ссылка не одобряет доступ: требуется решение менеджера.

Ключи обоих кошельков работают через один адрес https://api.aporto.tech/v1 и одинаковое тело запроса без параметра валюты. API-ключ фиксирует кошелёк и валюту списания. Автоматической конвертации, перевода или резервного списания из другого кошелька нет.

### Возможности RUB-ключа

RUB-ключ поддерживает текстовый POST /v1/chat/completions, включая обычные и потоковые ответы, с опубликованными токенными тарифами и тарификацией кеша. Набор доступных моделей может быть уже полного каталога. Изображения, аудио, видео, режим реального времени, фоновые задачи и серверные инструменты не поддерживаются RUB-кошельком и требуют USD-ключа.

### Пополнение RUB-кошелька

Пополнение проходит по банковскому счёту, оплату подтверждает менеджер; автоматической оплаты нет.

- Оплата **10 000 RUB** зачисляет ровно **10 000 RUB** на RUB-кошелёк.
- К сумме зачисления не применяются валютная конвертация или наценка.
- До отправки поддерживаемого запроса Aporto фиксирует действующий курс ЦБ и опубликованный тариф. Этот снимок используется для списания и возможного возврата. Имеющийся баланс и завершённая история не переоцениваются при изменении курса или тарифа.
- Если средств на RUB-кошельке недостаточно, списания с USD-кошелька не происходит.
- USD-кошелёк, его API-ключи и порядок списаний не меняются.

### Старые счета в RUB для USD-кошелька

Совместимая ссылка [?topup=rub](https://app.aporto.tech/dashboard?lang=ru&topup=rub) по-прежнему пополняет USD-кошелёк по сохранённым условиям выставленного счёта. Она не выбирает и не пополняет независимый RUB-кошелёк. Старые счета и завершённые платежи сохраняют записанные бухгалтерские суммы.

## Использование

Для ввода, вывода и кеша могут действовать разные ставки. Проверяйте строки цены и поддерживаемые возможности кошелька. Для завершённых запросов фактическим источником данных служит собственная история выбранного кошелька.`,
    },
};
