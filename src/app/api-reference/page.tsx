import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `# API Reference

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

See [Billing & RUB](/billing) for the tariff source and currency calculation.

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

Use exponential backoff with jitter for \`429\` and transient \`5xx\` responses. Do not automatically retry a generation request when the first request may have completed: duplicate output and duplicate billing are possible. `;

export default function ApiReferencePage() {
    return <MarkdownRenderer content={content} />;
}
