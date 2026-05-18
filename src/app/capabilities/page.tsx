"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Your agents need more than reasoning - they need skills. Aporto exposes a small MCP surface: discover the right skill, list provider-specific options, run it through provider routing, or call Aporto AI for LLM reasoning.

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

Use \`aporto_discover_skills\` to find the right capability by query. This is how agents resolve a task into an executable skill without hard-coding provider-specific tools.

\`\`\`json
{
  "query": "extract public LinkedIn profile data from profile URLs",
  "page": 0
}
\`\`\`

Discovery returns matching skills, input requirements, and parameter schemas.

---

### List Options

Use \`aporto_list_options\` when a skill has provider-specific parameter choices, such as ElevenLabs \`voice_id\`, model IDs, languages, or styles.

\`\`\`json
{
  "skillId": 5,
  "optionType": "voice",
  "query": "female british"
}
\`\`\`

---

### Run Skills

Use \`aporto_run_skill\` to run the selected skill. Aporto chooses the best active provider and returns a \`runId\` for every call.

\`\`\`json
{
  "skillId": 17,
  "intent": "extract public LinkedIn profile data",
  "params": {
    "profileUrls": ["https://www.linkedin.com/in/example"]
  },
  "waitForResult": true
}
\`\`\`

If the result is still running, call \`aporto_get_skill_run\` with the returned \`runId\`.

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
\`aporto_list_options\` | Lists valid provider-specific options | MCP router
\`aporto_run_skill\` | Runs a skill through provider routing | MCP router
\`aporto_get_skill_run\` | Polls async skill runs | MCP router
\`aporto_chat\` / Aporto AI | Calls 400+ LLM models | MCP router / OpenAI-compatible gateway

## Getting Started

1. **Get your API key** from the [Aporto Dashboard](https://app.aporto.tech)
2. Connect the [MCP router](/integration/mcp-servers/setup)
3. Discover a skill, list options if needed, run it, and let Aporto handle provider routing`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
