"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Reference documentation for the 20 core tools available through Aporto’s MCP server. For setup instructions and the full 85-tool catalog, see [Setup](/integration/mcp-servers/setup).

Most service tools accept an optional \`agentName\` parameter for spend attribution and rule scoping. See [agentName Pattern](#agentname-pattern) below.

* * *

### Discovery

[Section titled “Discovery”](#discovery)

#### \`tool_discover\`

[Section titled “tool\_discover”](#tool_discover)

Discover the best Aporto tools for your objective. Provide a goal and receive ranked tool recommendations with usage examples.

\`objective\` string required

What you want to accomplish (e.g. “convert text to audio and search the web”)

\`constraints\` string\[\]

Optional constraints or requirements (e.g. \`["must be fast", "audio output"]\`)

\`context\` string

Optional additional context about your use case

* * *

### Search

[Section titled “Search”](#search)

#### \`aporto_search\`

[Section titled “aporto\_search”](#aporto_search)

Search the web using Linkup and receive an AI-synthesised answer with source citations. Use \`depth: "deep"\` for comprehensive research on complex topics.

\`query\` string required

The search query

\`depth\` enum default: standard

Search depth: \`standard\` (faster) or \`deep\` (more thorough)

#### \`aporto_deep_search\`

[Section titled “aporto\_deep\_search”](#aporto_deep_search)

Search the web using You.com and get formatted web and news results. Uses a different provider and index than \`aporto_search\` (Linkup) — use both for broader coverage.

\`query\` string required

The search query

* * *

### Browser

[Section titled “Browser”](#browser)

#### \`aporto_fetch\`

[Section titled “aporto\_fetch”](#aporto_fetch)

Fetch and extract clean main content from a webpage as markdown. Strips navigation, footers, and ads. Backed by Firecrawl — for advanced options (multiple formats, wait conditions, raw HTML), use [\`aporto_scrape\`](/integration/mcp-servers/scraping#aporto_scrape).

\`url\` string required

URL of the webpage to fetch

#### \`aporto_screenshot\`

[Section titled “aporto\_screenshot”](#aporto_screenshot)

Capture a screenshot of a webpage. Returns a URL to the screenshot PNG (expires after 1 hour).

\`url\` string required

URL of the webpage to screenshot

\`width\` number default: 1280

Viewport width in pixels

\`height\` number default: 720

Viewport height in pixels

* * *

### Audio

[Section titled “Audio”](#audio)

#### \`aporto_text_to_speech\`

[Section titled “aporto\_text\_to\_speech”](#aporto_text_to_speech)

Convert text to speech using ElevenLabs. Returns a URL to the generated audio (mp3). Best for text under ~400 words — split longer scripts into chunks.

\`text\` string required

The text to convert to speech (max 5000 characters — split longer text into chunks)

\`voice_id\` string default: 21m00Tcm4TlvDq8ikWAM

ElevenLabs voice ID. Use \`aporto_list_voices\` to find available voices and IDs.

\`model_id\` string default: eleven\_multilingual\_v2

ElevenLabs model ID

#### \`aporto_sound_effects\`

[Section titled “aporto\_sound\_effects”](#aporto_sound_effects)

Generate sound effects from a text description using ElevenLabs. Returns a URL to the generated audio (mp3).

\`text\` string required

Description of the sound effect to generate (e.g. “thunderstorm with rain”)

\`duration_seconds\` number

Duration in seconds (0.5–22). Auto-selected if not specified.

#### \`aporto_list_voices\`

[Section titled “aporto\_list\_voices”](#aporto_list_voices)

List all available ElevenLabs voices with their IDs. **Free endpoint** — no payment required. This tool takes no required parameters.

* * *

### AI Models

[Section titled “AI Models”](#ai-models)

#### \`aporto_chat\`

[Section titled “aporto\_chat”](#aporto_chat)

Send a prompt to an LLM via OpenRouter and receive a text response.

\`prompt\` string required

The user message to send to the language model

\`model\` string default: openai/gpt-4o-mini

Model ID (e.g. \`openai/gpt-4o\`, \`anthropic/claude-3.5-sonnet\`)

\`system_prompt\` string

Optional system prompt to set context or behavior

\`max_tokens\` number default: 4096

Maximum tokens in the response

#### \`aporto_list_models\`

[Section titled “aporto\_list\_models”](#aporto_list_models)

List available LLM models from OpenRouter, optionally filtered by category. **Free endpoint** — no payment required.

\`category\` string

Optional category filter (e.g. “chat”, “completion”, “embedding”)

* * *

### Image Generation

[Section titled “Image Generation”](#image-generation)

#### \`aporto_generate_image\`

[Section titled “aporto\_generate\_image”](#aporto_generate_image)

Generate images from a text prompt using Fal.ai models (default: FLUX Schnell).

\`prompt\` string required

Text description of the image to generate

\`model_id\` string default: fal-ai/flux/schnell

Fal.ai model ID (e.g. \`fal-ai/flux/dev\`, \`fal-ai/flux-pro\`)

\`image_size\` enum

Image size/aspect ratio: \`square_hd\`, \`square\`, \`portrait_4_3\`, \`portrait_16_9\`, \`landscape_4_3\`, \`landscape_16_9\`

\`num_images\` number default: 1

Number of images to generate (1–4)

* * *

### Verification

[Section titled “Verification”](#verification)

#### \`aporto_verify_send\`

[Section titled “aporto\_verify\_send”](#aporto_verify_send)

Send a verification code to a US phone number via SMS.

\`phoneNumber\` string required

US phone number in E.164 format (e.g. \`+15551234567\`). Must match \`+1XXXXXXXXXX\`.

**Returns:** A verification ID needed to check the code later.

#### \`aporto_verify_check\`

[Section titled “aporto\_verify\_check”](#aporto_verify_check)

Check a 6-digit verification code that was sent via \`aporto_verify_send\`.

\`verificationId\` string required

The verification ID returned by \`aporto_verify_send\`

\`code\` string required

The 6-digit verification code the user received via SMS

* * *

### Governance

[Section titled “Governance”](#governance)

#### \`aporto_create_agent\`

[Section titled “aporto\_create\_agent”](#aporto_create_agent)

Create a new agent within the authenticated tenant. Agents are used to tag and track transactions.

\`label\` string required

Human-readable display name for the agent

\`name\` string

Optional programmatic identifier for find-or-create behavior (e.g. “marketing-bot-01”)

\`description\` string

Optional description of the agent purpose or functionality

#### \`aporto_list_agents\`

[Section titled “aporto\_list\_agents”](#aporto_list_agents)

List agents for the authenticated tenant.

\`status\` enum

Filter agents by status: \`active\` or \`paused\`

\`limit\` number default: 20

Maximum number of agents to return (1–100)

#### \`aporto_create_spending_rule\`

[Section titled “aporto\_create\_spending\_rule”](#aporto_create_spending_rule)

Create a spending or usage rule that enforces limits on agent transactions. Rules can cap total cost, transaction count, or per-transaction amounts within optional time windows.

\`name\` string required

Human-readable name for this rule

\`ruleType\` enum required

Rule type — currently only \`usage_limit\` is supported

\`limitValue\` number required

Threshold value that, when exceeded, triggers the rule

\`measurementType\` enum required

What is being measured: \`count_transactions\`, \`sum_payment_amount\` (cumulative USD), \`this_payment_amount\` (single payment USD), \`sum_transaction_costs\` (cumulative cost USD), \`this_transaction_cost\` (single transaction cost USD)

\`agentIds\` string\[\]

Optional list of agent UUIDs to scope this rule to specific agents

\`intervalValue\` number

Time window size (e.g. 24 for 24 hours). Omit for single-transaction comparisons.

\`intervalUnit\` enum

Unit for intervalValue: \`seconds\`, \`minutes\`, \`hours\`, \`days\`

\`isRolling\` boolean default: true

Whether the time window is rolling (true) or calendar-aligned (false)

#### \`aporto_list_spending_rules\`

[Section titled “aporto\_list\_spending\_rules”](#aporto_list_spending_rules)

List spending and usage rules for the authenticated tenant.

\`status\` enum

Filter rules by status: \`active\` or \`paused\`

\`agentId\` string

Filter rules scoped to a specific agent UUID

\`limit\` number default: 20

Maximum number of rules to return (1–100)

#### \`aporto_create_transaction_api_key\`

[Section titled “aporto\_create\_transaction\_api\_key”](#aporto_create_transaction_api_key)

Create a new transaction API key for the authenticated tenant. The plain key is shown only once — store it securely immediately.

\`name\` string required

Name for the API key (1–255 characters)

\`description\` string

Optional description of what this key is used for

* * *

### Status & Auth

[Section titled “Status & Auth”](#status--auth)

#### \`aporto_status\`

[Section titled “aporto\_status”](#aporto_status)

Check authentication and tenancy context for this remote MCP session. **Free endpoint** — no payment required. This tool takes no parameters.

#### \`aporto_authenticate\`

[Section titled “aporto\_authenticate”](#aporto_authenticate)

Returns authentication options for connecting to Aporto. Provides both browser-based (localhost redirect) and device code (universal) auth flows. Use this when helping users set up new team members or generate additional API keys. This tool takes no parameters.

* * *

## agentName Pattern

[Section titled “agentName Pattern”](#agentname-pattern)

Most service tools accept an optional \`agentName\` parameter. When provided, the tool call is attributed to the named agent for spend tracking and rule enforcement.

\`\`\`
{ "query": "quantum computing", "agentName": "research-bot-01" }
\`\`\`

Use \`aporto_create_agent\` to register agents, then reference them by name on subsequent calls. Spending rules created with \`aporto_create_spending_rule\` can be scoped to specific agents.

* * *

## Tool Aliases

[Section titled “Tool Aliases”](#tool-aliases)

Some tools have backward-compatible aliases that can be used interchangeably:

Tool

Aliases

\`aporto_search\`

\`web_search\`

\`aporto_deep_search\`

\`aporto_web_results\`

\`aporto_fetch\`

\`browser_extract\`

\`aporto_screenshot\`

\`screenshot\`

\`aporto_text_to_speech\`

\`tts\`

\`aporto_sound_effects\`

\`sfx\`

\`aporto_list_voices\`

\`list_voices\`

\`tool_discover\`

\`discover_tools\`, \`find_tools\`

\`aporto_authenticate\`

\`authenticate\`, \`login\`

\`aporto_job_deploy\`

\`job_deploy\`, \`deploy_job\`

\`aporto_job_list\`

\`job_list\`, \`list_jobs\`

\`aporto_job_get\`

\`job_get\`, \`get_job\`

\`aporto_job_update\`

\`job_update\`, \`redeploy_job\`

\`aporto_job_delete\`

\`job_delete\`, \`delete_job\`

\`aporto_job_trigger\`

\`job_trigger\`, \`trigger_job\`, \`job_execute\`

\`aporto_job_list_executions\`

\`job_list_executions\`, \`list_job_executions\`

\`aporto_job_get_execution\`

\`job_get_execution\`, \`get_job_execution\`

\`aporto_sandbox_create\`

\`sandbox_create\`, \`create_sandbox\`

\`aporto_sandbox_list\`

\`sandbox_list\`, \`list_sandboxes\`

\`aporto_sandbox_get\`

\`sandbox_get\`, \`get_sandbox\`

\`aporto_sandbox_delete\`

\`sandbox_delete\`, \`delete_sandbox\`

\`aporto_sandbox_extend\`

\`sandbox_extend\`, \`extend_sandbox\`

\`aporto_sandbox_exec\`

\`sandbox_exec\`, \`exec_sandbox\`

\`aporto_sandbox_process_logs\`

\`sandbox_logs\`

\`aporto_sandbox_list_files\`

\`sandbox_ls\`, \`sandbox_tree\`

\`aporto_sandbox_read_file\`

\`sandbox_read_file\`, \`read_sandbox_file\`

\`aporto_sandbox_write_file\`

\`sandbox_write_file\`, \`write_sandbox_file\`

\`aporto_sandbox_deploy\`

\`sandbox_deploy\`, \`deploy_sandbox\`

\`aporto_redis_create\`

\`redis_create\`, \`create_redis\`

\`aporto_redis_list\`

\`redis_list\`, \`list_redis\`

\`aporto_redis_delete\`

\`redis_delete\`, \`delete_redis\`

\`aporto_redis_update\`

\`redis_update\`, \`redis_extend\`

\`aporto_redis_command\`

\`redis_exec\`, \`redis_run\`

\`aporto_vector_create\`

\`vector_create\`, \`create_vector_index\`

\`aporto_vector_list\`

\`vector_list\`, \`list_vector_indexes\`

\`aporto_vector_delete\`

\`vector_delete\`, \`delete_vector_index\`

\`aporto_vector_update\`

\`vector_update\`, \`vector_extend\`

\`aporto_vector_upsert\`

\`vector_upsert\`

\`aporto_vector_query\`

\`vector_search\`, \`vector_similarity\`

\`aporto_searchindex_create\`

\`search_create\`, \`create_search_index\`

\`aporto_searchindex_list\`

\`search_list\`, \`list_search_indexes\`

\`aporto_searchindex_delete\`

\`search_delete\`, \`delete_search_index\`

\`aporto_searchindex_update\`

\`search_update\`, \`searchindex_update\`, \`search_extend\`

\`aporto_searchindex_upsert\`

\`search_upsert\`, \`search_index_documents\`

\`aporto_searchindex_query\`

\`search_query\`, \`search_documents\`

\`aporto_message_publish\`

\`message_publish\`, \`publish_message\`, \`qstash_publish\`

\`aporto_message_enqueue\`

\`message_enqueue\`, \`qstash_enqueue\`

\`aporto_message_batch\`

\`message_batch\`, \`qstash_batch\`

\`aporto_message_get\`

\`message_get\`, \`qstash_message_status\`

\`aporto_message_cancel\`

\`message_cancel\`, \`qstash_cancel\`

\`aporto_schedule_create\`

\`schedule_create\`, \`qstash_schedule\`

\`aporto_schedule_list\`

\`schedule_list\`, \`list_schedules\`

\`aporto_schedule_get\`

\`schedule_get\`, \`qstash_schedule_status\`

\`aporto_schedule_delete\`

\`schedule_delete\`, \`delete_schedule\`

\`aporto_schedule_pause\`

\`schedule_pause\`, \`pause_schedule\`

\`aporto_schedule_resume\`

\`schedule_resume\`, \`resume_schedule\`

\`aporto_queue_list\`

\`queue_list\`, \`list_queues\`

\`aporto_queue_get\`

\`queue_get\`, \`qstash_queue_status\`

\`aporto_queue_delete\`

\`queue_delete\`, \`delete_queue\`

\`aporto_queue_pause\`

\`queue_pause\`, \`pause_queue\`

\`aporto_queue_resume\`

\`queue_resume\`, \`resume_queue\`

\`aporto_redis_create_fixed\`

\`redis_create_fixed\`, \`create_fixed_redis\``;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
