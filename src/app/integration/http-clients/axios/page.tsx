"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Use Axios with Aporto's LLM gateway by setting \`baseURL\` and the \`Authorization\` header.

## Setup

\`\`\`bash
npm install axios
export APORTO_API_KEY="sk-live-your_key_here"
\`\`\`

## Basic Setup

\`\`\`typescript
import axios from "axios";

const client = axios.create({
  baseURL: "https://api.aporto.tech/v1",
  headers: {
    "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
    "Content-Type": "application/json",
  },
});

const { data } = await client.post("/chat/completions", {
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
  max_tokens: 100,
});

console.log(data.choices[0].message.content);
\`\`\`

## Multiple Models

\`\`\`typescript
import axios from "axios";

const aporto = axios.create({
  baseURL: "https://api.aporto.tech/v1",
  headers: { "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\` },
});

// GPT-4o
const gpt4 = await aporto.post("/chat/completions", {
  model: "openai/gpt-4o",
  messages: [{ role: "user", content: "Explain quantum computing" }],
});

// Claude
const claude = await aporto.post("/chat/completions", {
  model: "anthropic/claude-3.5-sonnet",
  messages: [{ role: "user", content: "Explain quantum computing" }],
});
\`\`\`

## Error Handling

\`\`\`typescript
import axios from "axios";

const client = axios.create({
  baseURL: "https://api.aporto.tech/v1",
  headers: { "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\` },
});

try {
  const { data } = await client.post("/chat/completions", {
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "Hello!" }],
  });
  console.log(data.choices[0].message.content);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 402) {
      console.error("Insufficient balance — top up at app.aporto.tech");
    } else if (error.response?.status === 401) {
      console.error("Invalid API key");
    }
  }
  throw error;
}
\`\`\`

## Partner Services

For SMS, search, images, and TTS — use the \`@aporto/core\` SDK:

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
const result = await client.services.search.query({ query: "latest AI news" });
\`\`\`

## Next Steps

[Fetch API](/integration/http-clients/fetch) Native fetch integration

[@aporto/core](/quick-start) Full SDK with partner services`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
