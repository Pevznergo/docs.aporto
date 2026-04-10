"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Convert text to natural-sounding speech — no ElevenLabs account required. Returns audio as an \`ArrayBuffer\`.

## Quick Example

\`\`\`typescript
import AportoClient from "@aporto/core";
import fs from "fs";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

const audio = await client.services.tts.create({
  text: "Hello! Welcome to Aporto.",
  voice_id: "21m00Tcm4TlvDq8ikWAM", // Rachel — calm female voice
});

fs.writeFileSync("output.mp3", Buffer.from(audio));
console.log("Audio saved to output.mp3");
\`\`\`

## How It Works

Aporto routes TTS requests to [ElevenLabs](https://elevenlabs.io), which provides industry-leading voice synthesis. The response is binary audio data (\`audio/mpeg\`), returned as an \`ArrayBuffer\`. Pricing is per character.

## SDK Reference

\`\`\`typescript
client.services.tts.create(params): Promise<ArrayBuffer>
\`\`\`

### Parameters

Parameter | Type | Required | Description
----------|------|----------|------------
\`text\` | string | Yes | Text to convert to speech (max 5000 characters)
\`voice_id\` | string | No | ElevenLabs voice ID (see popular voices below)
\`model_id\` | string | No | Synthesis model (default: \`eleven_multilingual_v2\`)
\`output_format\` | string | No | Audio format (default: \`mp3_44100_128\`)

### Popular Voice IDs

Voice ID | Name | Description
---------|------|------------
\`21m00Tcm4TlvDq8ikWAM\` | Rachel | Calm female voice
\`EXAVITQu4vr4xnSDxMaL\` | Sarah | Soft female voice
\`JBFqnCBsd6RMkjVDRZzb\` | George | Male narrative voice
\`AZnzlk1XvdvUeBnXmlld\` | Domi | Strong female voice

### Response

Returns a raw \`ArrayBuffer\` (binary MP3 data). Save it to a file or stream it directly.

\`\`\`typescript
const audio = await client.services.tts.create({ text: "Hello world" });
// audio is ArrayBuffer
const buffer = Buffer.from(audio);
fs.writeFileSync("output.mp3", buffer);
\`\`\`

### Output Format Options

- MP3: \`mp3_22050_32\`, \`mp3_44100_64\`, \`mp3_44100_128\`, \`mp3_44100_192\`
- PCM: \`pcm_16000\`, \`pcm_22050\`, \`pcm_24000\`, \`pcm_44100\`

## Raw HTTP

**Endpoint:** \`POST https://app.aporto.tech/api/services/tts\`

\`\`\`bash
curl https://app.aporto.tech/api/services/tts \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello world",
    "voice_id": "21m00Tcm4TlvDq8ikWAM"
  }' \\
  --output output.mp3
\`\`\`

## Complete Example

\`\`\`typescript
import AportoClient from "@aporto/core";
import fs from "fs";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

async function createPodcastIntro(title: string, host: string) {
  const script = \`Welcome to \${title}. I'm your host, \${host}. Let's dive in.\`;

  const audio = await client.services.tts.create({
    text: script,
    voice_id: "JBFqnCBsd6RMkjVDRZzb", // George — narrative voice
    model_id: "eleven_multilingual_v2",
  });

  const buffer = Buffer.from(audio);
  fs.writeFileSync("intro.mp3", buffer);
  console.log(\`Intro audio: \${buffer.byteLength} bytes\`);
  return buffer;
}

await createPodcastIntro("Tech Weekly", "Alex");
\`\`\`

## Pricing

Operation | Price | Unit
----------|-------|-----
Text-to-Speech | \$0.24 | per 1,000 characters

**Example costs:**
- 100 characters: ~\$0.024
- 500 characters: ~\$0.12
- 1,000 characters: \$0.24

## Error Codes

Code | Description
-----|------------
400 | Invalid request — check parameters
401 | Unauthorized — check your API key
402 | Insufficient balance — top up at app.aporto.tech
413 | Text too long (max 5000 characters)
429 | Rate limit exceeded

## Provider

Powered by [ElevenLabs](https://elevenlabs.io). Industry-leading voice synthesis with natural intonation across 29 languages.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
