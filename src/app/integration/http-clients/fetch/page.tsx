"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Use native \`fetch\` with Aporto's LLM gateway by setting the correct base URL and auth header.

## Setup

No packages needed — works with native \`fetch\` in Node.js 18+ and all modern browsers.

\`\`\`bash
export APORTO_API_KEY="sk-live-your_key_here"
\`\`\`

## Chat Completions

\`\`\`typescript
const response = await fetch("https://api.aporto.tech/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Hello!" }],
    max_tokens: 100,
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
\`\`\`

## Streaming

\`\`\`typescript
const response = await fetch("https://api.aporto.tech/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Tell me a joke." }],
    stream: true,
  }),
});

const reader = response.body!.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  process.stdout.write(decoder.decode(value));
}
\`\`\`

## Partner Services

For SMS, search, images, and TTS — use the \`@aporto/core\` SDK instead of raw fetch:

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
const result = await client.services.images.generate({ prompt: "a mountain" });
\`\`\`

## Error Handling

\`\`\`typescript
const response = await fetch("https://api.aporto.tech/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ model: "openai/gpt-4o-mini", messages: [...] }),
});

if (!response.ok) {
  if (response.status === 402) {
    console.error("Insufficient balance — top up at app.aporto.tech");
  } else if (response.status === 401) {
    console.error("Invalid API key");
  }
  throw new Error(\`HTTP \${response.status}\`);
}

const data = await response.json();
\`\`\`

## Next Steps

[Axios](/integration/http-clients/axios) Axios integration

[@aporto/core](/quick-start) SDK and MCP quick start`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
