"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Your agents need more than reasoning — they need access. Aporto gives your agents instant access to paid services like verification, web search, and AI models with pay-per-use pricing and zero vendor onboarding.

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto acts as your gateway to paid services. When your agent makes a request:

1.  **Your request goes to a Aporto-powered endpoint** — Each service has a gateway URL (like \`prelude.services.aporto.tech\`)
2.  **Aporto handles payment automatically** — The SDK negotiates micropayments so you don’t manage vendor accounts
3.  **You pay only for what you use** — No subscriptions, no minimums, no upfront costs

All you need is a Aporto API key and the SDK. The SDK wraps your existing HTTP client (Axios, Fetch, etc.) to handle authentication and payment negotiation transparently.

## Available Capabilities

[Section titled “Available Capabilities”](#available-capabilities)

Verify Users

Verify phone numbers and email addresses with OTP codes. Build trust into your agent workflows without managing Twilio or other SMS providers.

[Get started →](/capabilities/verify)

Search the Web

Give your agents real-time information from the web. Get raw search results, AI-generated answers with citations, or structured data extraction.

[Get started →](/capabilities/search)

AI Model Access

Access 400+ AI models through a single API. Use GPT-4, Claude, Gemini, Llama, and more without managing separate accounts.

[Get started →](/capabilities/ai-models)

Compute

Deploy services and manage sandbox runtimes through Blaxel-powered compute endpoints.

[Get started →](/capabilities/compute)

Data

Provision Redis, Vector, Search, and PostgreSQL databases through Aporto’s data gateway.

[Get started →](/capabilities/data)

Messaging

Publish, enqueue, and batch asynchronous messages using Upstash QStash through Aporto.

[Get started →](/capabilities/messaging)

Generate Images

Create images from text prompts with FLUX and SDXL models. Transform existing images or upscale to higher resolution.

[Get started →](/capabilities/images)

Audio Services

Convert text to natural speech or generate custom sound effects with AI voice technology.

[Get started →](/capabilities/audio)

Browser Automation

Extract content from web pages, capture screenshots, or execute complex browser tasks using natural language.

[Get started →](/capabilities/browser)

Web Scraping

Scrape pages, crawl sites, and extract structured data with Firecrawl-powered browser rendering.

[Get started →](/capabilities/scraping)

## Quick Comparison

[Section titled “Quick Comparison”](#quick-comparison)

Capability

What It Does

Starting Price

[Verify Users](/capabilities/verify)

Phone & email verification

\$0.015/verification

[Search the Web](/capabilities/search)

AI-powered web search

\$0.006/search

[AI Model Access](/capabilities/ai-models)

400+ AI models

Per-token pricing

[Compute](/capabilities/compute)

Code execution and sandboxes

Per-second, tier-based

[Data](/capabilities/data)

Redis, vector, search, and PostgreSQL databases

Per-command/request

[Messaging](/capabilities/messaging)

Queueing and async message delivery

Per-message

[Generate Images](/capabilities/images)

AI image generation

\$0.004/megapixel

[Audio Services](/capabilities/audio)

TTS, sound effects

\$0.08/generation

[Browser Automation](/capabilities/browser)

Web scraping & screenshots

\$0.01/extraction

[Web Scraping](/capabilities/scraping)

Crawl sites & extract data

\$0.009/page

## Getting Started

[Section titled “Getting Started”](#getting-started)

1.  **Get your API key** from the [Aporto Dashboard](https://app.aporto.tech)
2.  **Install the SDK** for your HTTP client
3.  **Make your first request** — see the [Quick Start](/quick-start) guide

## Next Steps

[Section titled “Next Steps”](#next-steps)

*   [Quick Start](/quick-start) — Verify a phone number in 5 minutes
*   [Verify Users](/capabilities/verify) — Phone and email verification
*   [Search the Web](/capabilities/search) — AI-powered web search
*   [AI Model Access](/capabilities/ai-models) — Access 400+ AI models
*   [Compute](/capabilities/compute) — Deploy and manage sandboxes
*   [Data](/capabilities/data) — Redis, vector, and search capabilities
*   [Messaging](/capabilities/messaging) — QStash publish/enqueue/batch
*   [Generate Images](/capabilities/images) — AI image generation
*   [Audio Services](/capabilities/audio) — Text-to-speech and sound effects
*   [Browser Automation](/capabilities/browser) — Web scraping and screenshots
*   [Web Scraping](/capabilities/scraping) — Crawl sites and extract structured data`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
