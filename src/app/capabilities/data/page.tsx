"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Provision and query Redis, Vector, and PostgreSQL databases.

## Coming Soon

Data infrastructure (Redis, Vector, Search, PostgreSQL via Upstash) is not yet available through Aporto.

In the meantime, you can use [Upstash](https://upstash.com) directly with your own account.

[Back to Capabilities](/capabilities)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
