"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `The \`@aporto/langchain-classic\` package provides component wrapper-based integration for LangChain v0.3+, enabling automatic cost tracking, session management, and payment handling by wrapping individual components.

Note

**For LangChain v1.x**, use [@aporto/langchain](/integration/agent-frameworks/langchain) instead for a simpler middleware-based approach.

* * *

## Installation

[Section titled “Installation”](#installation)

*   [npm](#tab-panel-0)
*   [pnpm](#tab-panel-1)
*   [yarn](#tab-panel-2)

Terminal window

\`\`\`
npm install @aporto/langchain-classic
\`\`\`

Terminal window

\`\`\`
pnpm add @aporto/langchain-classic
\`\`\`

Terminal window

\`\`\`
yarn add @aporto/langchain-classic
\`\`\`

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Peer Dependencies

[Section titled “Peer Dependencies”](#peer-dependencies)

The LangChain Classic integration requires these peer dependencies:

Terminal window

\`\`\`
npm install @langchain/core @langchain/langgraph
\`\`\`

Note

**Compatibility:** \`@aporto/langchain-classic\` supports LangChain v0.3+ with \`@langchain/core >=0.3.0 <1.0.0\`.

* * *

## Quick Start

[Section titled “Quick Start”](#quick-start)

### Creating an Agent

[Section titled “Creating an Agent”](#creating-an-agent)

Use \`createAportoReactAgent\` for the simplest agent integration:

\`\`\`
import { createAportoReactAgent } from '@aporto/langchain-classic';import { ChatOpenAI } from '@langchain/openai';import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
// Define your toolsconst tools = [  new TavilySearchResults({ maxResults: 3 })];
// Create Aporto-tracked agent with one function callconst agent = await createAportoReactAgent(  {    llm: new ChatOpenAI({      apiKey: process.env.OPENAI_API_KEY,      model: 'gpt-4',      temperature: 0    }),    tools  },  {    apiKey: process.env.APORTO_API_KEY,    traceId: 'agent-workflow', // optional    agentName: 'customer-support-bot',    failureMode: 'open'  });
// All operations (model + tools) are automatically trackedconst result = await agent.invoke({  messages: [    { role: 'user', content: 'What is the weather in San Francisco?' }  ]});
console.log(result.messages);
\`\`\`

Tip

\`createAportoReactAgent\` is a drop-in replacement for LangChain’s \`createReactAgent\` that automatically wraps your model and tools with Aporto tracking.

### Using Component Wrappers

[Section titled “Using Component Wrappers”](#using-component-wrappers)

For more granular control, wrap individual components:

\`\`\`
import { AportoChatOpenAI, wrapAportoTool, wrapAportoAgent } from '@aporto/langchain-classic';
// Wrap modelconst model = new AportoChatOpenAI(  { model: 'gpt-4' },  { apiKey: process.env.APORTO_API_KEY });
// Wrap toolsconst wrappedTool = wrapAportoTool(myTool, {  apiKey: process.env.APORTO_API_KEY,  serviceName: 'weather-api'});
// Wrap agentconst agent = wrapAportoAgent(graph, {  apiKey: process.env.APORTO_API_KEY,  traceId: 'agent-workflow'});
\`\`\`

### Streaming Responses

[Section titled “Streaming Responses”](#streaming-responses)

Enable streaming for real-time responses:

\`\`\`
import { AportoChatOpenAI } from '@aporto/langchain-classic';
const model = new AportoChatOpenAI({  apiKey: process.env.OPENAI_API_KEY,  aportoApiKey: process.env.APORTO_API_KEY,  model: 'gpt-4',  streaming: true});
const stream = await model.stream('Write a short poem about AI');
for await (const chunk of stream) {  process.stdout.write(chunk.content);}
\`\`\`

* * *

## Configuration Options

[Section titled “Configuration Options”](#configuration-options)

### createAportoReactAgent Options

[Section titled “createAportoReactAgent Options”](#createaportoreactagent-options)

\`apiKey\` string required

Your Aporto API key. Can also be set via \`APORTO_API_KEY\` environment variable

\`enabled\` boolean default: true

Enable or disable Aporto tracking

\`failureMode\` 'open' | 'closed' default: open

How to handle tracking failures:

*   \`'open'\` (default): Log errors, continue without tracking
*   \`'closed'\`: Throw errors, block operations

\`traceId\` string

Workflow trace identifier for grouping related transactions

\`agentId\` string

Existing agent UUID/ID

\`agentName\` string

Agent name for find-or-create behavior

### AportoChatOpenAI Options

[Section titled “AportoChatOpenAI Options”](#aportochatopenai-options)

All standard ChatOpenAI options plus Aporto-specific configuration:

\`apiKey\` string required

Your OpenAI API key

\`model\` string default: gpt-3.5-turbo

OpenAI model to use (e.g., \`gpt-4\`, \`gpt-4-turbo\`, \`gpt-3.5-turbo\`)

\`aportoApiKey\` string required

Your Aporto API key. Can also be set via \`APORTO_API_KEY\` environment variable

\`temperature\` number default: 0.7

Controls randomness (0-2). Lower values make output more focused

\`maxTokens\` number

Maximum tokens to generate in the response

\`streaming\` boolean default: false

Enable streaming responses

### wrapAportoTool Options

[Section titled “wrapAportoTool Options”](#wrapaportotool-options)

\`apiKey\` string required

Your Aporto API key

\`serviceName\` string

Service identifier for the tool’s transactions

### Environment Variables

[Section titled “Environment Variables”](#environment-variables)

Terminal window

\`\`\`
# RequiredOPENAI_API_KEY=sk-...APORTO_API_KEY=spk_...
\`\`\`

* * *

## What Gets Tracked

[Section titled “What Gets Tracked”](#what-gets-tracked)

The component wrappers automatically track:

*   **Agent lifecycle** - Start and end of agent transactions via \`wrapAportoAgent\`
*   **Model calls** - Token estimation and actual usage via \`AportoChatOpenAI\`
*   **Tool calls** - Pre-authorization via \`wrapAportoTool\`
*   **Payment handling** - MCP x402 payment required responses with retry
*   **Trace grouping** - Workflow correlation across operations

* * *

## Best Practices

[Section titled “Best Practices”](#best-practices)

Use Environment Variables

Never hardcode API keys:

\`\`\`
import { AportoChatOpenAI } from '@aporto/langchain-classic';
// ✅ Goodconst model = new AportoChatOpenAI({  apiKey: process.env.OPENAI_API_KEY,  aportoApiKey: process.env.APORTO_API_KEY});
// ❌ Badconst model = new AportoChatOpenAI({  apiKey: 'sk-...',  aportoApiKey: 'spk-...'});
\`\`\`

Choose the Right Integration Level

\`\`\`
// Use createAportoReactAgent for simplest setupconst agent = await createAportoReactAgent(  { llm, tools },  { apiKey: process.env.APORTO_API_KEY });
// Use component wrappers for granular controlconst model = new AportoChatOpenAI({ ... });const tool = wrapAportoTool(myTool, { ... });
\`\`\`

Use Trace IDs for Correlation

Group related operations with trace IDs:

\`\`\`
import { createAportoReactAgent } from '@aporto/langchain-classic';
const agent = await createAportoReactAgent(  { llm, tools },  {    apiKey: process.env.APORTO_API_KEY,    traceId: \`session-\${sessionId}\`,    agentName: 'customer-support',  });
\`\`\`

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[LangChain (v1.x)](/integration/agent-frameworks/langchain) Simpler middleware-based integration

[HTTP Clients](/integration/http-clients) Low-level HTTP client integrations`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
