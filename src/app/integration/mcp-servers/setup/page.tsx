"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Aporto’s remote MCP server gives AI coding tools direct access to 85 tools — web search, AI models, browser automation, web scraping & crawling, audio generation, image creation, compute (jobs & sandboxes), databases (Redis, Vector, Search, Postgres), messaging (queues & schedules), phone verification, and governance — over HTTP.

* * *

## Setup

[Section titled “Setup”](#setup)

Connect your AI client to Aporto’s remote MCP server:

*   [Claude Code CLI](#tab-panel-25)
*   [Claude Code Config](#tab-panel-26)
*   [Cursor / Windsurf](#tab-panel-27)

Terminal window

\`\`\`
claude mcp add aporto --transport http https://api.aporto.ai/v1/mcp
\`\`\`

Add to your Claude Code settings file (\`~/.claude/settings.json\` or project \`.claude/settings.json\`):

\`\`\`
{  "mcpServers": {    "aporto": {      "transport": "http",      "url": "https://api.aporto.ai/v1/mcp"    }  }}
\`\`\`

Add to your MCP configuration:

\`\`\`
{  "mcpServers": {    "aporto": {      "transport": "http",      "url": "https://api.aporto.ai/v1/mcp"    }  }}
\`\`\`

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Tip

If your platform requires explicit authentication, add \`--header "x-api-key: YOUR_API_KEY"\` (CLI) or a \`"headers": { "x-api-key": "YOUR_API_KEY" }\` block (JSON). Get a key at [app.aporto.ai/settings](https://app.aporto.ai/settings).

* * *

## Available Tools

[Section titled “Available Tools”](#available-tools)

Category

Tool

Description

[Discovery](/integration/mcp-servers/core-tools#discovery)

\`tool_discover\`

Find the best tools for your objective — describe a goal, get ranked recommendations

[Search](/integration/mcp-servers/core-tools#search)

\`aporto_search\`

Web search via Linkup with AI-synthesised answers and source citations

[Search](/integration/mcp-servers/core-tools#search)

\`aporto_deep_search\`

Web + news results via You.com — use with \`aporto_search\` for broader coverage

[Browser](/integration/mcp-servers/core-tools#browser)

\`aporto_fetch\`

Fetch and extract webpage content as markdown

[Browser](/integration/mcp-servers/core-tools#browser)

\`aporto_screenshot\`

Capture a webpage screenshot (returns expiring PNG URL)

[Audio](/integration/mcp-servers/core-tools#audio)

\`aporto_text_to_speech\`

Convert text to speech via ElevenLabs (returns mp3 URL)

[Audio](/integration/mcp-servers/core-tools#audio)

\`aporto_sound_effects\`

Generate sound effects from a text description (returns mp3 URL)

[Audio](/integration/mcp-servers/core-tools#audio)

\`aporto_list_voices\`

List available ElevenLabs voices and IDs (free)

[AI Models](/integration/mcp-servers/core-tools#ai-models)

\`aporto_chat\`

Send a prompt to an LLM via OpenRouter (GPT-4o, Claude, etc.)

[AI Models](/integration/mcp-servers/core-tools#ai-models)

\`aporto_list_models\`

List available LLM models and pricing (free)

[Image](/integration/mcp-servers/core-tools#image-generation)

\`aporto_generate_image\`

Generate images from text prompts via Fal.ai (FLUX Schnell/Dev/Pro)

[Verify](/integration/mcp-servers/core-tools#verification)

\`aporto_verify_send\`

Send SMS verification code to a US phone number

[Verify](/integration/mcp-servers/core-tools#verification)

\`aporto_verify_check\`

Check a 6-digit verification code

[Governance](/integration/mcp-servers/core-tools#governance)

\`aporto_create_agent\`

Register a named agent for transaction tracking

[Governance](/integration/mcp-servers/core-tools#governance)

\`aporto_list_agents\`

List registered agents

[Governance](/integration/mcp-servers/core-tools#governance)

\`aporto_create_spending_rule\`

Create spending/usage limits (cost caps, rate limits)

[Governance](/integration/mcp-servers/core-tools#governance)

\`aporto_list_spending_rules\`

List spending rules

[Governance](/integration/mcp-servers/core-tools#governance)

\`aporto_create_transaction_api_key\`

Create a scoped API key (shown once — store securely)

[Status](/integration/mcp-servers/core-tools#status--auth)

\`aporto_status\`

Check authentication and tenant context (free)

[Auth](/integration/mcp-servers/core-tools#status--auth)

\`aporto_authenticate\`

Get authentication flow instructions (browser + device code)

[Compute](/integration/mcp-servers/compute)

\`aporto_job_deploy\`

Deploy a serverless batch job

[Compute](/integration/mcp-servers/compute)

\`aporto_job_list\`

List all deployed jobs

[Compute](/integration/mcp-servers/compute)

\`aporto_job_get\`

Get status of a deployed job

[Compute](/integration/mcp-servers/compute)

\`aporto_job_update\`

Update an existing job

[Compute](/integration/mcp-servers/compute)

\`aporto_job_delete\`

Delete a deployed job

[Compute](/integration/mcp-servers/compute)

\`aporto_job_trigger\`

Trigger a job execution with task payloads

[Compute](/integration/mcp-servers/compute)

\`aporto_job_list_executions\`

List past executions for a job

[Compute](/integration/mcp-servers/compute)

\`aporto_job_get_execution\`

Get detailed execution status and results

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_create\`

Create a persistent cloud sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_list\`

List all active sandboxes

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_get\`

Get sandbox status and details

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_delete\`

Delete a sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_extend\`

Extend sandbox lifetime

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_exec\`

Execute a command in a sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_process_logs\`

Get process stdout/stderr logs

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_list_files\`

List files in a sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_read_file\`

Read a file from a sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_write_file\`

Write a file to a sandbox

[Compute](/integration/mcp-servers/compute)

\`aporto_sandbox_deploy\`

Deploy source files to a sandbox

[Database](/integration/mcp-servers/database)

\`aporto_redis_create\`

Create a Redis database

[Database](/integration/mcp-servers/database)

\`aporto_redis_create_fixed\`

Create a fixed-capacity Redis database (250MB–500GB plans)

[Database](/integration/mcp-servers/database)

\`aporto_redis_list\`

List Redis databases

[Database](/integration/mcp-servers/database)

\`aporto_redis_delete\`

Delete a Redis database

[Database](/integration/mcp-servers/database)

\`aporto_redis_update\`

Update/extend a Redis database

[Database](/integration/mcp-servers/database)

\`aporto_redis_command\`

Execute Redis commands

[Database](/integration/mcp-servers/database)

\`aporto_vector_create\`

Create a Vector index

[Database](/integration/mcp-servers/database)

\`aporto_vector_list\`

List Vector indexes

[Database](/integration/mcp-servers/database)

\`aporto_vector_delete\`

Delete a Vector index

[Database](/integration/mcp-servers/database)

\`aporto_vector_update\`

Update/extend a Vector index

[Database](/integration/mcp-servers/database)

\`aporto_vector_upsert\`

Upsert vectors

[Database](/integration/mcp-servers/database)

\`aporto_vector_query\`

Query vectors by similarity

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_create\`

Create a Search index

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_list\`

List Search indexes

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_delete\`

Delete a Search index

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_update\`

Update/extend a Search index

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_upsert\`

Upsert documents into index

[Database](/integration/mcp-servers/database)

\`aporto_searchindex_query\`

Query a Search index

[Database](/integration/mcp-servers/database)

\`aporto_database_create\`

Provision ephemeral Postgres database

[Database](/integration/mcp-servers/database)

\`aporto_database_price\`

Get Postgres price estimate (free)

[Database](/integration/mcp-servers/database)

\`aporto_database_list\`

List active Postgres databases

[Database](/integration/mcp-servers/database)

\`aporto_database_get\`

Get database details and connection URI

[Database](/integration/mcp-servers/database)

\`aporto_database_delete\`

Delete a Postgres database

[Messaging](/integration/mcp-servers/messaging)

\`aporto_message_publish\`

Publish a message to a URL

[Messaging](/integration/mcp-servers/messaging)

\`aporto_message_enqueue\`

Enqueue a message to a named queue

[Messaging](/integration/mcp-servers/messaging)

\`aporto_message_batch\`

Batch publish messages

[Messaging](/integration/mcp-servers/messaging)

\`aporto_message_get\`

Get message delivery status

[Messaging](/integration/mcp-servers/messaging)

\`aporto_message_cancel\`

Cancel a pending message

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_create\`

Create a cron schedule

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_list\`

List schedules

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_get\`

Get schedule details

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_delete\`

Delete a schedule

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_pause\`

Pause a schedule

[Messaging](/integration/mcp-servers/messaging)

\`aporto_schedule_resume\`

Resume a schedule

[Messaging](/integration/mcp-servers/messaging)

\`aporto_queue_list\`

List queues

[Messaging](/integration/mcp-servers/messaging)

\`aporto_queue_get\`

Get queue details

[Messaging](/integration/mcp-servers/messaging)

\`aporto_queue_delete\`

Delete a queue

[Messaging](/integration/mcp-servers/messaging)

\`aporto_queue_pause\`

Pause a queue

[Messaging](/integration/mcp-servers/messaging)

\`aporto_queue_resume\`

Resume a queue

[Scraping](/integration/mcp-servers/scraping)

\`aporto_scrape\`

Scrape a webpage with format options (markdown, html, screenshot)

[Scraping](/integration/mcp-servers/scraping)

\`aporto_crawl\`

Crawl an entire website (async, returns job ID)

[Scraping](/integration/mcp-servers/scraping)

\`aporto_crawl_status\`

Check crawl job status and retrieve results

[Scraping](/integration/mcp-servers/scraping)

\`aporto_map\`

Map all URLs on a website (fast sitemap discovery)

[Scraping](/integration/mcp-servers/scraping)

\`aporto_extract\`

Extract structured data from pages via natural language prompt

[Scraping](/integration/mcp-servers/scraping)

\`aporto_extract_status\`

Check extract job status and retrieve results

[Scraping](/integration/mcp-servers/scraping)

\`aporto_site_search\`

Search within a specific website’s content

Tip

**Start with \`tool_discover\`** — describe your goal and it recommends the best tools with usage examples.

* * *

## Troubleshooting

[Section titled “Troubleshooting”](#troubleshooting)

### ”Unauthorized” or 401 errors

[Section titled “”Unauthorized” or 401 errors”](#unauthorized-or-401-errors)

Verify your API key is correct and included in the \`x-api-key\` header. Get a new key at [app.aporto.ai/settings](https://app.aporto.ai/settings).

### Tools not appearing

[Section titled “Tools not appearing”](#tools-not-appearing)

Restart your AI client after adding the MCP server configuration. Verify the URL is exactly \`https://api.aporto.ai/v1/mcp\`.

### Timeout errors

[Section titled “Timeout errors”](#timeout-errors)

Some tools (image generation, deep search, text-to-speech) may take 15–30 seconds. If timeouts persist, try simpler inputs or check service status.

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Capabilities](/capabilities) Deep-dive into each service: pricing, examples, full parameter details

[Agent Frameworks](/integration/agent-frameworks) Programmatic integrations for LangChain and other frameworks`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
