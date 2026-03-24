"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Aporto provides native integrations with popular AI agent frameworks, enabling automatic cost tracking, session management, and payment handling for your AI applications.

## Supported Frameworks

[Section titled “Supported Frameworks”](#supported-frameworks)

[LangChain](/integration/agent-frameworks/langchain) v1.x supported (middleware-based)

[LangChain Classic](/integration/agent-frameworks/langchain-classic) v0.3+ supported (component wrappers)

Tip

**Language Support:** TypeScript/JavaScript (Node.js 18+)

**Coming Soon:** Mastra, LangGraph, AutoGPT, Python support

Note

**Which package should I use?**

*   Use \`@aporto/langchain\` if you’re on **LangChain v1.x** — simpler middleware-based integration
*   Use \`@aporto/langchain-classic\` if you’re on **LangChain v0.3+** — component wrapper approach

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[HTTP Client Integration](/integration/http-clients) Learn about low-level HTTP client integrations`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
