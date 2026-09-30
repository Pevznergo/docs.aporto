const endpoints = [
    {
        name: "OpenAI Chat Completions",
        path: "/v1/chat/completions",
        marker: "openai",
        streaming: 'Set "stream": true for SSE chunks ending with [DONE].',
        body: `{
  "model": "$APORTO_MODEL",
  "messages": [{ "role": "user", "content": "Explain this in one sentence." }],
  "stream": false
}`,
    },
    {
        name: "OpenAI Responses",
        path: "/v1/responses",
        marker: "openai-response",
        streaming: 'Set "stream": true for Responses API events.',
        body: `{
  "model": "$APORTO_MODEL",
  "instructions": "Be concise.",
  "input": "Explain why the sky is blue.",
  "stream": false
}`,
    },
    {
        name: "Native Gemini generateContent",
        path: "/v1beta/models/{model}:generateContent",
        marker: "gemini",
        streaming: "Use :streamGenerateContent?alt=sse for streaming.",
        body: `{
  "contents": [
    { "role": "user", "parts": [{ "text": "Hello!" }] }
  ]
}`,
    },
];

const codeStyle = {
    margin: 0,
    padding: '18px',
    overflowX: 'auto' as const,
    color: '#bbb',
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    fontSize: '13px',
};

export default function EndpointsTab() {
    return (
        <section aria-labelledby="endpoints-heading">
            <h2 id="endpoints-heading" style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>API endpoints</h2>
            <p style={{ color: '#aaa', marginBottom: '12px' }}>
                Base URL: <code style={{ color: '#00dc82' }}>https://api.aporto.tech</code>
            </p>
            <pre style={{ ...codeStyle, marginBottom: '20px' }}><code>{`Authorization: Bearer $APORTO_API_KEY
Content-Type: application/json`}</code></pre>
            <p style={{ color: '#888', marginBottom: '32px' }}>
                Use <code>GET /v1/models</code> for the models available to your key. The marker shown beside each model in the pricing tab determines which compatibility path it supports.
            </p>

            {endpoints.map((endpoint) => (
                <article key={endpoint.path} style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #2a2a2a' }}>
                    <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>{endpoint.name}</h3>
                    <p style={{ marginBottom: '12px' }}>
                        <strong style={{ color: '#00dc82' }}>POST</strong>{' '}
                        <code style={{ color: '#e2e2e2' }}>{endpoint.path}</code>{' '}
                        <span style={{ color: '#666' }}>({endpoint.marker})</span>
                    </p>
                    <p style={{ color: '#777', fontSize: '14px', marginBottom: '16px' }}>{endpoint.streaming}</p>
                    <pre style={codeStyle}><code>{endpoint.body}</code></pre>
                </article>
            ))}
            <p style={{ color: '#888' }}>
                See <a href="/api-reference" style={{ color: '#00dc82' }}>API Reference</a> for usage, errors, rate limits, and retry guidance.
            </p>
        </section>
    );
}
