"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Give your agents real-time information from the web. Two providers: **Linkup** (structured answers with citations) and **You.com** (AI-generated answers from live crawling).

## Quick Example

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

// Linkup — sourced answer with citations
const results = await client.services.search.query({
  query: "What are the latest developments in quantum computing?",
  depth: "standard",
  outputType: "sourcedAnswer",
});
console.log(results.answer);
console.log("Sources:", results.sources);

// You.com — AI answer
const answer = await client.services.search.ai({
  query: "What is retrieval augmented generation?",
});
console.log(answer.hits);
\`\`\`

## Providers

Provider | Best For | Method | Pricing
---------|----------|--------|--------
[Linkup](#linkup) | Structured extraction, sourced answers | \`search.query()\` | \$0.006–\$0.055/search
[You.com](#youcom) | AI answers, live crawling | \`search.ai()\` | \$0.005–\$0.0065/search

---

## Linkup

### SDK Reference

\`\`\`typescript
client.services.search.query(params)
\`\`\`

Parameter | Type | Required | Description
----------|------|----------|------------
\`query\` | string | Yes | Search query
\`depth\` | string | No | \`"standard"\` (default) or \`"deep"\`
\`outputType\` | string | No | \`"sourcedAnswer"\`, \`"searchResults"\`, or \`"structured"\`

### Response

\`\`\`typescript
{
  success: boolean;
  answer?: string;
  sources?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  costUSD: number;
}
\`\`\`

### Examples

**Search results:**

\`\`\`typescript
const results = await client.services.search.query({
  query: "TypeScript best practices 2025",
  depth: "standard",
  outputType: "searchResults",
});
\`\`\`

**Sourced answer:**

\`\`\`typescript
const answer = await client.services.search.query({
  query: "What are the benefits of TypeScript?",
  depth: "standard",
  outputType: "sourcedAnswer",
});
console.log(answer.answer);
console.log(answer.sources);
\`\`\`

### Raw HTTP

**Endpoint:** \`POST https://app.aporto.tech/api/services/search\`

\`\`\`bash
curl https://app.aporto.tech/api/services/search \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "latest AI news",
    "depth": "standard",
    "outputType": "sourcedAnswer"
  }'
\`\`\`

### Linkup Pricing

Depth | Price
------|------
standard | \$0.006
deep | \$0.055

---

## You.com

### SDK Reference

\`\`\`typescript
client.services.search.ai(params)
\`\`\`

Parameter | Type | Required | Description
----------|------|----------|------------
\`query\` | string | Yes | Search query
\`type\` | string | No | \`"search"\` (default) or \`"research"\`

### Response

\`\`\`typescript
{
  success: boolean;
  hits?: unknown[];
  costUSD: number;
}
\`\`\`

### Example

\`\`\`typescript
const result = await client.services.search.ai({
  query: "Best practices for building AI agents in 2025",
  type: "search",
});
console.log(result.hits);
\`\`\`

### Raw HTTP

**Endpoint:** \`POST https://app.aporto.tech/api/services/ai-search\`

\`\`\`bash
curl https://app.aporto.tech/api/services/ai-search \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "latest AI news", "type": "search" }'
\`\`\`

### You.com Pricing

Type | Price
-----|------
search | \$0.005
research | \$0.0065

---

## Error Codes

Code | Description
-----|------------
400 | Invalid request parameters
401 | Unauthorized — check your API key
402 | Insufficient balance — top up at app.aporto.tech
429 | Rate limit exceeded`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
