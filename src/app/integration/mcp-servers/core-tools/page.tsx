"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Reference for the core tools available through Aporto's MCP server. For setup instructions, see [Setup](/integration/mcp-servers/setup).

---

## Search

### \`aporto_search\`

Search the web using Linkup.

\`query\` string required — Search query

\`depth\` string — \`"standard"\` ($0.006, default) or \`"deep"\` ($0.055)

\`outputType\` string — \`"sourcedAnswer"\` (default) or \`"searchResults"\`

---

### \`aporto_ai_search\`

AI-powered search using You.com.

\`query\` string required — Search query

\`type\` string — \`"search"\` ($0.005, default) or \`"research"\` ($0.0065 — long-form synthesized answer)

---

## SMS Verification

### \`aporto_sms_send\`

Send a verification code to a phone number via Prelude. Costs $0.015 per send.

\`to\` string required — Phone number in E.164 format (e.g., \`+15551234567\`)

\`type\` string — \`"sms"\` (default) or \`"whatsapp"\`

---

## Image Generation

### \`aporto_image_generate\`

Generate images from text prompts using FLUX models via fal.ai.

\`prompt\` string required — Image description

\`model\` string — \`"flux-schnell"\` ($0.004/MP, default), \`"flux-dev"\` ($0.015/MP), \`"flux-pro"\` ($0.04/MP)

\`image_size\` string — \`"square_hd"\` (1024×1024, default), \`"square"\`, \`"portrait_4_3"\`, \`"portrait_16_9"\`, \`"landscape_4_3"\`, \`"landscape_16_9"\`

\`num_images\` number — Images to generate, 1–4 (default: 1)

Returns image URLs in the tool response.

---

## Text-to-Speech

### \`aporto_tts_create\`

Convert text to speech using ElevenLabs. Returns base64-encoded audio/mpeg.

\`text\` string required — Text to speak

\`voice_id\` string — ElevenLabs voice ID (default: Rachel, \`21m00Tcm4TlvDq8ikWAM\`)

\`model_id\` string — ElevenLabs model (default: \`eleven_v3\`)

\`output_format\` string — Audio format (default: \`mp3_44100_128\`)

Cost: $0.24 per 1,000 characters.

---

## AI Models

### \`aporto_chat\`

Call any of 400+ AI models through Aporto's LLM gateway.

\`model\` string required — Model name, e.g. \`"openai/gpt-4o-mini"\`, \`"anthropic/claude-haiku-4-5-20251001"\`

\`messages\` array required — Chat messages: \`[{ role: "user", content: "Hello" }]\`

\`max_tokens\` number — Max tokens to generate

\`temperature\` number — Sampling temperature 0–2`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
