"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `MCP tools for compute (sandboxes, code execution) are not yet available.

## Coming Soon

Compute tools via Blaxel are planned for a future release.

[Back to MCP Setup](/integration/mcp-servers/setup)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
