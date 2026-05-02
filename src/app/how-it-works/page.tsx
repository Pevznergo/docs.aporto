"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto is an AI skill network. Developers connect one MCP router, discover the right skill by intent, and let Aporto route each paid request to the best active provider.

## Architecture

\`\`\`
  Agent / App              Aporto Router                Skill Provider
┌──────────────┐       ┌──────────────────┐          ┌──────────────────┐
│ MCP client   │ intent│ Skill discovery  │ selected │ Apify actor,     │
│ or app code  ├──────►│ Provider routing ├─────────►│ API wrapper,     │
│              │       │ Billing + logs   │          │ model, service   │
└──────────────┘◄──────┤ Result normalize │◄─────────┤                  │
     result            └──────────────────┘  result  └──────────────────┘
\`\`\`

1. Your agent connects to \`https://app.aporto.tech/api/mcp\`
2. It calls \`aporto_discover_skills\` with the user intent
3. Aporto returns matching skills, required inputs, and provider options
4. The agent calls \`aporto_execute_skill\`
5. Aporto selects the best active provider, executes the request, logs usage, and meters cost

You never need credentials for the underlying providers. Your Aporto API key covers auth, routing, billing, and logs.

## Skills and Providers

**Skill** means what the agent can do: extract a LinkedIn profile, search the web, generate an image, send an OTP, run a browser task.

**Provider** means who implements that skill. Multiple providers can compete behind the same skill, and the publisher still sees their listing as a skill.

Aporto creates a new skill when the source, data type, or action is different. Aporto adds a provider to an existing skill when the capability is the same but implementation, price, speed, or quality differs.

## Endpoints

**MCP router - recommended for agents:**
\`\`\`
https://app.aporto.tech/api/mcp
\`\`\`
Use this from Claude Code, Cursor, Windsurf, Codex, or any MCP-capable agent.

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

The same key works for the MCP router and the model gateway.

## Billing

Aporto uses a **prepaid balance** model.

- Top up at [app.aporto.tech](https://app.aporto.tech)
- Each skill call deducts the metered provider cost
- Balance is shared across MCP skill calls and Aporto AI model calls
- No provider onboarding, separate vendor invoices, or minimum commitments

If your balance hits zero, requests return \`402 Payment Required\`. Top up to continue.

## Public Agent Surface

Surface | Purpose | Access
--------|---------|-------
\`aporto_discover_skills\` | Find the right skill for an intent | MCP router
\`aporto_execute_skill\` | Execute the selected skill through provider routing | MCP router
Aporto AI | Call 400+ LLM models directly | MCP router / OpenAI-compatible gateway

## Activity

Aporto logs every request. The [Dashboard](https://app.aporto.tech) shows:

- Cost breakdown per skill and provider
- Request and response details
- Usage history over time

## Next Steps

[Quick Start](/quick-start) Connect the MCP router and call your first skill.

[Browse Capabilities](/capabilities) See the public agent surface.

[MCP Setup](/integration/mcp-servers/setup) Configure your agent tool.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
