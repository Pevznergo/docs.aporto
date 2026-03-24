"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Aporto provides advanced web scraping and crawling via Firecrawl. These tools go beyond \`aporto_fetch\` (which returns clean markdown for a single page) — scrape with format options, crawl entire sites, map sitemaps, and extract structured data with natural language prompts.

All scraping tools accept an optional \`agentName\` parameter for [spend attribution](/integration/mcp-servers/core-tools#agentname-pattern).

Tip

For simple “fetch this page as markdown” use cases, \`aporto_fetch\` (in [Core Tools](/integration/mcp-servers/core-tools#browser)) is simpler and cheaper. Use the tools below when you need full control over formats, multi-page crawling, or structured extraction.

* * *

## Scrape

[Section titled “Scrape”](#scrape)

### \`aporto_scrape\`

[Section titled “aporto\_scrape”](#aporto_scrape)

Scrape a single webpage with advanced options. Returns content in requested formats (markdown, html, rawHtml, screenshot). Supports main-content extraction and wait conditions.

\`url\` string required

URL of the webpage to scrape

\`formats\` string\[\]

Output formats: \`markdown\`, \`html\`, \`rawHtml\`, \`screenshot\`. Defaults to markdown.

\`onlyMainContent\` boolean

Extract only the main content, removing navigation, footers, and ads

\`waitFor\` number

Wait time in milliseconds before scraping (useful for JS-rendered content)

* * *

## Crawl

[Section titled “Crawl”](#crawl)

### \`aporto_crawl\`

[Section titled “aporto\_crawl”](#aporto_crawl)

Crawl an entire website starting from a URL. Returns a job ID for async status polling via \`aporto_crawl_status\`. Supports depth limits, page limits, and path filtering.

\`url\` string required

Starting URL for the crawl

\`maxDiscoveryDepth\` number

Maximum link depth to crawl (min: 1)

\`limit\` number

Maximum pages to crawl (1–10,000)

\`includePaths\` string\[\]

URL path patterns to include (e.g. \`["/docs/*", "/blog/*"]\`)

\`excludePaths\` string\[\]

URL path patterns to exclude (e.g. \`["/admin/*"]\`)

### \`aporto_crawl_status\`

[Section titled “aporto\_crawl\_status”](#aporto_crawl_status)

Check the status of a crawl job and retrieve results. Use the job ID returned by \`aporto_crawl\`.

\`id\` string required

Crawl job ID from \`aporto_crawl\`

* * *

## Map

[Section titled “Map”](#map)

### \`aporto_map\`

[Section titled “aporto\_map”](#aporto_map)

Map all URLs on a website without extracting content. Fast sitemap discovery — returns a list of all discoverable URLs from the given starting page.

\`url\` string required

URL of the website to map

* * *

## Extract

[Section titled “Extract”](#extract)

### \`aporto_extract\`

[Section titled “aporto\_extract”](#aporto_extract)

Extract structured data from web pages using a natural language prompt and optional JSON schema. Provide URLs and describe what data to extract — returns an async job ID.

\`urls\` string\[\] required

URLs to extract data from

\`prompt\` string required

Natural language description of what data to extract (e.g. “Extract all pricing tiers with names, prices, and features”)

\`schema\` object

Optional JSON schema defining the expected output structure

### \`aporto_extract_status\`

[Section titled “aporto\_extract\_status”](#aporto_extract_status)

Check the status of an extract job and retrieve results. Use the job ID returned by \`aporto_extract\`.

\`id\` string required

Extract job ID from \`aporto_extract\`

* * *

## Site Search

[Section titled “Site Search”](#site-search)

### \`aporto_site_search\`

[Section titled “aporto\_site\_search”](#aporto_site_search)

Search within a specific website’s content. Unlike \`aporto_search\` (web-wide search via Linkup) or \`aporto_deep_search\` (web-wide via You.com), this searches only within the pages of the specified site.

\`query\` string required

Search query

\`url\` string required

Site URL to search within (e.g. \`"https://docs.example.com"\`)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
