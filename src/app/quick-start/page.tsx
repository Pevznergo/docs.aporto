"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Get up and running with Aporto in under 30 seconds.

1.  ## Get an API Key

    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.

    \`\`\`bash
    export APORTO_API_KEY="sk-live-your_key_here"
    \`\`\`

2.  ## Install the CLI

    \`\`\`bash
    npm install -g @aporto-tech/sdk
    \`\`\`

3.  ## Discover Skills

    Search 1000+ skills by description:

    \`\`\`bash
    aporto discover "generate image"

    # 4    Image Generation              media/image    $0.0040/call
    # 96   Image Generation Nano Banana  media/image    $0.0400/call
    # 67   Image Generation Recraft      media/image    $0.0200/call
    \`\`\`

4.  ## Run a Skill

    \`\`\`bash
    aporto run 4 --param prompt="a cat on the moon" --wait

    # status: succeeded
    # skill: Image Generation
    # provider: fal-flux-schnell
    # costUSD: 0.004
    # artifact: https://storage.aporto.tech/...
    \`\`\`

    Or run by intent with automatic skill matching:

    \`\`\`bash
    aporto run "generate product video" \\
      --param prompt="clean product launch teaser" \\
      --provider auto \\
      --wait
    \`\`\`

---

## Alternative: MCP Server

If you're using an AI agent, MCP is the recommended integration. It gives the agent structured tools for skill discovery, option discovery, execution, and polling.

**Claude Code CLI:**
\`\`\`bash
claude mcp add --transport http aporto https://app.aporto.tech/api/mcp \\
  --header "Authorization: Bearer $APORTO_API_KEY"
\`\`\`

**Codex CLI:**
\`\`\`bash
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
\`\`\`

See [MCP Setup](/integration/mcp-servers/setup) for Claude Code config, Cursor, Windsurf, OpenClaw, and generic MCP JSON.

**Generic MCP config:**

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "type": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

Your agent gets access to these MCP tools:
- \`aporto_discover_skills\` — find skills by description
- \`aporto_list_options\` — list provider-specific options such as voices and models
- \`aporto_run_skill\` — execute with smart provider routing
- \`aporto_get_skill_run\` — poll async results
- \`aporto_chat\` — LLM completions (400+ models)
- \`aporto_image_generate\` — image generation
- \`aporto_tts_create\` — text to speech
- \`aporto_search\` — web search

---

## Alternative: TypeScript SDK

For programmatic use in your application:

\`\`\`bash
npm install @aporto-tech/sdk
\`\`\`

\`\`\`typescript
import { AportoClient } from "@aporto-tech/sdk";

const aporto = new AportoClient({
  apiKey: process.env.APORTO_API_KEY,
});

// Discover skills
const { skills } = await aporto.routing.discoverSkills({
  query: "generate image",
});

// Run a skill
const result = await aporto.routing.runSkill({
  intent: "generate product image",
  params: { prompt: "a cat on the moon" },
  waitForResult: true,
});

console.log(result.artifacts?.[0]?.url);
\`\`\`

Or use the OpenAI-compatible gateway for LLM routing:

\`\`\`typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APORTO_API_KEY,
  baseURL: "https://api.aporto.tech/v1",
});

const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

## Billing

Aporto uses a **prepaid balance** model. Top up your account at [app.aporto.tech](https://app.aporto.tech). Each skill call deducts the provider cost from your balance. No subscriptions, no minimums.

## Next Steps

[MCP Setup](/integration/mcp-servers/setup) Configure Aporto in Claude Code, Cursor, Windsurf, Codex, or another MCP client.

[Browse Capabilities](/capabilities) See the skill categories and core tools available through Aporto.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
