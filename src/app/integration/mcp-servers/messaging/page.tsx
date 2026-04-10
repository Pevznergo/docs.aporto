"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `MCP tools for messaging (queues, schedules) are not yet available.

## Coming Soon

Messaging tools via Upstash QStash are planned for a future release.

[Back to MCP Setup](/integration/mcp-servers/setup)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
