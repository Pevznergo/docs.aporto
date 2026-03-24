"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `The \`@aporto/fetch\` package creates a Aporto-enabled fetch function with automatic payment handling and authorization.

* * *

## Installation

[Section titled “Installation”](#installation)

*   [npm](#tab-panel-9)
*   [pnpm](#tab-panel-10)
*   [yarn](#tab-panel-11)

Terminal window

\`\`\`
npm install @aporto/fetch
\`\`\`

Terminal window

\`\`\`
pnpm add @aporto/fetch
\`\`\`

Terminal window

\`\`\`
yarn add @aporto/fetch
\`\`\`

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Note

**No Dependencies:** Uses native Fetch API available in Node.js 18+

* * *

## Basic Setup

[Section titled “Basic Setup”](#basic-setup)

Create a Aporto-enabled fetch function:

\`\`\`
import { createFetch } from '@aporto/fetch';
const fetch = createFetch({  apiKey: process.env.APORTO_API_KEY});
// Drop-in replacement for native fetchconst response = await fetch('https://api.example.com/data');const data = await response.json();
\`\`\`

* * *

## Configuration

[Section titled “Configuration”](#configuration)

All configuration options for \`createFetch\`:

\`\`\`
import { createFetch } from '@aporto/fetch';
const fetch = createFetch({  // Optional - Automatically uses process.env.APORTO_API_KEY if not provided  apiKey: process.env.MY_CUSTOM_APORTO_KEY,
  // Optional - Control  enabled: true,              // Enable Aporto handling (default: true)  failureMode: 'open',        // 'open' | 'closed' (default: 'open')                              // 'open': Allow requests if Aporto fails (prioritizes availability)                              // 'closed': Block requests if Aporto fails (prioritizes security)
  // Optional - Default metadata (applied to all requests)  agentName: 'my-agent',      // Agent identifier  agentId: 'agent-123',       // Agent UUID or numeric ID  serviceName: 'my-service',  // Service name for transactions  traceId: 'trace-xyz',       // Internal trace UUID  traceExternalId: 'ext-456', // External trace identifier});
\`\`\`

### Configuration Options

[Section titled “Configuration Options”](#configuration-options)

\`apiKey\` string required

Your Aporto API key. Can also be set via \`APORTO_API_KEY\` environment variable

\`enabled\` boolean default: true

Enable Aporto handling. When disabled, requests pass through without Aporto processing

\`failureMode\` 'open' | 'closed' default: 'open'

Control behavior when Aporto operations fail:

*   \`'open'\`: Allow requests to proceed (prioritizes availability)
*   \`'closed'\`: Block requests (prioritizes security)

\`agentName\` string

Agent identifier for tracking and attribution

\`agentId\` string | number

Agent UUID or numeric ID

\`serviceName\` string

Service name for transactions

\`traceId\` string

Internal trace UUID for request correlation

\`traceExternalId\` string

External trace identifier for integration with external systems

* * *

## Per-Request Overrides

[Section titled “Per-Request Overrides”](#per-request-overrides)

Override configuration for individual requests using the \`__aporto\` property:

\`\`\`
// Disable Aporto for a specific requestconst publicRequest = new Request('/api/public');(publicRequest as any).__aporto = { enabled: false };await fetch(publicRequest);
// Override metadata for a specific requestconst request = new Request('/api/resource', { method: 'POST' });(request as any).__aporto = {  serviceName: 'different-service',  actionName: 'custom-action',  traceExternalId: 'ext-789'};await fetch(request);
\`\`\`

* * *

## Payment Handling

[Section titled “Payment Handling”](#payment-handling)

The wrapper automatically handles 402 Payment Required responses:

\`\`\`
import { createFetch } from '@aporto/fetch';
const fetch = createFetch({  apiKey: process.env.APORTO_API_KEY});
try {  // Automatically handles 402 payment flows  const response = await fetch('https://api.example.com/premium-endpoint');  const data = await response.json();  console.log(data);} catch (error) {  // Payment errors will be handled by Aporto  console.error('Request failed:', error);}
\`\`\`

* * *

## Environment Variables

[Section titled “Environment Variables”](#environment-variables)

Automatically reads from environment:

*   \`APORTO_API_KEY\` (required)
*   \`APORTO_BASE_URL\` or \`APORTO_API_URL\` (optional)
*   \`APORTO_TIMEOUT\` (optional, in milliseconds)

* * *

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Axios](/integration/http-clients/axios) Axios client integration

[Node.js HTTP](/integration/http-clients/node-http) Native http/https integration`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
