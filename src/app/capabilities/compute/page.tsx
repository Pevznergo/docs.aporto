"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Deploy sandboxes and run code in isolated environments.

## Coming Soon

Compute (sandbox execution via Blaxel) is not yet available through Aporto.

In the meantime, you can use the [Blaxel](https://blaxel.ai) API directly with your own account.

[Back to Capabilities](/capabilities)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
