import React from "react";

export default function IntroductionPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>Introduction</h1>
            <p style={{ fontSize: '20px', marginBottom: '48px', color: '#888' }}>
                Welcome to the Aporto Documentation. Aporto is an AI skill network: one MCP router for agents, 1000+ skills, and paid provider routing behind every call.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>What is Aporto?</h2>
            <p style={{ marginBottom: '24px' }}>
                Aporto lets developers add one MCP server to an agent and instantly access skills for scraping, search, enrichment, AI models, images, audio, verification, and automation. Instead of wiring every provider yourself, your agent discovers the right skill and Aporto routes the request to the best active provider.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>One MCP Router</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Connect Claude Code, Cursor, Windsurf, Codex, or another MCP client to one endpoint: https://app.aporto.tech/api/mcp.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>1000+ Skills</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Discover skills by intent and execute them through provider routing. Aporto handles auth, metering, logs, and result delivery.</p>
                </div>
                <div style={{ background: '#111', border: '1px solid #333', padding: '24px', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00dc82', marginBottom: '12px', fontSize: '18px' }}>Provider Marketplace</h3>
                    <p style={{ fontSize: '14px', color: '#888' }}>Developers can publish skills and earn for every successful call. Consumers get the best available provider without vendor onboarding.</p>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Core Features</h2>
            <ul style={{ paddingLeft: '20px', marginBottom: '48px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Skill Discovery:</strong> Agents can search for the right capability at runtime instead of hard-coding a provider.
                </li>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Provider Routing:</strong> Aporto can create a new skill or attach a publisher as another provider behind an existing skill.
                </li>
                <li style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#fff' }}>Usage and Billing:</strong> Track every request, provider, result, and cost in the Dashboard. Pay only for metered calls.
                </li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Quick Start</h2>
            <p style={{ marginBottom: '20px' }}>
                Get started by adding the MCP router to your agent. Replace <code>$APORTO_API_KEY</code> with your token from the settings page.
            </p>
            <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', border: '1px solid #333', overflowX: 'auto', marginBottom: '48px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`export APORTO_API_KEY="sk-live-your_key_here"
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY`}
                </code>
            </pre>

            <div style={{ background: 'rgba(0, 220, 130, 0.05)', border: '1px solid rgba(0, 220, 130, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '48px' }}>
                <p style={{ margin: 0, color: '#00dc82', fontSize: '15px' }}>
                    <strong>Next Step</strong>: Open the <a href="/quick-start" style={{ color: '#fff', textDecoration: 'underline' }}>Quick Start</a> to discover and execute your first skill.
                </p>
            </div>
        </div>
    );
}
