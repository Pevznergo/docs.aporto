"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Deploy full projects and manage persistent sandbox environments — no Blaxel account, no infrastructure setup, just API calls.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://blaxel.services.aporto.ai/v1";
// Step 1: Create a sandbox with a port exposedconst createRes = await aportoFetch(\`\${baseUrl}/sandboxes\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    name: "my-api",    tier: "s",    ttl: "2h",    port: 3000,  }),});
const sandbox = await createRes.json();
// Step 2: Wait for it to be readylet status = sandbox.status;while (status !== "running") {  const checkRes = await aportoFetch(\`\${baseUrl}/sandboxes/\${sandbox.name}\`);  const check = await checkRes.json();  status = check.status;}
// Step 3: Deploy codeawait aportoFetch(\`\${baseUrl}/sandboxes/\${sandbox.name}/deploy\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    files: {      "index.js": "require('http').createServer((req, res) => res.end('Hello!')).listen(3000);",      "package.json": '{"scripts":{"start":"node index.js"}}',    },    runtime: "node",  }),});
console.log("Deploying — poll sandbox status until running with a URL");
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto provides compute environments through [Blaxel](https://blaxel.ai):

1.  **Sandboxes** — Create persistent environments that stay running. You can interact with them via process, filesystem, and network APIs. Choose a tier based on your memory needs.
2.  **Deploy** — Push code to a sandbox. Upload files (JSON or tarball), and Blaxel handles dependency installation and process startup. Once deployed, create preview URLs to expose your service publicly.

All compute uses tier-based per-second pricing. Choose a tier based on your memory and performance needs.

## Provider

[Section titled “Provider”](#provider)

Powered by [Blaxel](https://blaxel.ai). Blaxel provides serverless sandbox environments with support for multiple languages and runtimes.

## API Reference

[Section titled “API Reference”](#api-reference)

### Endpoints

[Section titled “Endpoints”](#endpoints)

**Base URL:** \`https://blaxel.services.aporto.ai\`

Method

Path

Description

POST

\`/v1/sandboxes\`

Create a sandbox

GET

\`/v1/sandboxes\`

List sandboxes

GET

\`/v1/sandboxes/:name\`

Get a sandbox

PATCH

\`/v1/sandboxes/:name\`

Extend sandbox TTL

DELETE

\`/v1/sandboxes/:name\`

Delete a sandbox

POST

\`/v1/sandboxes/:name/deploy\`

Deploy code to a sandbox

Sandboxes also expose proxied runtime APIs for process management, filesystem operations, network monitoring, and previews under \`/v1/sandboxes/:name/...\`.

* * *

### Create Sandbox

[Section titled “Create Sandbox”](#create-sandbox)

**Endpoint:** \`POST https://blaxel.services.aporto.ai/v1/sandboxes\`

Create a persistent sandbox environment.

#### Request

[Section titled “Request”](#request)

Parameter

Type

Required

Description

\`name\`

string

Yes

Sandbox name (2-63 lowercase alphanumeric or hyphens, must start/end with alphanumeric)

\`tier\`

string

No

\`xs\`, \`s\`, \`m\`, \`l\`, or \`xl\` (default: \`s\`)

\`ttl\`

string

No

Time-to-live: \`30m\`, \`1h\`, \`24h\`, \`7d\` (default: \`4h\`)

\`envs\`

object

No

Environment variables: \`{ "KEY": "value" }\`

\`port\`

number

No

Single port to expose (shorthand for \`ports\`, mutually exclusive)

\`ports\`

array

No

Ports to expose — numbers (e.g., \`[3000, 8080]\`) or objects (e.g., \`[{ target: 3000, protocol: "HTTP" }]\`). Required for previews.

Reserved ports

Blaxel reserves ports **80**, **443**, and **8080** for internal use. Port 8080 is occupied by an internal process — applications that try to bind it will get \`EADDRINUSE\`. Use a different port (e.g., 3000) and declare it in \`port\` or \`ports\`.

\`\`\`
{  "name": "my-api",  "tier": "s",  "ttl": "2h",  "envs": { "NODE_ENV": "production" },  "port": 3000}
\`\`\`

#### Response

[Section titled “Response”](#response)

\`\`\`
{  "id": "sbox_01jz1234abcd",  "name": "my-api",  "source": "sandbox",  "status": "provisioning",  "tier": "s",  "url": null,  "expiresAt": "2026-02-25T14:30:00.000Z",  "createdAt": "2026-02-25T10:30:00.000Z",  "updatedAt": "2026-02-25T10:30:00.000Z"}
\`\`\`

The sandbox starts in \`provisioning\` status and transitions to \`running\` within seconds. The \`url\` field is populated once the sandbox is ready.

#### Tiers

[Section titled “Tiers”](#tiers)

Tier

Memory

Rate (per second)

\`xs\`

2 GB

\$0.000023

\`s\`

4 GB

\$0.000046

\`m\`

8 GB

\$0.000092

\`l\`

16 GB

\$0.000184

\`xl\`

32 GB

\$0.000368

### Extend Sandbox

[Section titled “Extend Sandbox”](#extend-sandbox)

**Endpoint:** \`PATCH https://blaxel.services.aporto.ai/v1/sandboxes/:name\`

Add more time to a running sandbox.

Parameter

Type

Required

Description

\`ttl\`

string or number

No

Additional time to add (\`"1h"\` or \`3600\`)

### Delete Sandbox

[Section titled “Delete Sandbox”](#delete-sandbox)

**Endpoint:** \`DELETE https://blaxel.services.aporto.ai/v1/sandboxes/:name\`

Returns \`204 No Content\` on success.

* * *

### Deploy to Sandbox

[Section titled “Deploy to Sandbox”](#deploy-to-sandbox)

**Endpoint:** \`POST https://blaxel.services.aporto.ai/v1/sandboxes/:name/deploy\`

Deploy code to an existing sandbox. Returns \`202 Accepted\` — the build runs asynchronously. Poll \`GET /v1/sandboxes/:name\` until status transitions to \`running\`.

#### Request (JSON)

[Section titled “Request (JSON)”](#request-json)

Parameter

Type

Required

Description

\`files\`

object

Yes

File map: \`{ "path": "content" }\`

\`runtime\`

string

No

\`node\`, \`python\`, \`go\`, \`static\`, or \`custom\` (auto-detected if omitted)

\`entrypoint\`

string

No

Start command (auto-detected if omitted)

\`\`\`
{  "files": {    "index.js": "const http = require('http');\nhttp.createServer((req, res) => res.end('Hello')).listen(3000);",    "package.json": "{\"name\": \"my-api\", \"scripts\": {\"start\": \"node index.js\"}}"  },  "runtime": "node"}
\`\`\`

Deploy also accepts tarball uploads (\`Content-Type: application/gzip\`) with metadata via query params (\`runtime\`, \`entrypoint\`).

#### Response (202 Accepted)

[Section titled “Response (202 Accepted)”](#response-202-accepted)

\`\`\`
{  "id": "sbox_01jz1234abcd",  "name": "my-api",  "status": "building",  "source": "sandbox",  "tier": "s",  "url": null,  "createdAt": "2026-02-25T10:30:00.000Z"}
\`\`\`

Note

Deploy requires the sandbox to be in \`running\` or \`stopped\` state. Poll \`GET /v1/sandboxes/:name\` until \`status\` becomes \`running\` and \`url\` is populated.

* * *

### Runtime Proxy Endpoints

[Section titled “Runtime Proxy Endpoints”](#runtime-proxy-endpoints)

Once a sandbox is running, Aporto proxies Blaxel runtime APIs for direct interaction:

**Process management:**

*   \`POST /v1/sandboxes/:name/process\` — Create a process
*   \`GET /v1/sandboxes/:name/process\` — List processes
*   \`GET /v1/sandboxes/:name/process/:pid\` — Get process details
*   \`DELETE /v1/sandboxes/:name/process/:pid\` — Delete process
*   \`DELETE /v1/sandboxes/:name/process/:pid/kill\` — Kill process
*   \`GET /v1/sandboxes/:name/process/:pid/logs\` — Get logs
*   \`GET /v1/sandboxes/:name/process/:pid/logs/stream\` — Stream logs (SSE)

**Filesystem:**

*   \`GET /v1/sandboxes/:name/filesystem/*path\` — Read file
*   \`PUT /v1/sandboxes/:name/filesystem/*path\` — Write file
*   \`DELETE /v1/sandboxes/:name/filesystem/*path\` — Delete file
*   \`GET /v1/sandboxes/:name/filesystem/tree/*path\` — Get directory tree
*   \`GET /v1/sandboxes/:name/filesystem/find\` — Find files
*   \`GET /v1/sandboxes/:name/filesystem/search\` — Search file contents

**Network:**

*   \`GET /v1/sandboxes/:name/network/process/:pid/ports\` — Get open ports for a process
*   \`POST /v1/sandboxes/:name/network/process/:pid/ports/monitor\` — Start port monitoring
*   \`DELETE /v1/sandboxes/:name/network/process/:pid/ports/monitor\` — Stop port monitoring

**Previews:**

*   \`POST /v1/sandboxes/:name/previews\` — Create a public preview URL
*   \`GET /v1/sandboxes/:name/previews\` — List previews

Note

Previews require the target port to be declared in \`port\` or \`ports\` at sandbox creation. Without declared ports, only port 8080 is available and creating previews for other ports will fail.

* * *

* * *

### Run Code (Ephemeral)

[Section titled “Run Code (Ephemeral)”](#run-code-ephemeral)

**Endpoint:** \`POST https://blaxel.services.aporto.ai/v1/run\`

Execute code in an ephemeral sandbox. The response includes stdout, stderr, and exit code. The sandbox is automatically cleaned up after execution.

#### Request

[Section titled “Request”](#request-1)

Parameter

Type

Required

Description

\`language\`

string

Yes

\`python\`, \`node\`, \`typescript\`, \`bash\`, \`ruby\`, \`go\`

\`code\`

string

Conditional

Inline source code (mutually exclusive with \`files\`)

\`files\`

object

Conditional

File map: \`{ "path": "content" }\` (mutually exclusive with \`code\`)

\`entrypoint\`

string

No

Main file when using \`files\`

\`packages\`

string\[\]

No

Packages to install (pip/npm) before execution

\`timeout\`

number

No

Max execution time in seconds (default: 30, max: 600)

\`\`\`
{  "language": "python",  "code": "import math\nprint(f'Pi is {math.pi:.4f}')",  "timeout": 10}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

\`\`\`
{  "id": "run_abc123",  "status": "completed",  "language": "python",  "stdout": "Pi is 3.1416\n",  "stderr": "",  "exitCode": 0,  "durationMs": 842,  "createdAt": "2026-03-01T10:30:00.000Z",  "completedAt": "2026-03-01T10:30:01.000Z"}
\`\`\`

#### Other Run Endpoints

[Section titled “Other Run Endpoints”](#other-run-endpoints)

Method

Path

Description

GET

\`/v1/runs\`

List recent runs

GET

\`/v1/runs/:id\`

Get run result

#### Run Pricing

[Section titled “Run Pricing”](#run-pricing)

Runs use XS tier (\$0.000023/second) for the configured timeout:

Timeout

Price

30s (default)

\$0.00069

60s

\$0.00138

600s (max)

\$0.0138

* * *

### Jobs

[Section titled “Jobs”](#jobs)

Jobs are stateless serverless functions deployed to Blaxel. They can run on-demand or on a cron schedule.

#### Deploy Job

[Section titled “Deploy Job”](#deploy-job)

**Endpoint:** \`POST https://blaxel.services.aporto.ai/v1/jobs\`

Parameter

Type

Required

Description

\`name\`

string

Yes

Unique job name

\`files\`

object

Yes

File map: \`{ "path": "content" }\`

\`runtime\`

string

No

\`node\`, \`python\`, etc. (auto-detected if omitted)

\`runtimeConfig\`

object

No

Runtime configuration

\`runtimeConfig.memory\`

number

No

Memory in MB, 128-4096 (default: 256)

\`runtimeConfig.timeout\`

number

No

Timeout in seconds, 1-3600 (default: 300)

\`schedule\`

string

No

Cron expression for scheduled execution

\`envs\`

object

No

Environment variables

Also accepts binary uploads (\`application/zip\` or \`application/x-tar+gzip\`) with metadata via query params.

#### Job Endpoints

[Section titled “Job Endpoints”](#job-endpoints)

Method

Path

Description

POST

\`/v1/jobs\`

Deploy a job

GET

\`/v1/jobs\`

List jobs

GET

\`/v1/jobs/:name\`

Get job details

PUT

\`/v1/jobs/:name\`

Redeploy (update) a job

DELETE

\`/v1/jobs/:name\`

Delete a job

#### Trigger Execution

[Section titled “Trigger Execution”](#trigger-execution)

**Endpoint:** \`POST https://blaxel.services.aporto.ai/v1/jobs/:name/executions\`

Parameter

Type

Required

Description

\`tasks\`

array

Yes

Array of task payloads (each element runs as one task)

\`env\`

object

No

Environment variable overrides

\`memory\`

number

No

Memory override in MB

#### Execution Endpoints

[Section titled “Execution Endpoints”](#execution-endpoints)

Method

Path

Description

POST

\`/v1/jobs/:name/executions\`

Trigger execution

GET

\`/v1/jobs/:name/executions\`

List executions

GET

\`/v1/jobs/:name/executions/:id\`

Get execution details

#### Job Pricing

[Section titled “Job Pricing”](#job-pricing)

All job operations are nominally priced at \$0.00001 per API call.

* * *

### Sandbox Status Lifecycle

[Section titled “Sandbox Status Lifecycle”](#sandbox-status-lifecycle)

Status

Description

\`provisioning\`

Sandbox is being created

\`building\`

Code is being deployed (after deploy call)

\`running\`

Ready for use

\`stopped\`

Sandbox has stopped

\`failed\`

Creation or deployment failed (check \`error\` field)

\`deleting\`

Deletion in progress

\`deleted\`

Fully removed

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — check parameter values and file paths

402

Payment required — ensure you’re using the Aporto SDK

404

Sandbox not found, or not owned by your account

409

Name conflict (sandbox name already in use) or sandbox not in a deployable state

410

Sandbox has been deleted

422

Sandbox limit exceeded for your account

429

Rate limit exceeded

502

Upstream error from Blaxel

503

Sandbox not yet ready (still provisioning)

504

Upstream timeout

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://blaxel.services.aporto.ai/v1";
async function deployService() {  // Create a sandbox with port 3000 exposed  const createRes = await aportoFetch(\`\${baseUrl}/sandboxes\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      name: "my-api",      tier: "s",      ttl: "2h",      port: 3000,    }),  });
  const sandbox = await createRes.json();  console.log(\`Sandbox created: \${sandbox.name}\`);
  // Wait for sandbox to be ready  let current = sandbox;  while (current.status !== "running") {    const checkRes = await aportoFetch(      \`\${baseUrl}/sandboxes/\${sandbox.name}\`    );    current = await checkRes.json();  }
  // Deploy a Node.js server  await aportoFetch(\`\${baseUrl}/sandboxes/\${sandbox.name}/deploy\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      files: {        "index.js": \`          const http = require('http');          const server = http.createServer((req, res) => {            res.writeHead(200, { 'Content-Type': 'application/json' });            res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));          });          server.listen(3000, () => console.log('Listening on :3000'));        \`,        "package.json": '{"name":"my-api","scripts":{"start":"node index.js"}}',      },      runtime: "node",    }),  });
  // Wait for deploy to complete  let deployed = current;  while (deployed.status !== "running" || !deployed.url) {    const checkRes = await aportoFetch(      \`\${baseUrl}/sandboxes/\${sandbox.name}\`    );    deployed = await checkRes.json();  }
  console.log(\`Service live at \${deployed.url}\`);
  // Create a public preview URL  const previewRes = await aportoFetch(    \`\${baseUrl}/sandboxes/\${sandbox.name}/previews\`,    {      method: "POST",      headers: { "Content-Type": "application/json" },      body: JSON.stringify({ port: 3000 }),    }  );
  const preview = await previewRes.json();  console.log(\`Preview URL: \${preview.url}\`);
  // Clean up when done  // await aportoFetch(\`\${baseUrl}/sandboxes/\${sandbox.name}\`, { method: "DELETE" });}
await deployService();
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Cost

Sandbox — XS (2 GB)

\$0.000023/second

Sandbox — S (4 GB)

\$0.000046/second

Sandbox — M (8 GB)

\$0.000092/second

Sandbox — L (16 GB)

\$0.000184/second

Sandbox — XL (32 GB)

\$0.000368/second

Deploy, list, get, delete

Nominal (\$0.00001)

Sandbox pricing is calculated upfront based on tier and TTL. Extending a sandbox’s TTL costs the tier rate multiplied by the additional time.

Using Python?

See [Service Proxy](/service-proxy) for REST API access without the Node.js SDK.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
