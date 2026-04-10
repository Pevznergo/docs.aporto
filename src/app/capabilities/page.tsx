"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Your agents need more than reasoning — they need access. Aporto gives your agents instant access to paid services like verification, web search, AI models, images, and TTS with pay-per-use pricing and zero vendor onboarding.

## Install the SDK

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
\`\`\`

## Available Capabilities

### Verify Users

Send a verification code (OTP) to a phone number. Powered by Prelude.

\`\`\`typescript
const result = await client.services.sms.send({ to: "+15551234567" });
\`\`\`

[Full docs →](/capabilities/verify)

---

### Search the Web

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

400+ models through a single API — GPT-4, Claude, Gemini, Llama, and more.

\`\`\`typescript
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

[Full docs →](/capabilities/ai-models)

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

Capability | What It Does | Starting Price
-----------|--------------|---------------
[Verify Users](/capabilities/verify) | Phone verification via OTP | \$0.015/send
[Search the Web](/capabilities/search) | AI-powered web search | \$0.006/search
[AI Model Access](/capabilities/ai-models) | 400+ AI models | Per-token pricing
[Generate Images](/capabilities/images) | AI image generation | \$0.004/megapixel
[Audio / TTS](/capabilities/audio) | Text-to-speech | \$0.24/1k characters

## Getting Started

1. **Get your API key** from the [Aporto Dashboard](https://app.aporto.tech)
2. \`npm install @aporto/core\`
3. Make your first request — see the [Quick Start](/quick-start) guide`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
