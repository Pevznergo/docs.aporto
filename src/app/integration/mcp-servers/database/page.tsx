"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `MCP tools for databases (Redis, Vector, PostgreSQL) are not yet available.

## Coming Soon

Database tools via Upstash are planned for a future release.

[Back to MCP Setup](/integration/mcp-servers/setup)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
