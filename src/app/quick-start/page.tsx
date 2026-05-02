"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Get up and running with Aporto's AI skill network in under 5 minutes.

1.  ## Get an API Key

    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.

    \`\`\`bash
    export APORTO_API_KEY="sk-live-your_key_here"
    \`\`\`

2.  ## Connect the MCP Router

    Aporto exposes one MCP server that lets your agent discover and call 1000+ skills.

    **Codex CLI:**
    \`\`\`bash
    codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
    \`\`\`

    **Generic MCP config:**

    \`\`\`json
    {
      "mcpServers": {
        "aporto": {
          "transport": "http",
          "url": "https://app.aporto.tech/api/mcp",
          "headers": {
            "Authorization": "Bearer \${APORTO_API_KEY}"
          }
        }
      }
    }
    \`\`\`

3.  ## Discover a Skill

    Ask your agent to use \`aporto_discover_skills\` before execution:

    \`\`\`text
    Find the best Aporto skill for extracting public LinkedIn profiles, then run it for these URLs.
    \`\`\`

    Discovery returns matching skills, available providers, pricing signals, and required input fields.

4.  ## Execute the Skill

    Your agent can call \`aporto_execute_skill\` with the selected skill and input:

    \`\`\`json
    {
      "skillId": 17,
      "input": {
        "profileUrls": ["https://www.linkedin.com/in/example"]
      }
    }
    \`\`\`

    Aporto routes the request to the best active provider, logs the call, and deducts the metered cost from your balance.

## Optional: Use the SDK or OpenAI Gateway

For direct application code, you can still use the TypeScript SDK and OpenAI-compatible model gateway.

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);
\`\`\`

Or use the OpenAI SDK with Aporto's gateway:

\`\`\`typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  baseURL: "https://api.aporto.tech/v1",
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
