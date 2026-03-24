"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto provides structured documentation for AI coding assistants. Choose the integration method that works best for your tool.

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
https://docs.aporto.ai/llms.txt
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
curl https://docs.aporto.ai/capabilities/verify.md
\`\`\`

Internal links in markdown files point to other \`.md\` files for easy navigation.

## What’s Included

[Section titled “What’s Included”](#whats-included)

Both methods provide access to documentation for:

*   **[Capabilities](/capabilities)** — Verification, search, AI models, and more
*   **[Integration](/integration/http-clients)** — SDK setup for Axios, Fetch, and LangChain
*   **[Governance](/governance)** — Spend limits and usage rules
*   **[API Reference](/api-reference/introduction)** — Endpoint specifications

[Explore Capabilities](/capabilities) See what services your agents can access through Aporto.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
