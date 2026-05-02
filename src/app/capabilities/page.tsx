"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Your agents need more than reasoning - they need skills. Aporto gives agents one MCP router for 1000+ paid skills across data extraction, search, AI models, communication, media, and automation.

## Recommended: Use the MCP Router

\`\`\`bash
export APORTO_API_KEY="sk-live-your_key_here"
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
\`\`\`

Then ask your agent to discover and execute skills:

\`\`\`text
Use Aporto to find the best skill for extracting public LinkedIn company pages, then run it for these URLs.
\`\`\`

For SDK examples below:

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
\`\`\`

## Skill Categories

### Scraping and Enrichment

LinkedIn profiles, company pages, posts, jobs, website data, search results, and other structured extraction workflows. Aporto can route the same skill to multiple active providers.

Example skills:

- LinkedIn Person Profile Extractor
- LinkedIn Company Profile Extractor
- LinkedIn Profile Posts Extractor
- LinkedIn Job Listing Scraper

---

### Search and Research

Real-time web search with AI-generated answers. Two providers: Linkup and You.com.

\`\`\`typescript
// Linkup — structured results, sourced answers
const results = await client.services.search.query({
  query: "latest AI news",
  depth: "standard",
  outputType: "sourcedAnswer",
});

// You.com — AI answer from the web
const answer = await client.services.search.ai({
  query: "what is retrieval augmented generation?",
});
\`\`\`

[Full docs →](/capabilities/search)

---

### AI Model Access

400+ models through a single OpenAI-compatible gateway - GPT, Claude, Gemini, Llama, and more.

\`\`\`typescript
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

[Full docs →](/capabilities/ai-models)

---

### Verify Users

Send a verification code (OTP) to a phone number. Powered by Prelude.

\`\`\`typescript
const result = await client.services.sms.send({ to: "+15551234567" });
\`\`\`

[Full docs →](/capabilities/verify)

---

### Generate Images

Text-to-image with FLUX models. Powered by Fal.ai.

\`\`\`typescript
const result = await client.services.images.generate({
  prompt: "a futuristic city at sunset",
  model: "flux-schnell",
  image_size: "landscape_4_3",
});
console.log(result.images?.[0].url);
\`\`\`

[Full docs →](/capabilities/images)

---

### Audio / Text-to-Speech

Natural-sounding speech from text. Powered by ElevenLabs. Returns \`ArrayBuffer\`.

\`\`\`typescript
import fs from "fs";

const audio = await client.services.tts.create({
  text: "Hello! Welcome to Aporto.",
  voice_id: "21m00Tcm4TlvDq8ikWAM",
});
fs.writeFileSync("output.mp3", Buffer.from(audio));
\`\`\`

[Full docs →](/capabilities/audio)

---

## Quick Comparison

Capability | What It Does | Access
-----------|--------------|-------
Scraping and enrichment | Public web and social data extraction | MCP router
[Search the Web](/capabilities/search) | AI-powered web search | MCP router / SDK
[AI Model Access](/capabilities/ai-models) | 400+ AI models | OpenAI-compatible gateway
[Verify Users](/capabilities/verify) | Phone verification via OTP | MCP router / SDK
[Generate Images](/capabilities/images) | AI image generation | MCP router / SDK
[Audio / TTS](/capabilities/audio) | Text-to-speech | MCP router / SDK

## Getting Started

1. **Get your API key** from the [Aporto Dashboard](https://app.aporto.tech)
2. Connect the [MCP router](/integration/mcp-servers/setup)
3. Discover a skill, execute it, and let Aporto handle provider routing`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
