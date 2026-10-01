import type { DocsLocale } from "./docs-locale";

export type DocPage = "introduction" | "quick-start" | "api-reference" | "billing";

export const DOC_CONTENT: Record<DocsLocale, Record<DocPage, string>> = {
    en: {
        introduction: `# Aporto LLM API

Use OpenAI-compatible clients with one Aporto API key and choose a model by its full Aporto ID. Requests go to:

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
| Default billing currency | USD balance |

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

Aporto currently uses a prepaid USD balance. Requests are charged from that balance at the active model tariff; there is no subscription charge for API usage. The separate RUB wallet described below is not live yet.

## Live prices

[Open the live model catalog →](/capabilities/ai-models?tab=pricing)

The catalog reads the gateway's current \`default\` group tariffs and quota unit. It does not maintain a second hand-written model list. Models with conditional tariffs show their published rate variants rather than one flattened fixed price.

## Rouble estimates

[Открыть актуальный прайс в рублях →](/capabilities/ai-models?tab=pricing&lang=ru)

For Russian readers, each live USD tariff is converted by this rule:

**RUB estimate = USD tariff × effective CBR USD/RUB rate × 1.40**

The commercial RUB-per-USD rate is rounded up to four decimal places. The page shows the CBR effective date and the time the quote was checked. The latest already-effective rate remains valid until the next rate takes effect. A rate dated after the current Moscow calendar day is rejected and never shown early.

If the CBR quote is unavailable, the USD catalog remains available and the page explicitly marks the RUB estimate unavailable. No fallback or invented exchange rate is used.

## Available now: RUB invoice for the USD balance

[Fund the USD balance by RUB invoice →](https://app.aporto.tech/dashboard?topup=rub&lang=ru)

Current RUB payments credit the account's USD balance. The quote shown before payment uses the current rule above; an issued invoice specifies its rate and USD amount. Ask the manager to reconcile an older unpaid invoice before payment. Completed payments keep their stored accounting amounts and are not repriced by later CBR changes.

Displayed catalog amounts are reference estimates. The payment quote or issued invoice is the payable amount and takes precedence.

## Coming soon: separate RUB wallet

**Preparing for launch. The RUB wallet and the API keys linked to it, described in this section, are not available in production yet.**

One Aporto account will have two separate wallets:

| USD wallet · Available now | RUB wallet · Coming soon |
|---|---|
| Remains the default and works as it does today | A manager enables it for an opted-in account |
| Holds USD and uses API keys linked to the USD wallet | Holds RUB and uses API keys linked to the RUB wallet |
| Keeps its own balance and usage and billing history | Keeps its own balance and usage and billing history |

Both key types will call the same `https://api.aporto.tech/v1` endpoint with the same currency-neutral request body. The API key will select the wallet and billing currency. A request will never automatically use the other wallet, and Aporto will not automatically transfer funds between wallets.

### Funding and request charges in RUB

- Paying **10,000 RUB** will credit exactly **10,000 RUB** to the RUB wallet.
- For each completed request, Aporto will first calculate the published USD charge from actual metered usage. It will then calculate one RUB debit:

  **RUB debit = published USD charge for actual usage × current effective CBR USD/RUB rate × 1.40**

  The exchange rate and the 1.40 multiplier are applied once to the request's USD charge.
- If the RUB wallet cannot cover a request, the USD wallet will not be charged as a fallback.
- The USD wallet, its API keys, and its charging behavior will remain unchanged.

[Request another billing currency →](https://aporto.tech/contact)

## Usage

Input, output, cache, image, and other billable units can have different rates. Use the selected model's live price lines and endpoint marker. The account's usage history is authoritative for completed requests.`,
    },

    ru: {
        introduction: `# Aporto LLM API

Подключайте OpenAI-совместимые клиенты с одним API-ключом Aporto и выбирайте модель по её полному ID в Aporto. Запросы отправляются на адрес:

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
| Валюта баланса сейчас | USD |

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

Сейчас Aporto использует предоплаченный баланс в долларах США. Запросы оплачиваются с этого баланса по действующему тарифу модели; отдельной абонентской платы за использование API нет. Описанный ниже отдельный RUB-кошелёк пока не запущен.

## Актуальные цены

[Открыть каталог моделей →](/ru/capabilities/ai-models?tab=pricing)

Каталог получает текущие тарифы группы \`default\` и единицу квоты непосредственно от шлюза. Отдельного вручную составленного списка моделей нет. Для условных тарифов показаны опубликованные варианты ставок, а не одна усреднённая цена.

## Расчёт в рублях

Каждый актуальный USD-тариф пересчитывается по правилу:

**Оценка в RUB = USD-тариф × действующий курс ЦБ РФ USD/RUB × 1,40**

Коммерческий курс RUB за USD округляется вверх до четырёх знаков после запятой. На странице указаны дата действия курса ЦБ и время его проверки. Последний уже вступивший в силу курс действует до начала действия следующего. Курс с датой позже текущего московского календарного дня отклоняется и заранее не показывается.

Если курс ЦБ недоступен, каталог в USD продолжает работать, а страница явно сообщает, что оценка в рублях недоступна. Резервный или вымышленный курс не используется.

## Доступно сейчас: счёт в RUB для пополнения USD-баланса

[Пополнить USD-баланс по счёту →](https://app.aporto.tech/dashboard?lang=ru&topup=rub)

Текущее пополнение в рублях зачисляет средства на USD-баланс аккаунта. Предварительный расчёт использует правило выше; в выставленном счёте зафиксированы курс и сумма в USD. Перед оплатой старого неоплаченного счёта попросите менеджера сверить его. Завершённые платежи сохраняют записанные бухгалтерские суммы и не пересчитываются при последующих изменениях курса ЦБ.

Суммы в каталоге — справочная оценка. К оплате применяется сумма из платёжного расчёта или выставленного счёта.

## Скоро: отдельный RUB-кошелёк

**Готовится к запуску. RUB-кошелёк и привязанные к нему API-ключи, описанные в этом разделе, пока недоступны в рабочем кабинете и API.**

В одном аккаунте Aporto будет два отдельных кошелька:

| USD-кошелёк · Доступен сейчас | RUB-кошелёк · Скоро |
|---|---|
| Останется кошельком по умолчанию и продолжит работать как сейчас | Менеджер подключит его аккаунту по запросу |
| Хранит USD и использует привязанные к нему API-ключи | Хранит RUB и использует привязанные к нему API-ключи |
| Имеет свой баланс и свои истории использования и списаний | Имеет свой баланс и свои истории использования и списаний |

Ключи обоих кошельков будут работать через один адрес `https://api.aporto.tech/v1` и одинаковое тело запроса без параметра валюты. Кошелёк и валюту списания определит API-ключ. Запрос не будет автоматически списывать средства с другого кошелька, а Aporto не будет автоматически переводить средства между кошельками.

### Пополнение и списания в RUB

- Оплата **10 000 RUB** зачислит ровно **10 000 RUB** на RUB-кошелёк.
- Для каждого завершённого запроса Aporto сначала рассчитает опубликованную стоимость в USD по фактическому измеренному расходу. Затем будет рассчитано одно списание в RUB:

  **Списание в RUB = опубликованная стоимость фактического расхода в USD × действующий курс ЦБ РФ USD/RUB × 1,40**

  Курс и коэффициент 1,40 применяются к стоимости запроса в USD один раз.
- Если средств на RUB-кошельке недостаточно, списания с USD-кошелька не произойдёт.
- USD-кошелёк, его API-ключи и порядок списаний останутся без изменений.

[Подать заявку на RUB-кошелёк →](https://aporto.tech/ru/contact)

## Использование

Для ввода, вывода, кеша, изображений и других оплачиваемых единиц могут действовать разные ставки. Проверяйте строки цены и метку эндпоинта выбранной модели. Для завершённых запросов фактическим источником данных служит история использования аккаунта.`,
    },
};
