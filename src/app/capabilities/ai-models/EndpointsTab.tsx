import type { Locale } from "./AIModelsPageClient";
import styles from "@/components/MarkdownRenderer.module.css";

const endpoints = (locale: Locale) => [
    {
        name: "OpenAI Chat Completions",
        path: "/v1/chat/completions",
        marker: "openai",
        streaming: locale === "ru"
            ? 'Укажите "stream": true для SSE-фрагментов, завершающихся маркером [DONE].'
            : 'Set "stream": true for SSE chunks ending with [DONE].',
        body: `{
  "model": "$APORTO_MODEL",
  "messages": [{ "role": "user", "content": "${locale === "ru" ? "Объясни это одним предложением." : "Explain this in one sentence."}" }],
  "stream": false
}`,
    },
    {
        name: "OpenAI Responses",
        path: "/v1/responses",
        marker: "openai-response",
        streaming: locale === "ru"
            ? 'Укажите "stream": true для событий Responses API.'
            : 'Set "stream": true for Responses API events.',
        body: `{
  "model": "$APORTO_MODEL",
  "instructions": "${locale === "ru" ? "Отвечай кратко." : "Be concise."}",
  "input": "${locale === "ru" ? "Объясни, почему небо голубое." : "Explain why the sky is blue."}",
  "stream": false
}`,
    },
    {
        name: "Native Gemini generateContent",
        path: "/v1beta/models/{model}:generateContent",
        marker: "gemini",
        streaming: locale === "ru"
            ? "Для потокового ответа используйте :streamGenerateContent?alt=sse."
            : "Use :streamGenerateContent?alt=sse for streaming.",
        body: `{
  "contents": [
    { "role": "user", "parts": [{ "text": "${locale === "ru" ? "Привет!" : "Hello!"}" }] }
  ]
}`,
    },
];

export default function EndpointsTab({ locale }: { locale: Locale }) {
    const copy = locale === "ru" ? {
        title: "Эндпоинты API",
        baseUrl: "Базовый URL",
        discovery: <>Используйте <code>GET /v1/models</code>, чтобы получить модели, доступные вашему ключу. Метка рядом с моделью на вкладке цен указывает, какой совместимый путь она поддерживает.</>,
        reference: <>Расход, ошибки, лимиты и правила повторных запросов описаны в <a href="/ru/api-reference">справочнике API</a>.</>,
    } : {
        title: "API endpoints",
        baseUrl: "Base URL",
        discovery: <>Use <code>GET /v1/models</code> for the models available to your key. The marker shown beside each model in the pricing tab determines which compatibility path it supports.</>,
        reference: <>See <a href="/api-reference">API Reference</a> for usage, errors, rate limits, and retry guidance.</>,
    };

    return (
        <section aria-labelledby="endpoints-heading">
            <h2 id="endpoints-heading">{copy.title}</h2>
            <p className={styles.endpointCopy}>
                {copy.baseUrl}: <code>https://api.aporto.tech</code>
            </p>
            <pre><code>{`Authorization: Bearer $APORTO_API_KEY
Content-Type: application/json`}</code></pre>
            <p className={styles.endpointDiscovery}>{copy.discovery}</p>

            {endpoints(locale).map((endpoint) => (
                <article key={endpoint.path} className={styles.endpoint}>
                    <h3>{endpoint.name}</h3>
                    <p className={styles.endpointMeta}>
                        <strong className={styles.method}>POST</strong>{' '}
                        <code>{endpoint.path}</code>{' '}
                        <span className={styles.endpointMarker}>({endpoint.marker})</span>
                    </p>
                    <p className={styles.endpointStreaming}>{endpoint.streaming}</p>
                    <pre><code>{endpoint.body}</code></pre>
                </article>
            ))}
            <p className={styles.endpointDiscovery}>{copy.reference}</p>
        </section>
    );
}
