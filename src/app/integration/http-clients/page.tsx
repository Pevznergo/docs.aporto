"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Aporto provides native integrations with popular HTTP clients, enabling automatic payment handling and authorization for your API requests.

## Supported HTTP Clients

[Section titled “Supported HTTP Clients”](#supported-http-clients)

[Axios](/integration/http-clients/axios) v1.0+ supported

[Fetch API](/integration/http-clients/fetch) Native & Node.js

[Node.js HTTP](/integration/http-clients/node-http) Native http/https modules

Tip

**Language Support:** TypeScript/JavaScript (Node.js 18+)

**Coming Soon:** Python support

* * *

## Features

[Section titled “Features”](#features)

All HTTP client integrations provide:

*   **Automatic 402 handling** - Seamless payment flow processing
*   **Authorization** - Pre-request authorization checks
*   **Per-request overrides** - Customize behavior for individual requests
*   **Failure modes** - Choose between availability and security priorities
*   **Transaction tracking** - Automatic cost and usage tracking

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Agent Frameworks](/integration/agent-frameworks) High-level AI agent framework integrations`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
