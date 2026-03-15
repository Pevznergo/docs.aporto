"use client";

import React, { useState } from "react";

const models = [
    { provider: "OpenAI", items: ["openai/gpt-4o", "openai/gpt-4o-mini", "openai/gpt-4-turbo"] },
    { provider: "Anthropic", items: ["anthropic/claude-3.5-sonnet", "anthropic/claude-3-opus"] },
    { provider: "Google", items: ["google/gemini-pro", "google/gemini-flash"] },
    { provider: "Meta", items: ["meta-llama/llama-3.1-405b", "meta-llama/llama-3.2-90b"] },
    { provider: "Mistral", items: ["mistralai/mistral-large", "mistralai/mixtral-8x7b"] },
];

export default function AIModelsPage() {
    const [activeTab, setActiveTab] = useState("axios");

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>AI Model Access</h1>
            <p style={{ fontSize: '20px', marginBottom: '48px', color: '#888' }}>
                Access 400+ AI models through a single API — GPT-4, Claude, Gemini, Llama, and more — without managing separate accounts or API keys.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Quick Example</h2>
            
            <div style={{ background: '#111', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', marginBottom: '40px' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #333', background: '#0a0a0a' }}>
                    {['Axios', 'Fetch'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            style={{
                                padding: '12px 24px',
                                background: activeTab === tab.toLowerCase() ? 'transparent' : 'transparent',
                                border: 'none',
                                color: activeTab === tab.toLowerCase() ? '#00dc82' : '#666',
                                borderBottom: activeTab === tab.toLowerCase() ? '2px solid #00dc82' : '2px solid transparent',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div style={{ padding: '24px', background: '#0a0a0a' }}>
                    <pre style={{ margin: 0, overflowX: 'auto' }}>
                        <code style={{ fontSize: '14px', color: '#aaa' }}>
                            {activeTab === 'axios' ? (
`import axios from "axios";

const client = axios.create({
  headers: {
    "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
    "Content-Type": "application/json"
  }
});

const { data } = await client.post(
  "https://api.aporto.tech/v1/chat/completions",
  {
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Hello, world!" }],
    max_tokens: 100,
  }
);`
                            ) : (
`const response = await fetch(
  "https://api.aporto.tech/v1/chat/completions",
  {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "Hello, world!" }],
      max_tokens: 100,
    }),
  }
);

const data = await response.json();`
                            )}
                        </code>
                    </pre>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>How It Works</h2>
            <p style={{ marginBottom: '24px' }}>
                AI model requests are powered by Aporto's unified API Gateway. When you make a request, the gateway:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '40px', listStyleType: 'decimal' }}>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Authenticates</strong> your Aporto API key.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Checks</strong> your account balance and estimates the cost.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Forwards</strong> the request to the upstream provider flawlessly.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Returns</strong> the model response to your application.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>API Reference</h2>
            <p style={{ marginBottom: '24px' }}>
                All requests should be sent to the Aporto gateway URL:<br />
                <code style={{ background: '#222', padding: '2px 6px', borderRadius: '4px', color: '#00dc82' }}>https://api.aporto.tech/v1</code>
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>Chat Completions</h3>
            <p style={{ color: '#00dc82', fontWeight: '600', marginBottom: '12px' }}>POST /chat/completions</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', border: '1px solid #333' }}>
                <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Parameter</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Type</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Required</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { p: 'model', t: 'string', r: 'Yes', d: 'Full model name with provider (e.g., openai/gpt-4o-mini)' },
                        { p: 'messages', t: 'array', r: 'Yes', d: 'Array of message objects with role and content' },
                        { p: 'max_tokens', t: 'number', r: 'Yes', d: 'Maximum tokens to generate (required for cost estimation)' },
                        { p: 'stream', t: 'boolean', r: 'No', d: 'Whether to stream the response (default: false)' },
                    ].map((row, i) => (
                        <tr key={i}>
                            <td style={{ padding: '12px', border: '1px solid #333' }}><code style={{ color: '#e2e2e2' }}>{row.p}</code></td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>{row.t}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>{row.r}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>{row.d}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Supported Models</h2>
            <p style={{ marginBottom: '24px' }}>
                Aporto provides access to 400+ models. Here are some popular options:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '48px', border: '1px solid #333' }}>
                <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Provider</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Models</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((m, i) => (
                        <tr key={i}>
                            <td style={{ padding: '12px', border: '1px solid #333', fontWeight: '600', color: '#fff' }}>{m.provider}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {m.items.map(item => (
                                        <code key={item} style={{ background: '#222', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>{item}</code>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ background: 'rgba(0, 220, 130, 0.05)', border: '1px solid rgba(0, 220, 130, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '48px' }}>
                <p style={{ margin: 0, color: '#00dc82', fontSize: '15px' }}>
                    🚀 <strong>Tip</strong>: The pattern works with any SDK that accepts a <code>fetch</code> parameter — the standard fetch wrapper handles auth headers transparently.
                </p>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Error Codes</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '48px', border: '1px solid #333' }}>
                <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Code</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { c: '400', d: 'Invalid request — check model name and parameters' },
                        { c: '401', d: 'Unauthorized — check your APORTO_API_KEY' },
                        { c: '402', d: 'Payment required — ensure you have sufficient balance' },
                        { c: '404', d: 'Model not found — use full model name with provider prefix' },
                        { c: '429', d: 'Rate limit exceeded' },
                    ].map((row, i) => (
                        <tr key={i}>
                            <td style={{ padding: '12px', border: '1px solid #333', color: '#fff', fontWeight: '600' }}>{row.c}</td>
                            <td style={{ padding: '12px', border: '1px solid #333' }}>{row.d}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
