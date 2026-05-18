"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto provides structured documentation and MCP tools for AI coding assistants. Use MCP when your client supports it; use the CLI only when MCP is unavailable.

## Recommended: Connect MCP

MCP gives agents structured tools for discovery, option lookup, execution, and polling. This is more reliable than asking agents to parse terminal output.

Core tools:

*   \`aporto_discover_skills\` — find the right skill by intent
*   \`aporto_list_options\` — list provider-specific options such as voices, models, languages, or styles
*   \`aporto_run_skill\` — run a skill through provider routing
*   \`aporto_get_skill_run\` — poll an async skill run

Use [MCP Setup](/integration/mcp-servers/setup) for Claude Code CLI, Claude Code project config, Codex CLI, Cursor, Windsurf, OpenClaw, and generic MCP JSON.

## CLI Fallback

If MCP is not available, agents can use the terminal CLI:

\`\`\`bash
aporto discover "text to speech" --json
aporto run 5 --param text="Hello" --param voice_id="21m00Tcm4TlvDq8ikWAM" --wait --json
\`\`\`

Prefer \`--json\` for agent workflows so the output stays structured.

## Install the Skill

[Section titled “Install the Skill”](#install-the-skill)

For tools that support skills (like Claude Code), install the Aporto skill:

Terminal window

\`\`\`
npx skills add aporto/skills --skill use-aporto
\`\`\`

Once installed, the skill gives your AI assistant context about Aporto’s capabilities, API patterns, and integration guides.

## Use llms.txt

[Section titled “Use llms.txt”](#use-llmstxt)

For tools that support \`llms.txt\` (like Cursor), point to:

\`\`\`
https://docs.aporto.tech/llms.txt
\`\`\`

This provides a structured overview of all Aporto documentation in a format optimized for LLM consumption.

## Fetch Markdown Directly

[Section titled “Fetch Markdown Directly”](#fetch-markdown-directly)

Add \`.md\` to any documentation URL to get clean markdown:

Page

Markdown

\`/capabilities/verify\`

\`/capabilities/verify.md\`

\`/quick-start\`

\`/quick-start.md\`

\`/\`

\`/index.md\`

Example:

Terminal window

\`\`\`
curl https://docs.aporto.tech/capabilities/verify.md
\`\`\`

Internal links in markdown files point to other \`.md\` files for easy navigation.

## What’s Included

[Section titled “What’s Included”](#whats-included)

Both methods provide access to documentation for:

*   **[Capabilities](/capabilities)** — Verification, search, AI models, images, and TTS
*   **[Integration](/integration/http-clients)** — @aporto/core SDK, fetch, Axios, and LangChain
*   **[Governance](/governance)** — Spend limits and usage rules
*   **[API Reference](/api-reference/introduction)** — Endpoint specifications

[Explore Capabilities](/capabilities) See what services your agents can access through Aporto.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
