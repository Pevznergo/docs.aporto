"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Reference for the core tools available through Aporto's MCP router. For setup instructions, see [Setup](/integration/mcp-servers/setup).

---

## Skill Network

### \`aporto_discover_skills\`

Find skills that match a user intent. Use this before execution when you do not know the exact skill ID or input schema.

\`intent\` string required — Natural-language description of what the user wants done

\`category\` string — Optional category filter such as \`scraping/social\`, \`search\`, \`media\`, or \`communication\`

\`maxResults\` number — Number of matching skills to return

Returns matching skills, provider options, pricing signals, and expected input fields.

---

### \`aporto_execute_skill\`

Execute a selected skill. Aporto routes the call to the best active provider and meters the cost.

\`skillId\` number required — Skill ID returned by discovery

\`input\` object required — Payload matching the selected skill schema

\`providerId\` number — Optional provider override. Omit this to let Aporto route automatically.

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
