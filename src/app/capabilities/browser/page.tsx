"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Extract content from web pages, capture screenshots, or execute complex browser tasks using AI — all through a single API with no account setup required.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
// Create a Aporto-tracked fetch functionconst aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
// Extract webpage content - SDK handles payment/auth automaticallyconst response = await aportoFetch(  "https://anchor-browser.services.aporto.ai/v1/tools/fetch-webpage",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      url: "https://example.com",      format: "markdown",    }),  });
const data = await response.json();console.log("Page content:", data.content);
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto routes browser automation requests to [Anchor Browser](https://anchorbrowser.io), which provides AI-powered browser automation in the cloud. The SDK handles payment negotiation automatically — you pay based on the operation type and complexity.

The service supports two operations:

1.  **Extract** — Get page content as markdown or HTML
2.  **Screenshot** — Capture page screenshots at various sizes

## Provider

[Section titled “Provider”](#provider)

Powered by [Anchor Browser](https://anchorbrowser.io). Anchor provides headless browser infrastructure with AI capabilities for intelligent web automation.

## API Reference

[Section titled “API Reference”](#api-reference)

### Extract Content

[Section titled “Extract Content”](#extract-content)

**Endpoint:** \`POST https://anchor-browser.services.aporto.ai/v1/tools/fetch-webpage\`

Extract the main content from a webpage as clean markdown or HTML.

#### Request

[Section titled “Request”](#request)

Parameter

Type

Required

Description

\`url\`

string

Yes

URL to extract content from

\`format\`

string

No

Output format: \`markdown\` or \`html\` (default: \`markdown\`)

\`wait\`

number

No

Wait time in milliseconds for JavaScript execution

\`new_page\`

boolean

No

Open URL in a new browser page (default: \`false\`)

\`page_index\`

number

No

Target page index in multi-page session

\`return_partial_on_timeout\`

boolean

No

Return partial content if page times out (default: \`false\`)

\`\`\`
{  "url": "https://example.com/blog/article-title",  "format": "markdown"}
\`\`\`

#### Response

[Section titled “Response”](#response)

\`\`\`
{  "content": "# Article Title\n\nThis is the main content of the article...",  "title": "Article Title",  "url": "https://example.com/blog/article-title"}
\`\`\`

### Capture Screenshot

[Section titled “Capture Screenshot”](#capture-screenshot)

**Endpoint:** \`POST https://anchor-browser.services.aporto.ai/v1/tools/screenshot\`

Capture a screenshot of a webpage.

#### Request

[Section titled “Request”](#request-1)

Parameter

Type

Required

Description

\`url\`

string

Yes

URL to screenshot

\`width\`

number

No

Viewport width in pixels, 320-3840 (default: 1280)

\`height\`

number

No

Viewport height in pixels, 240-2160 (default: 720)

\`image_quality\`

number

No

JPEG quality, 1-100 (default: 80)

\`wait\`

number

No

Wait time in milliseconds for JavaScript execution

\`scroll_all_content\`

boolean

No

Scroll through page to capture all content (default: \`false\`)

\`capture_full_height\`

boolean

No

Capture full page height, not just viewport (default: \`false\`)

\`format\`

string

No

Image format: \`png\` or \`jpeg\` (default: \`png\`)

\`s3_target_address\`

string

No

S3 URL for direct upload instead of returning image

\`fullPage\`

boolean

No

**Deprecated** — use \`capture_full_height\` + \`scroll_all_content\` instead

\`quality\`

number

No

**Deprecated** — use \`image_quality\` instead

\`\`\`
{  "url": "https://example.com",  "capture_full_height": false,  "format": "png",  "width": 1280,  "height": 720}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

The response is binary image data with the appropriate \`Content-Type\` header (\`image/png\` or \`image/jpeg\`). Use \`responseType: "arraybuffer"\` (Axios) or \`response.arrayBuffer()\` (Fetch) to handle the binary response.

### Price Estimation

[Section titled “Price Estimation”](#price-estimation)

**Endpoints:**

*   \`POST https://anchor-browser.services.aporto.ai/v1/tools/fetch-webpage/price\`
*   \`POST https://anchor-browser.services.aporto.ai/v1/tools/screenshot/price\`

Get the estimated cost before making a request. Accepts the same parameters as the main endpoint.

\`\`\`
{  "price": "\$0.02",  "currency": "USD"}
\`\`\`

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — check URL and parameters

402

Payment required — ensure you’re using the Aporto SDK

404

Page not found or unreachable

429

Rate limit exceeded

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://anchor-browser.services.aporto.ai/v1";
async function scrapeArticle(url: string) {  // Extract article content as markdown  const response = await aportoFetch(\`\${baseUrl}/tools/fetch-webpage\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      url,      format: "markdown",    }),  });
  const data = await response.json();  return {    title: data.title,    content: data.content,  };}
async function capturePagePreview(url: string) {  // Capture a screenshot for social preview  const response = await aportoFetch(\`\${baseUrl}/tools/screenshot\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      url,      width: 1200,      height: 630,      format: "jpeg",      image_quality: 90,    }),  });
  return Buffer.from(await response.arrayBuffer());}
// Usageconst article = await scrapeArticle("https://blog.example.com/post");console.log("Article:", article.title);
const preview = await capturePagePreview("https://example.com");console.log("Preview image size:", preview.byteLength, "bytes");
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Price

Extract

\$0.01 flat

Screenshot

\$0.01 flat`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
