const endpoints = [
    {
        name: "Chat Completions",
        method: "POST",
        path: "/v1/chat/completions",
        description: "OpenAI-compatible chat, tool calls, structured output, and SSE streaming.",
        streaming: "Set stream: true. The response uses OpenAI data events and ends with [DONE].",
        body: `{
  "model": "openai/gpt-5.4",
  "messages": [
    { "role": "user", "content": "Explain this in one sentence." }
  ],
  "stream": false
}`,
    },
    {
        name: "Responses",
        method: "POST",
        path: "/v1/responses",
        description: "OpenAI Responses-compatible input, instructions, function tools, reasoning, and streaming events.",
        streaming: "Set stream: true to receive Responses SSE events. Responses-only tools require a model with a native Responses route.",
        body: `{
  "model": "openai/gpt-5.6-sol",
  "instructions": "Be concise.",
  "input": "Explain why the sky is blue.",
  "stream": false
}`,
    },
    {
        name: "Anthropic Messages",
        method: "POST",
        path: "/v1/messages",
        description: "Anthropic-compatible messages and tool use with Claude-style responses.",
        streaming: "Set stream: true to receive Anthropic message and content-block SSE events.",
        body: `{
  "model": "anthropic/claude-sonnet-4.6",
  "max_tokens": 1024,
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "stream": false
}`,
    },
    {
        name: "Image Generations",
        method: "POST",
        path: "/v1/images/generations",
        description: "OpenAI-compatible text-to-image generation with usage-based image-token billing.",
        streaming: "Non-streaming is the portable default. Streaming support depends on the selected image model.",
        body: `{
  "model": "google/gemini-3.1-flash-image",
  "prompt": "A red circle centered on a white background",
  "n": 1,
  "size": "1024x1024",
  "response_format": "b64_json"
}`,
    },
    {
        name: "Gemini generateContent",
        method: "POST",
        path: "/v1beta/models/{model}:generateContent",
        description: "Native Gemini request and response format using the full Aporto model name in the URL.",
        streaming: "For streaming, use :streamGenerateContent?alt=sse instead of :generateContent.",
        body: `{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Hello!" }]
    }
  ],
  "generationConfig": { "maxOutputTokens": 1024 }
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
            <h2 id="endpoints-heading" style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>API Endpoints</h2>
            <p style={{ color: '#aaa', marginBottom: '12px' }}>
                Base URL: <code style={{ color: '#00dc82' }}>https://api.aporto.tech</code>
            </p>
            <pre style={{ ...codeStyle, marginBottom: '20px' }}><code>{`Authorization: Bearer $APORTO_API_KEY
Content-Type: application/json`}</code></pre>
            <p style={{ color: '#888', marginBottom: '32px' }}>
                Every endpoint accepts Bearer authentication. Anthropic&apos;s <code>x-api-key</code> and Gemini&apos;s <code>x-goog-api-key</code> are also accepted. Use <code>GET /v1/models</code> for model discovery and the Models &amp; Pricing tab to check endpoint compatibility.
            </p>

            {endpoints.map((endpoint) => (
                <article key={endpoint.path} style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #2a2a2a' }}>
                    <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>{endpoint.name}</h3>
                    <p style={{ marginBottom: '12px' }}>
                        <strong style={{ color: '#00dc82' }}>{endpoint.method}</strong>{' '}
                        <code style={{ color: '#e2e2e2' }}>{endpoint.path}</code>
                    </p>
                    <p style={{ color: '#aaa', marginBottom: '8px' }}>{endpoint.description}</p>
                    <p style={{ color: '#777', fontSize: '14px', marginBottom: '16px' }}>{endpoint.streaming}</p>
                    <pre style={codeStyle}><code>{endpoint.body}</code></pre>
                </article>
            ))}
        </section>
    );
}
