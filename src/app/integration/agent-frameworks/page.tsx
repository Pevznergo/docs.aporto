"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Aporto's LLM gateway is OpenAI-compatible. Any framework that supports a custom \`baseURL\` works out of the box.

## @aporto/core (Recommended)

The official SDK works alongside any agent framework:

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

// LLM calls
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});

// Partner services in the same agent workflow
const webResults = await client.services.search.query({
  query: "current weather in San Francisco",
  depth: "standard",
});
\`\`\`

## Supported Frameworks

[LangChain](/integration/agent-frameworks/langchain) Use ChatOpenAI with Aporto's baseURL

[LangChain Classic](/integration/agent-frameworks/langchain-classic) v0.3+ component wrappers

## Coming Soon

- Mastra
- LangGraph
- AutoGPT
- Python support

## Next Steps

[HTTP Client Integration](/integration/http-clients) Raw fetch/axios integration`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
