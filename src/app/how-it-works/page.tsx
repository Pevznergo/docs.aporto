"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto is an AI skill network. Install the CLI, discover skills by intent, and run them — Aporto routes each request to the best active provider.

## Architecture

\`\`\`
  Developer / Agent           Aporto Router                Skill Provider
┌──────────────────┐       ┌──────────────────┐          ┌──────────────────┐
│ CLI command      │ intent│ Skill discovery  │ selected │ Apify actor,     │
│ or MCP client    ├──────►│ Provider routing ├─────────►│ API wrapper,     │
│                  │       │ Billing + logs   │          │ model, service   │
└──────────────────┘◄──────┤ Result normalize │◄─────────┤                  │
     result                └──────────────────┘  result  └──────────────────┘
\`\`\`

## How It Works

### Primary: CLI

1. Install the CLI: \`npm install -g @aporto-tech/sdk\`
2. Discover skills: \`aporto discover "scrape website"\`
3. Run a skill: \`aporto run 12 --param url="https://example.com" --wait\`
4. Aporto selects the best active provider, executes the request, logs usage, and meters cost

### Alternative: MCP Server

For AI agents (Claude Code, Cursor, Windsurf, Codex), add Aporto as an MCP server:

\`\`\`bash
claude mcp add aporto -- --transport http --url https://app.aporto.tech/api/mcp --header "Authorization: Bearer $APORTO_API_KEY"
\`\`\`

Your agent connects to \`https://app.aporto.tech/api/mcp\` and gets access to:
- \`aporto_discover_skills\` — find skills by description
- \`aporto_run_skill\` — execute with smart provider routing
- \`aporto_get_skill_run\` — poll async results
- \`aporto_chat\` — LLM completions (400+ models)
- \`aporto_image_generate\` — image generation
- \`aporto_tts_create\` — text to speech
- \`aporto_search\` — web search

You never need credentials for the underlying providers. Your Aporto API key covers auth, routing, billing, and logs.

## Skills and Providers

**Skill** means what you can do: extract a LinkedIn profile, search the web, generate an image, send an OTP, run a browser task.

**Provider** means who implements that skill. Multiple providers can compete behind the same skill — Aporto picks the best one automatically.

Aporto creates a new skill when the source, data type, or action is different. Aporto adds a provider to an existing skill when the capability is the same but implementation, price, speed, or quality differs.

## Endpoints

**MCP router (for AI agents):**
\`\`\`
https://app.aporto.tech/api/mcp
\`\`\`

**OpenAI-compatible model gateway:**
\`\`\`
https://api.aporto.tech/v1
\`\`\`
Works with the OpenAI SDK, LangChain, LlamaIndex, and other OpenAI-compatible clients.

## Authentication

All requests use Bearer token auth:

\`\`\`
Authorization: Bearer sk-live-{your_key}
\`\`\`

The same key works for the CLI, MCP router, and the model gateway.

## Billing

Aporto uses a **prepaid balance** model.

- Top up at [app.aporto.tech](https://app.aporto.tech)
- Each skill call deducts the metered provider cost
- Balance is shared across CLI calls, MCP skill calls, and Aporto AI model calls
- No provider onboarding, separate vendor invoices, or minimum commitments

If your balance hits zero, requests return \`402 Payment Required\`. Top up to continue.

## Next Steps

[Quick Start](/quick-start) Install the CLI and run your first skill.

[Browse Capabilities](/capabilities) See the skill categories and available tools.

[MCP Setup](/integration/mcp-servers/setup) Configure Aporto in Claude Code, Cursor, or Windsurf.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
