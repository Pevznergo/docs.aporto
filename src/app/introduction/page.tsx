import React from "react";
import styles from "./introduction.module.css";

export default function IntroductionPage() {
    return (
        <div className={styles.introPage} style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>All you need.</h1>
            <p style={{ fontSize: '18px', marginBottom: '32px', color: '#888', maxWidth: '700px' }}>
                <em>&ldquo;Scrape every competitor&apos;s pricing page, enrich leads from LinkedIn, generate product images, and send the report via email.&rdquo;</em>
            </p>
            <p style={{ fontSize: '16px', marginBottom: '48px', color: '#aaa' }}>
                Instant access to 1000+ paid skills — search, scraping, AI models, images, audio, verification, and automation. Pay per use. No vendor accounts. One CLI command.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Quick Start</h2>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>1. Get an API Key</h3>
            <p style={{ marginBottom: '16px', color: '#aaa' }}>
                Sign in to the <a href="https://app.aporto.tech/settings" style={{ color: '#00dc82', textDecoration: 'underline' }}>Aporto Dashboard</a> and generate an API key.
            </p>
            <pre style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: '10px', border: '1px solid #333', overflowX: 'auto', marginBottom: '28px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`export APORTO_API_KEY="sk-live-your_key_here"`}
                </code>
            </pre>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>2. Install the CLI</h3>
            <pre style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: '10px', border: '1px solid #333', overflowX: 'auto', marginBottom: '28px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`npm install -g @aporto-tech/sdk`}
                </code>
            </pre>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>3. Discover & Run Skills</h3>
            <pre style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: '10px', border: '1px solid #333', overflowX: 'auto', marginBottom: '48px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`aporto discover "generate image"
aporto run 4 --param prompt="a cat on the moon" --wait`}
                </code>
            </pre>

            <div style={{ background: '#111', border: '1px solid #333', padding: '24px 28px', borderRadius: '12px', marginBottom: '48px' }}>
                <p style={{ margin: 0, fontSize: '15px', color: '#aaa' }}>
                    <span style={{ color: '#00dc82', fontWeight: '600' }}>1000+ skills:</span>{' '}
                    Search, Scraping, Browser, AI Models, Image, Audio, Video, Verification, Automation, Email, Maps, Documents, and more.
                </p>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Alternative: MCP Server</h2>
            <p style={{ marginBottom: '16px', color: '#aaa' }}>
                If you&apos;re using an AI agent (Claude Code, Cursor, Windsurf, Codex), you can add Aporto as an MCP server instead:
            </p>
            <pre style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: '10px', border: '1px solid #333', overflowX: 'auto', marginBottom: '16px' }}>
                <code style={{ fontSize: '14px', color: '#00dc82' }}>
                    {`claude mcp add aporto -- --transport http --url https://app.aporto.tech/api/mcp --header "Authorization: Bearer $APORTO_API_KEY"`}
                </code>
            </pre>
            <p style={{ marginBottom: '48px', color: '#666', fontSize: '14px' }}>
                See <a href="/integration/mcp-servers/setup" style={{ color: '#00dc82', textDecoration: 'underline' }}>MCP Setup</a> for Cursor, Windsurf, and other clients.
            </p>

            <div style={{ background: 'rgba(0, 220, 130, 0.05)', border: '1px solid rgba(0, 220, 130, 0.2)', padding: '24px', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: '#00dc82', fontSize: '15px' }}>
                    <strong>Next</strong>: <a href="/quick-start" style={{ color: '#fff', textDecoration: 'underline' }}>Getting Started</a> — full CLI walkthrough with examples.
                </p>
            </div>
        </div>
    );
}
