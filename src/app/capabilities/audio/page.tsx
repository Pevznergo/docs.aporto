"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Convert text to natural-sounding speech or generate sound effects — all through a single API with no account setup required.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";import fs from "fs";
// Create a Aporto-tracked fetch functionconst aportoFetch = createFetch({  apiKey: process.env.APORTO_API_KEY,  agentName: "my-agent",});
// Convert text to speech - SDK handles payment/auth automaticallyconst response = await aportoFetch(  "https://elevenlabs.services.aporto.tech/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      text: "Hello! Welcome to Aporto. This is a test of the text-to-speech API.",      model_id: "eleven_multilingual_v2",    }),  });
// Save the audio to a fileconst buffer = await response.arrayBuffer();fs.writeFileSync("output.mp3", Buffer.from(buffer));console.log("Audio saved to output.mp3");
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto routes audio requests to [ElevenLabs](https://elevenlabs.io), which provides state-of-the-art voice AI technology. The SDK handles payment negotiation automatically — you pay based on character count (TTS) or a flat rate (sound effects).

The service supports two operations:

1.  **Text-to-Speech** — Convert text to natural-sounding audio
2.  **Sound Effects** — Generate sound effects from text descriptions

## Provider

[Section titled “Provider”](#provider)

Powered by [ElevenLabs](https://elevenlabs.io). ElevenLabs provides industry-leading voice synthesis with natural intonation and emotional range across 29 languages.

## API Reference

[Section titled “API Reference”](#api-reference)

### Text-to-Speech

[Section titled “Text-to-Speech”](#text-to-speech)

**Endpoint:** \`POST https://elevenlabs.services.aporto.tech/v1/text-to-speech/{voiceId}\`

Convert text to natural-sounding speech. The voice ID is specified in the URL path.

**Popular voice IDs:**

*   \`EXAVITQu4vr4xnSDxMaL\` — Sarah (female, soft)
*   \`JBFqnCBsd6RMkjVDRZzb\` — George (male, narrative)
*   \`21m00Tcm4TlvDq8ikWAM\` — Rachel (female, calm)
*   \`AZnzlk1XvdvUeBnXmlld\` — Domi (female, strong)

#### Request

[Section titled “Request”](#request)

Parameter

Type

Required

Description

\`text\`

string

Yes

Text to convert to speech (max 5000 characters)

\`model_id\`

string

No

Model for synthesis (default: \`eleven_multilingual_v2\`)

\`output_format\`

string

No

Audio format (default: \`mp3_44100_128\`)

**Output format options:**

*   MP3: \`mp3_22050_32\`, \`mp3_44100_64\`, \`mp3_44100_128\`, \`mp3_44100_192\`
*   PCM: \`pcm_16000\`, \`pcm_22050\`, \`pcm_24000\`, \`pcm_44100\`
*   Opus: \`opus_48000_64\`, \`opus_48000_128\`

\`\`\`
{  "text": "Welcome to our application. How can I help you today?",  "model_id": "eleven_multilingual_v2"}
\`\`\`

#### Response

[Section titled “Response”](#response)

The response is binary audio data with the appropriate \`Content-Type\` header:

*   \`audio/mpeg\` for MP3 formats
*   \`audio/pcm\` for PCM formats
*   \`audio/basic\` for μ-law/A-law formats

The \`X-Character-Count\` header contains the number of characters processed.

### Sound Effects

[Section titled “Sound Effects”](#sound-effects)

**Endpoint:** \`POST https://elevenlabs.services.aporto.tech/v1/sound-generation\`

Generate sound effects from text descriptions.

#### Request

[Section titled “Request”](#request-1)

Parameter

Type

Required

Description

\`text\`

string

Yes

Description of the sound effect to generate

\`duration_seconds\`

number

No

Duration in seconds, 0.5-22.0 (default: 2.0)

\`prompt_influence\`

number

No

How literally to follow the prompt, 0.0-1.0 (default: 0.3)

\`\`\`
{  "text": "Cinematic braam, horror atmosphere",  "duration_seconds": 3.0,  "prompt_influence": 0.5}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

The response is binary MP3 audio data with \`Content-Type: audio/mpeg\`.

### Price Estimation

[Section titled “Price Estimation”](#price-estimation)

**Endpoints:**

*   \`POST https://elevenlabs.services.aporto.tech/v1/text-to-speech/{voiceId}/price\`
*   \`POST https://elevenlabs.services.aporto.tech/v1/sound-generation/price\`

Get the estimated cost before making a request. Accepts the same parameters as the main endpoint.

\`\`\`
{  "price": "\$0.012",  "currency": "USD"}
\`\`\`

### List Voices

[Section titled “List Voices”](#list-voices)

**Endpoint:** \`GET https://elevenlabs.services.aporto.tech/v2/voices\`

List all available ElevenLabs voices. This endpoint is free and requires no payment.

\`\`\`
const { data } = await client.get("https://elevenlabs.services.aporto.tech/v2/voices");
for (const voice of data.voices) {  console.log(\`\${voice.name} (\${voice.voice_id})\`);}
\`\`\`

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — check parameters

402

Payment required — ensure you’re using the Aporto SDK

404

Voice or model not found

413

Text or audio too large

429

Rate limit exceeded

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.APORTO_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://elevenlabs.services.aporto.tech/v1";
async function createPodcastIntro(title: string, host: string) {  // Generate podcast intro with TTS  const script = \`Welcome to \${title}. I'm your host, \${host}. Let's dive in.\`;
  const response = await aportoFetch(\`\${baseUrl}/text-to-speech/JBFqnCBsd6RMkjVDRZzb\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      text: script,      model_id: "eleven_multilingual_v2",    }),  });
  return Buffer.from(await response.arrayBuffer());}
async function generateTransitionSound() {  // Create a custom sound effect  const response = await aportoFetch(\`\${baseUrl}/sound-generation\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      text: "Soft whoosh transition, podcast style",      duration_seconds: 1.5,    }),  });
  return Buffer.from(await response.arrayBuffer());}
// Usageconst introAudio = await createPodcastIntro("Tech Weekly", "Alex");console.log("Intro audio size:", introAudio.byteLength, "bytes");
const transitionSfx = await generateTransitionSound();console.log("Transition audio size:", transitionSfx.byteLength, "bytes");
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Price

Unit

Text-to-Speech

\$0.24

per 1,000 characters

Sound Effects

\$0.08

flat per generation

**Minimums:**

*   Text-to-Speech: \$0.001 minimum per request

**Example costs:**

*   500 character TTS: ~\$0.12
*   Sound effect: \$0.08`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
