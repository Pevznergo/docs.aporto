"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Publish and queue asynchronous messages.

## Coming Soon

Messaging (Upstash QStash) is not yet available through Aporto.

In the meantime, you can use [Upstash QStash](https://upstash.com/docs/qstash) directly with your own account.

[Back to Capabilities](/capabilities)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
