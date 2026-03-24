"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `The \`@aporto/langchain\` package provides middleware-based integration for LangChain v1.x, enabling automatic cost tracking, session management, and payment handling with minimal setup.

Note

**For LangChain v0.3+**, use [@aporto/langchain-classic](/integration/agent-frameworks/langchain-classic) instead.

* * *

## Installation

[Section titled “Installation”](#installation)

*   [npm](#tab-panel-3)
*   [pnpm](#tab-panel-4)
*   [yarn](#tab-panel-5)

Terminal window

\`\`\`
npm install @aporto/langchain
\`\`\`

Terminal window

\`\`\`
pnpm add @aporto/langchain
\`\`\`

Terminal window

\`\`\`
yarn add @aporto/langchain
\`\`\`

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Peer Dependencies

[Section titled “Peer Dependencies”](#peer-dependencies)

The LangChain integration requires LangChain v1.x:

Terminal window

\`\`\`
npm install langchain
\`\`\`

Note

**Compatibility:** \`@aporto/langchain\` supports LangChain v1.0+.

* * *

## Quick Start

[Section titled “Quick Start”](#quick-start)

### Using the Middleware

[Section titled “Using the Middleware”](#using-the-middleware)

The LangChain v1.x integration uses a middleware-based approach for seamless tracking:

\`\`\`
import { createAgent } from 'langchain';import { createAportoMiddleware } from '@aporto/langchain';
// Define your toolsconst tools = [getWeather, sendEmail];
// Create agent with Aporto middlewareconst agent = createAgent({  model: 'gpt-4',  tools,  middleware: [    createAportoMiddleware({      apiKey: process.env.SAPIOM_API_KEY,      failureMode: 'open',  // 'open' (graceful) or 'closed' (strict)      traceId: 'my-workflow',      agentName: 'customer-support-bot',    }),  ],});
// All tracking happens automatically!const result = await agent.invoke({  messages: [{ role: 'user', content: 'What is the weather in Tokyo?' }],});
console.log(result.messages);
\`\`\`

Tip

\`createAportoMiddleware\` hooks into LangChain’s native middleware system to automatically track agent lifecycle, model calls, and tool invocations with minimal setup.

### Per-Invocation Overrides

[Section titled “Per-Invocation Overrides”](#per-invocation-overrides)

Override configuration on individual calls using the context parameter:

\`\`\`
await agent.invoke(  { messages: [...] },  {    context: {      aportoTraceId: 'conversation-456',      aportoAgentId: 'AG-002',    },  });
\`\`\`

* * *

## Configuration Options

[Section titled “Configuration Options”](#configuration-options)

### createAportoMiddleware Options

[Section titled “createAportoMiddleware Options”](#createaportomiddleware-options)

\`apiKey\` string required

Your Aporto API key. Can also be set via \`SAPIOM_API_KEY\` environment variable

\`enabled\` boolean default: true

Enable or disable Aporto tracking

\`failureMode\` 'open' | 'closed' default: open

How to handle tracking failures:

*   \`'open'\` (default): Log errors, continue without tracking (prioritizes availability)
*   \`'closed'\`: Throw errors, block operations (prioritizes security)

Note: Authorization denials always throw regardless of failure mode

\`traceId\` string

Workflow trace identifier for grouping related transactions

\`agentId\` string

Existing agent UUID/ID to use

\`agentName\` string

Agent name for find-or-create behavior

\`serviceName\` string

Service identifier for transactions

### Per-Invocation Context Options

[Section titled “Per-Invocation Context Options”](#per-invocation-context-options)

These can be passed in the \`context\` parameter when invoking the agent:

\`aportoTraceId\` string

Override trace ID for this invocation

\`aportoAgentId\` string

Override agent ID for this invocation

### Environment Variables

[Section titled “Environment Variables”](#environment-variables)

Terminal window

\`\`\`
# RequiredSAPIOM_API_KEY=spk_...
# Your LLM provider keysOPENAI_API_KEY=sk-...
\`\`\`

* * *

## What Gets Tracked

[Section titled “What Gets Tracked”](#what-gets-tracked)

The middleware automatically tracks:

*   **Agent lifecycle** - Start and end of agent transactions
*   **Model calls** - Token estimation and actual usage
*   **Tool calls** - Pre-authorization before execution
*   **Payment handling** - MCP x402 payment required responses
*   **Trace grouping** - Workflow correlation across operations

* * *

## Best Practices

[Section titled “Best Practices”](#best-practices)

Use Environment Variables

Never hardcode API keys:

\`\`\`
// ✅ GoodcreateAportoMiddleware({  apiKey: process.env.SAPIOM_API_KEY,});
// ❌ BadcreateAportoMiddleware({  apiKey: 'spk_...',});
\`\`\`

Choose Appropriate Failure Mode

\`\`\`
// For production - prioritize availabilitycreateAportoMiddleware({  apiKey: process.env.SAPIOM_API_KEY,  failureMode: 'open', // Continues even if tracking fails});
// For sensitive operations - prioritize securitycreateAportoMiddleware({  apiKey: process.env.SAPIOM_API_KEY,  failureMode: 'closed', // Blocks if tracking fails});
\`\`\`

Use Trace IDs for Correlation

Group related operations with trace IDs:

\`\`\`
const middleware = createAportoMiddleware({  apiKey: process.env.SAPIOM_API_KEY,  traceId: \`session-\${sessionId}\`,  agentName: 'customer-support',});
\`\`\`

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[LangChain Classic](/integration/agent-frameworks/langchain-classic) Integration for LangChain v0.3+

[HTTP Clients](/integration/http-clients) Low-level HTTP client integrations`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
