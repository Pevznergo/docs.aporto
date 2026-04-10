"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto is a unified API gateway that gives you access to 400+ AI models and partner services — all through a single API key and prepaid balance.

## Architecture

\`\`\`
  Your App                   Aporto                      Provider
┌──────────┐           ┌──────────────┐            ┌──────────────────┐
│          │  request  │              │  proxied   │ OpenRouter,      │
│  Code +  ├──────────►│   Gateway    ├───────────►│ Prelude,         │
│ @aporto/ │           │              │            │ ElevenLabs, ...  │
│  core    │◄──────────┤  • Auth      │◄───────────┤                  │
│          │  response │  • Billing   │  response  │                  │
└──────────┘           │  • Logging   │            └──────────────────┘
                       └──────────────┘
\`\`\`

1. Your code calls the \`@aporto/core\` SDK (or any OpenAI-compatible client)
2. The gateway authenticates your key and checks your balance
3. The request is forwarded to the provider
4. The response is returned and the cost is deducted

You never need credentials for the underlying providers — just your Aporto API key.

## Two Endpoints

**AI models** — OpenAI-compatible LLM gateway:
\`\`\`
https://api.aporto.tech/v1
\`\`\`
Works with \`@aporto/core\`, the OpenAI SDK, or any OpenAI-compatible client.

**Partner services** — SMS, search, images, TTS:
\`\`\`
https://app.aporto.tech/api/services/{name}
\`\`\`
Called via \`client.services.*\` in the SDK. Same API key.

## Authentication

All requests use Bearer token auth:

\`\`\`
Authorization: Bearer sk-live-{your_key}
\`\`\`

The same key works for both endpoints.

## Billing

Aporto uses a **prepaid balance** model.

- Top up at [app.aporto.tech](https://app.aporto.tech) — credit card (Stripe) gives a **30% bonus** on your balance, crypto also accepted via NowPayments
- Each API call deducts the cost — no subscriptions, no minimums
- Balance is shared across all services: LLM calls, SMS, search, images, TTS

If your balance hits zero, requests return \`402 Payment Required\`. Top up to continue.

## Capabilities

Capability | Provider | Endpoint
-----------|----------|----------
[AI Models](/capabilities/ai-models) | OpenRouter | \`api.aporto.tech/v1\`
[Verify Users](/capabilities/verify) | Prelude | \`/api/services/sms\`
[Search the Web](/capabilities/search) | Linkup, You.com | \`/api/services/search\`, \`/api/services/ai-search\`
[Generate Images](/capabilities/images) | Fal.ai | \`/api/services/image\`
[Audio / TTS](/capabilities/audio) | ElevenLabs | \`/api/services/tts\`

## Activity

Aporto logs every request. The [Dashboard](https://app.aporto.tech) shows:

- Cost breakdown per service
- Request and response details
- Usage history over time

## Next Steps

[Quick Start](/quick-start) Call your first API in 3 steps.

[Browse Capabilities](/capabilities) See all available services.

[Using Services](/using-services) Walkthrough: send an SMS end-to-end.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
