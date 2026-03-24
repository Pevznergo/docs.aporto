"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto is a gateway that sits between your AI agents and paid third-party services. It handles authentication, payment, and governance so you can call any supported API with a single key.

## Architecture

[Section titled “Architecture”](#architecture)

\`\`\`
  Your Agent                  Aporto                     Service Provider ┌──────────┐           ┌──────────────┐            ┌──────────────────┐ │          │  request   │              │  proxied   │  Linkup, OpenAI, │ │  Code +  ├──────────►│   Gateway    ├───────────►│  ElevenLabs, ... │ │  Aporto  │           │              │            │                  │ │  SDK     │◄──────────┤  • Auth      │◄───────────┤                  │ │          │  response  │  • Payment   │  response  │                  │ └──────────┘           │  • Rules     │            └──────────────────┘                        │  • Tracking  │                        └──────────────┘
\`\`\`

1.  Your code makes a normal HTTP request through the Aporto SDK
2.  The gateway authenticates the request, checks governance rules, and handles payment
3.  The request is forwarded to the service provider
4.  The response comes back through the gateway, which logs the transaction

You never need credentials for the underlying service — just your Aporto API key.

Two auth models

**Service gateways** (\`*.services.aporto.tech\`) use the **x402 payment protocol** — wrap your HTTP client with the Aporto SDK and payment is handled automatically.

**Governance API** (\`api.aporto.tech\`) uses **Bearer token auth** — pass your API key directly as \`Authorization: Bearer YOUR_API_KEY\`. No SDK wrapper needed for governance endpoints (rules, agents, activity).

## Capabilities

[Section titled “Capabilities”](#capabilities)

Capabilities are the paid services available through Aporto. Each capability maps to a third-party provider and is accessed at a \`*.services.aporto.tech\` URL:

Capability

Providers

What it does

[Verify Users](/capabilities/verify)

Prelude

Phone and email verification

[Search the Web](/capabilities/search)

Linkup, You.com

AI-powered web search with live crawling

[AI Model Access](/capabilities/ai-models)

OpenRouter

400+ models (GPT-4, Claude, Llama, etc.)

[Compute](/capabilities/compute)

Blaxel

Deploy sandboxes and proxy sandbox runtimes

[Data](/capabilities/data)

Upstash (Redis, Vector, Search)

Provision and use data infrastructure

[Messaging](/capabilities/messaging)

Upstash (QStash)

Publish and queue async messages

[Generate Images](/capabilities/images)

Fal.ai

FLUX and SDXL image generation

[Audio Services](/capabilities/audio)

ElevenLabs

Text-to-speech, transcription, sound effects

[Browser Automation](/capabilities/browser)

Anchor Browser

Web scraping, screenshots, AI browser tasks

Each provider’s API is available at its own subdomain. For example, Linkup search lives at \`https://linkup.services.aporto.tech/v1/search\`.

## The Payment Flow

[Section titled “The Payment Flow”](#the-payment-flow)

Aporto uses the [HTTP 402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402) status code to handle payments inline. The SDK manages this automatically — here’s what happens under the hood:

\`\`\`
  Your Code              SDK                Gateway            Provider     │                    │                    │                   │     │  client.get(url)   │                    │                   │     ├───────────────────►│  POST with payment │                   │     │                    ├───────────────────►│                   │     │                    │                    │  Forward request  │     │                    │                    ├──────────────────►│     │                    │                    │◄──────────────────┤     │                    │◄───────────────────┤                   │     │◄───────────────────┤  Response data     │                   │     │                    │                    │                   │
\`\`\`

The SDK wraps your HTTP client (\`axios\`, \`fetch\`, etc.) and attaches payment headers to every request. You write normal HTTP code — the payment negotiation is invisible.

\`\`\`
import axios from "axios";import { withAporto } from "@aporto/axios";
// Wrap your client onceconst client = withAporto(axios.create(), {  apiKey: process.env.SAPIOM_API_KEY!,});
// Then make requests as usual — payment is handled automaticallyconst { data } = await client.get(  "https://linkup.services.aporto.tech/v1/search",  { params: { q: "latest AI news", depth: "standard" } });
\`\`\`

Note

Each billable request creates a **transaction** — a record of the API call, its cost, and its status (pending, authorized, completed, or denied). You can view all transactions in the [Dashboard](https://app.aporto.tech).

## Agents

[Section titled “Agents”](#agents)

An **agent** is an identity for your AI application in Aporto. When you create an API key in the Dashboard, it’s associated with an agent. Agents let you:

*   **Track usage** per application — see which app is calling which services
*   **Set spend limits** — cap costs per agent on a per-run, daily, weekly, or monthly basis
*   **Enforce rules** — apply different governance policies to different apps

A single Aporto account can have multiple agents. For example, you might have one agent for your production chatbot and another for internal tooling — each with its own limits and usage history.

## Governance

[Section titled “Governance”](#governance)

Governance is how you control what your agents can do. Aporto provides two types of rules:

*   **Spend limits** — Cap how much an agent can spend per run, day, week, or month
*   **Usage limits** — Restrict the number of API calls or tokens an agent can consume

Rules are optional. You can start without any and add them as you move toward production. See [Setting Up Rules](/governance/rules) for details.

## Activity

[Section titled “Activity”](#activity)

Aporto logs every request as a transaction. The [Dashboard](https://app.aporto.tech) gives you a real-time view of:

*   Request and response details for every API call
*   Cost breakdown per service and per agent
*   Rule enforcement — which requests were allowed or blocked
*   Execution traces showing the full lifecycle of each call

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Quick Start](/quick-start) Call a paid API in 3 steps.

[Browse Capabilities](/capabilities) See all available services and their APIs.

[Set Up Governance](/governance) Add spend limits and usage rules.

[Integration Guide](/integration/http-clients) Axios, Fetch, LangChain, and more.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
