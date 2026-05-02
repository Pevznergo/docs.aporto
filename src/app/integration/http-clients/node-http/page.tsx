"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Use Node.js native \`https\` module with Aporto's LLM gateway.

## Chat Completions

\`\`\`typescript
import https from "https";

function aportoRequest(body: object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);

    const req = https.request(
      {
        hostname: "api.aporto.tech",
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          "Authorization": \`Bearer \${process.env.APORTO_API_KEY}\`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
      }
    );

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

const response = await aportoRequest({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
  max_tokens: 100,
}) as any;

console.log(response.choices[0].message.content);
\`\`\`

## Recommended Alternative

For most use cases, native \`fetch\` (Node.js 18+) or \`@aporto/core\` are simpler:

\`\`\`bash
npm install @aporto/core
\`\`\`

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
const response = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

## Next Steps

[Fetch API](/integration/http-clients/fetch) Simpler native fetch integration

[@aporto/core](/quick-start) SDK and MCP quick start`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
