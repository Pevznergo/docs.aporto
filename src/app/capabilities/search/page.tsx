"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Give your agents real-time information from the web — raw search results, AI-generated answers with citations, or structured data extraction.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.APORTO_API_KEY,  agentName: "my-agent",});
// Search with AI-generated answerconst response = await aportoFetch(  "https://linkup.services.aporto.tech/v1/search",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      q: "What are the latest developments in quantum computing?",      depth: "standard",      outputType: "sourcedAnswer",    }),  });
const data = await response.json();console.log(data.answer);console.log("Sources:", data.sources);
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto provides access to two web search providers: **Linkup** and **You.com**. Both support AI-powered search with different strengths:

*   **Linkup** excels at structured data extraction and sourced answers
*   **You.com** excels at live crawling and freshness filters

Choose the provider that fits your use case. Both use the same SDK pattern — just point to the different endpoint.

## Providers

[Section titled “Providers”](#providers)

Provider

Best For

Pricing

[Linkup](#linkup)

Structured extraction, sourced answers

\$0.006 - \$0.055/search

[You.com](#youcom)

Live crawling, freshness filters

\$0.006 - \$0.01/search

* * *

## Linkup

[Section titled “Linkup”](#linkup)

Linkup provides three output modes:

*   **Search Results** — Raw search results with titles, URLs, and snippets
*   **Sourced Answer** — AI-generated answer with source citations
*   **Structured** — Extract data into a custom JSON schema

### Endpoints

[Section titled “Endpoints”](#endpoints)

Method

Path

Description

POST

\`/v1/search\`

Web search

POST

\`/v1/search/price\`

Get price estimate (free)

POST

\`/v1/fetch\`

Fetch URL as markdown

POST

\`/v1/fetch/price\`

Get fetch price estimate (free)

**Base URL:** \`https://linkup.services.aporto.tech\`

### Search

[Section titled “Search”](#search)

*   [Search Results](#tab-panel-18)
*   [Sourced Answer](#tab-panel-19)
*   [Structured](#tab-panel-20)

\`\`\`
const { data } = await client.post(  "https://linkup.services.aporto.tech/v1/search",  {    q: "TypeScript best practices 2024",    depth: "standard",    outputType: "searchResults",  });
for (const result of data.results) {  console.log(\`\${result.title} - \${result.url}\`);}
\`\`\`

\`\`\`
const { data } = await client.post(  "https://linkup.services.aporto.tech/v1/search",  {    q: "What are the benefits of TypeScript?",    depth: "standard",    outputType: "sourcedAnswer",  });
console.log(data.answer);console.log("Sources:", data.sources);
\`\`\`

\`\`\`
const { data } = await client.post(  "https://linkup.services.aporto.tech/v1/search",  {    q: "Top 5 programming languages in 2024",    depth: "deep",    outputType: "structured",    structuredOutputSchema: {      type: "object",      properties: {        languages: {          type: "array",          items: {            type: "object",            properties: {              name: { type: "string" },              rank: { type: "number" },              useCase: { type: "string" },            },          },        },      },    },    includeSources: true,  });
console.log(data.languages);
\`\`\`

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Fetch URL

[Section titled “Fetch URL”](#fetch-url)

Fetch and convert a web page to clean markdown:

\`\`\`
const { data } = await client.post(  "https://linkup.services.aporto.tech/v1/fetch",  {    url: "https://example.com/article",    renderJs: false,  });
console.log(data.markdown);
\`\`\`

### Linkup Fetch Parameters

[Section titled “Linkup Fetch Parameters”](#linkup-fetch-parameters)

Parameter

Type

Required

Description

\`url\`

string

Yes

URL to fetch

\`renderJs\`

boolean

No

Render JavaScript before extraction (default: \`false\`)

\`includeRawHtml\`

boolean

No

Include raw HTML in response (default: \`false\`)

\`extractImages\`

boolean

No

Extract image URLs from the page (default: \`false\`)

### Linkup Search Parameters

[Section titled “Linkup Search Parameters”](#linkup-search-parameters)

Parameter

Type

Required

Description

\`q\`

string

Yes

Search query

\`depth\`

string

Yes

\`standard\` or \`deep\`

\`outputType\`

string

No

\`searchResults\`, \`sourcedAnswer\`, or \`structured\`

\`maxResults\`

number

No

Maximum results (1-100)

\`includeImages\`

boolean

No

Include images in results

\`includeDomains\`

string\[\]

No

Only include these domains

\`excludeDomains\`

string\[\]

No

Exclude these domains

\`fromDate\`

date

No

Results from this date

\`toDate\`

date

No

Results until this date

\`includeInlineCitations\`

boolean

No

Include inline citations (only for \`sourcedAnswer\`)

\`structuredOutputSchema\`

object

Required for \`structured\`

JSON schema for output

\`includeSources\`

boolean

No

Include sources with structured output

### Linkup Pricing

[Section titled “Linkup Pricing”](#linkup-pricing)

Depth

Price

standard

\$0.006

deep

\$0.055

Fetch Operation

Price

Standard fetch

\$0.001

With JS rendering

\$0.006

* * *

## You.com

[Section titled “You.com”](#youcom)

You.com provides fast web search with optional live crawling to fetch full page content from search results.

### Endpoints

[Section titled “Endpoints”](#endpoints-1)

Method

Path

Description

GET

\`/v1/search\`

Web search

POST

\`/v1/search/price\`

Get price estimate (free)

POST

\`/v1/contents\`

Fetch URL contents

POST

\`/v1/contents/price\`

Get contents price estimate (free)

**Base URL:** \`https://you-com.services.aporto.tech\`

### Search

[Section titled “Search”](#search-1)

*   [Basic Search](#tab-panel-21)
*   [With Live Crawling](#tab-panel-22)

\`\`\`
const { data } = await client.get(  "https://you-com.services.aporto.tech/v1/search",  {    params: {      query: "Best practices for building AI agents",      count: 10,    },  });
for (const result of data.results.web) {  console.log(\`\${result.title} - \${result.url}\`);}
\`\`\`

\`\`\`
const { data } = await client.get(  "https://you-com.services.aporto.tech/v1/search",  {    params: {      query: "TypeScript best practices 2024",      count: 5,      livecrawl: "web",      livecrawl_formats: "markdown",    },  });
for (const result of data.results.web) {  console.log(\`Title: \${result.title}\`);  console.log(\`Content: \${result.content}\`); // Full page markdown}
\`\`\`

### Fetch Contents

[Section titled “Fetch Contents”](#fetch-contents)

Fetch content from specific URLs:

\`\`\`
const { data } = await client.post(  "https://you-com.services.aporto.tech/v1/contents",  {    urls: [      "https://example.com/article1",      "https://example.com/article2",    ],    formats: ["markdown"],  });
for (const content of data.contents) {  console.log(content.markdown);}
\`\`\`

### You.com Parameters

[Section titled “You.com Parameters”](#youcom-parameters)

**Search:**

Parameter

Type

Required

Description

\`query\`

string

Yes

Search query

\`count\`

number

No

Results count (1-100, default: 10)

\`freshness\`

string

No

\`day\`, \`week\`, \`month\`, or \`year\`

\`country\`

string

No

ISO 3166-2 country code

\`language\`

string

No

BCP 47 language code

\`offset\`

number

No

Result offset for pagination (0-9)

\`safesearch\`

string

No

\`off\`, \`moderate\`, or \`strict\`

\`livecrawl\`

string

No

\`web\`, \`news\`, or \`all\`

\`livecrawl_formats\`

string

No

\`html\` or \`markdown\`

**Contents:**

Parameter

Type

Required

Description

\`urls\`

string\[\]

Yes

URLs to fetch (1-10)

\`formats\`

string\[\]

No

\`html\`, \`markdown\`, or \`metadata\` (default: \`["markdown"]\`)

\`crawl_timeout\`

number

No

Timeout in seconds per URL, 1-60 (default: 10)

### You.com Pricing

[Section titled “You.com Pricing”](#youcom-pricing)

Result Count

Price

1-50 (Standard)

\$0.006

51-100 (Extended)

\$0.008

Contents

Price

Per request (1-10 URLs)

\$0.01

* * *

## Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request parameters

402

Payment required — ensure you’re using the Aporto SDK

429

Rate limit exceeded`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
