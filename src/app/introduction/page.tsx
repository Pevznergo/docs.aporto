import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `# Aporto LLM API

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

Continue to [Quick Start](/quick-start), [API Reference](/api-reference), or [Billing & RUB](/billing).`;

export default function IntroductionPage() {
    return <MarkdownRenderer content={content} />;
}
