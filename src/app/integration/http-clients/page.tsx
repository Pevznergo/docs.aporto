"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Aporto's LLM gateway (\`api.aporto.tech/v1\`) is fully OpenAI-compatible. Any HTTP client that supports a custom base URL and Bearer token auth will work.

## Recommended: @aporto/core

Install the official SDK for the simplest experience — it handles LLM calls and all partner services:

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

// LLM
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});

// Partner services
const sms = await client.services.sms.send({ to: "+15551234567" });
const image = await client.services.images.generate({ prompt: "a cat" });
\`\`\`

## Using Standard HTTP Clients

For LLM calls only, you can use any HTTP client with these settings:

- **Base URL:** \`https://api.aporto.tech/v1\`
- **Auth header:** \`Authorization: Bearer sk-live-{your_key}\`

See the sub-pages for fetch, Axios, and Node.js HTTP examples.

## Supported HTTP Clients

[Fetch API](/integration/http-clients/fetch) Native & Node.js 18+

[Axios](/integration/http-clients/axios) v1.0+

[Node.js HTTP](/integration/http-clients/node-http) Native http/https

## Next Steps

[Agent Frameworks](/integration/agent-frameworks) LangChain, OpenAI SDK, and more`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
