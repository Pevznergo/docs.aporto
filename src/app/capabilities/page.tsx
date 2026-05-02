"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Your agents need more than reasoning - they need skills. Aporto exposes a small MCP surface: discover the right skill, execute it through provider routing, or call Aporto AI for LLM reasoning.

## Recommended: Use the MCP Router

\`\`\`bash
export APORTO_API_KEY="sk-live-your_key_here"
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
\`\`\`

Then ask your agent to discover and execute skills:

\`\`\`text
Use Aporto to find the best skill for extracting public LinkedIn company pages, then run it for these URLs.
\`\`\`

For Aporto AI SDK examples below:

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
\`\`\`

## Core MCP Surface

### Discover Skills

Use \`aporto_discover_skills\` to find the right capability by intent. This is how agents find scraping, search, enrichment, communication, media, automation, and other skills without hard-coding provider-specific tools.

\`\`\`json
{
  "intent": "extract public LinkedIn profile data from profile URLs",
  "maxResults": 5
}
\`\`\`

Discovery returns matching skills, input requirements, provider options, and pricing signals.

---

### Execute Skills

Use \`aporto_execute_skill\` to run the selected skill. Aporto chooses the best active provider unless you pass an explicit provider override.

\`\`\`json
{
  "skillId": 17,
  "input": {
    "profileUrls": ["https://www.linkedin.com/in/example"]
  }
}
\`\`\`

The publisher can see their listing as a skill; internally, review can decide whether it becomes a new skill or a provider for an existing skill.

---

### Aporto AI

400+ models through a single OpenAI-compatible gateway - GPT, Claude, Gemini, Llama, and more.

\`\`\`typescript
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

[Full docs →](/capabilities/ai-models)

---

## Quick Comparison

Surface | What It Does | Access
--------|--------------|-------
\`aporto_discover_skills\` | Finds the right skill for an intent | MCP router
\`aporto_execute_skill\` | Executes a selected skill through provider routing | MCP router
\`aporto_chat\` / Aporto AI | Calls 400+ LLM models | MCP router / OpenAI-compatible gateway

## Getting Started

1. **Get your API key** from the [Aporto Dashboard](https://app.aporto.tech)
2. Connect the [MCP router](/integration/mcp-servers/setup)
3. Discover a skill, execute it, and let Aporto handle provider routing`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
