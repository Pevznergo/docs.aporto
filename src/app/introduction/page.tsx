import React from "react";

export default function IntroductionPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>Introduction</h1>
            <p style={{ fontSize: '20px', marginBottom: '48px', color: '#888' }}>
                Welcome to the Aporto Documentation. Aporto provides a high-performance, unified API gateway to dozens of top-tier AI providers.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>What is Aporto?</h2>
            <p style={{ marginBottom: '24px' }}>
                Aporto simplifies the complexity of integrating multiple AI models. Instead of managing separate accounts, API keys, and billing for OpenAI, Anthropic, Google, and Meta, you integrate once with Aporto and get access to everything.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>One API, 400+ Models</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Access GPT-4, Claude 3.5, Gemini 1.5, and open-source models like Llama 3.1 through a single unified endpoint.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>Unified Billing</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Pay for all your AI usage in one place. No more managing 10+ different subscriptions and invoices.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>OpenAI Compatibility</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Our API is fully compatible with the OpenAI SDK, making migration as simple as changing the base URL.</p>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Core Features</h2>
            <ul style={{ paddingLeft: '20px', marginBottom: '48px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Real-time Monitoring:</strong> Track every request, token count, and cost in real-time via the Dashboard.
                </li>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Smart Routing:</strong> Coming soon: automatically route requests to the fastest or cheapest available model.
                </li>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Usage Limits:</strong> Set hard or soft budgets for your projects to prevent unexpected costs.
                </li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Quick Start</h2>
            <p style={{ marginBottom: '20px' }}>
                Get started in seconds with a simple <code>curl</code> command. Replace <code>$APORTO_API_KEY</code> with your token from the settings page.
            </p>
            <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', border: '1px solid #333', overflowX: 'auto', marginBottom: '48px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`curl https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ],
    "max_tokens": 100
  }'`}
                </code>
            </pre>

            <div style={{ background: 'rgba(0, 220, 130, 0.05)', border: '1px solid rgba(0, 220, 130, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '48px' }}>
                <p style={{ margin: 0, color: '#00dc82', fontSize: '15px' }}>
                    👉 <strong>Next Step</strong>: Explore the <a href="/capabilities/ai-models" style={{ color: '#fff', textDecoration: 'underline' }}>Supported Models</a> section to find the best model for your use case.
                </p>
            </div>
        </div>
    );
}
