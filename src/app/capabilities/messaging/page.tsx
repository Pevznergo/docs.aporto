"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Send asynchronous messages, enqueue jobs, and batch deliver payloads to any HTTP endpoint — no Upstash account, no queue infrastructure, just API calls.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
// Publish a message to a webhookconst response = await aportoFetch(  "https://upstash.services.aporto.ai/v1/qstash/publish/https://example.com/webhook",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      type: "job.created",      payload: { id: "job_123" },    }),  });
const data = await response.json();console.log("Message ID:", data.messageId);
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto routes messaging requests through [Upstash QStash](https://upstash.com/docs/qstash), a serverless message queue and delivery service. The SDK handles payment negotiation so you don’t need a separate Upstash account.

There are three delivery modes:

1.  **Publish** — Fire-and-forget delivery to any HTTP endpoint. QStash handles retries automatically.
2.  **Enqueue** — Ordered delivery through a named queue. Messages in the same queue are processed sequentially.
3.  **Batch** — Send multiple messages in a single request. Each message can target a different destination or queue.

The destination URL receives your message body as an HTTP POST with the headers you specified.

## Provider

[Section titled “Provider”](#provider)

Powered by [Upstash QStash](https://upstash.com/docs/qstash). QStash provides serverless messaging with automatic retries, at-least-once delivery, and dead letter queues.

## API Reference

[Section titled “API Reference”](#api-reference)

### Endpoints

[Section titled “Endpoints”](#endpoints)

**Base URL:** \`https://upstash.services.aporto.ai\`

Method

Path

Description

POST

\`/v1/qstash/publish/*destination\`

Publish a message to a URL

POST

\`/v1/qstash/enqueue/:queueName/*destination\`

Enqueue a message to a named queue

POST

\`/v1/qstash/batch\`

Send multiple messages in one request

* * *

### Publish

[Section titled “Publish”](#publish)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/qstash/publish/{destination}\`

Send a message to any HTTP endpoint. The destination URL is appended to the path.

\`\`\`
// The destination URL is part of the request pathawait client.post(  "https://upstash.services.aporto.ai/v1/qstash/publish/https://example.com/webhook",  { event: "user.signup", userId: "usr_123" },  { headers: { "Content-Type": "application/json" } });
\`\`\`

The message body can be any content type — JSON, plain text, binary, etc. It is forwarded as-is to the destination.

#### Rules

[Section titled “Rules”](#rules)

*   Destination must start with \`http://\` or \`https://\`
*   Path traversal patterns are rejected
*   Callback, cron, and flow-control headers are stripped before forwarding

* * *

### Enqueue

[Section titled “Enqueue”](#enqueue)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/qstash/enqueue/{queueName}/{destination}\`

Add a message to a named queue for ordered processing. Messages in the same queue are delivered sequentially.

\`\`\`
// Enqueue to the "email-queue" queueawait client.post(  "https://upstash.services.aporto.ai/v1/qstash/enqueue/email-queue/https://example.com/send-email",  { to: "[email protected]", subject: "Welcome!" },  { headers: { "Content-Type": "application/json" } });
\`\`\`

Queue names are automatically scoped to your account — no collisions with other users.

* * *

### Batch

[Section titled “Batch”](#batch)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/qstash/batch\`

Send multiple messages in a single request. The body must be a non-empty JSON array.

#### Request

[Section titled “Request”](#request)

\`\`\`
[  {    "destination": "https://example.com/webhook-a",    "headers": { "Content-Type": "application/json" },    "body": "{\"event\":\"order.created\",\"orderId\":\"ord_1\"}"  },  {    "destination": "https://example.com/webhook-b",    "headers": { "Content-Type": "application/json" },    "body": "{\"event\":\"notification.send\",\"userId\":\"usr_1\"}",    "queue": "notifications"  }]
\`\`\`

Each item in the array can target a different destination and optionally specify a \`queue\` for ordered delivery.

* * *

### Message Management

[Section titled “Message Management”](#message-management)

#### Get Message Status

[Section titled “Get Message Status”](#get-message-status)

**Endpoint:** \`GET https://upstash.services.aporto.ai/v1/qstash/messages/{messageId}\`

Check the delivery status of a published or enqueued message.

\`\`\`
const { data } = await client.get(  \`\${baseUrl}/messages/\${messageId}\`);
console.log(data.state); // "delivered", "pending", "failed", "retry"
\`\`\`

#### Cancel Message

[Section titled “Cancel Message”](#cancel-message)

**Endpoint:** \`DELETE https://upstash.services.aporto.ai/v1/qstash/messages/{messageId}\`

Cancel a message that hasn’t been delivered yet.

* * *

### Queue Management

[Section titled “Queue Management”](#queue-management)

Manage named queues used with the enqueue endpoint.

Method

Path

Description

GET

\`/v1/qstash/queues\`

List all queues

GET

\`/v1/qstash/queues/:name\`

Get queue details

DELETE

\`/v1/qstash/queues/:name\`

Delete queue and pending messages

POST

\`/v1/qstash/queues/:name/pause\`

Pause message delivery

POST

\`/v1/qstash/queues/:name/resume\`

Resume message delivery

Queue names are automatically scoped to your account — no collisions with other users.

\`\`\`
// List your queuesconst { data: queues } = await client.get(\`\${baseUrl}/queues\`);
// Pause a queueawait client.post(\`\${baseUrl}/queues/email-queue/pause\`);
// Resume it laterawait client.post(\`\${baseUrl}/queues/email-queue/resume\`);
\`\`\`

* * *

### Schedule Management

[Section titled “Schedule Management”](#schedule-management)

Create recurring message deliveries using cron expressions.

#### Create Schedule

[Section titled “Create Schedule”](#create-schedule)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/qstash/schedules/{destination}\`

The destination URL is part of the path (same pattern as publish). The cron expression is passed via the \`Upstash-Cron\` header.

\`\`\`
await client.post(  \`\${baseUrl}/schedules/https://api.example.com/daily-report\`,  { type: "generate-report" },  {    headers: {      "Content-Type": "application/json",      "Upstash-Cron": "0 9 * * *", // Every day at 9 AM    },  });
\`\`\`

#### Schedule Endpoints

[Section titled “Schedule Endpoints”](#schedule-endpoints)

Method

Path

Description

POST

\`/v1/qstash/schedules/*destination\`

Create schedule (requires \`Upstash-Cron\` header)

GET

\`/v1/qstash/schedules\`

List schedules

GET

\`/v1/qstash/schedules/:id\`

Get schedule details

DELETE

\`/v1/qstash/schedules/:id\`

Delete schedule

PATCH

\`/v1/qstash/schedules/:id/pause\`

Pause schedule

PATCH

\`/v1/qstash/schedules/:id/resume\`

Resume schedule

#### Cron Format

[Section titled “Cron Format”](#cron-format)

Standard 5-field cron expressions:

\`\`\`
┌─── minute (0-59)│ ┌─── hour (0-23)│ │ ┌─── day of month (1-31)│ │ │ ┌─── month (1-12)│ │ │ │ ┌─── day of week (0-6, Sunday=0)* * * * *
\`\`\`

Example

Description

\`* * * * *\`

Every minute

\`0 * * * *\`

Every hour

\`0 9 * * *\`

Daily at 9 AM

\`0 9 * * 1-5\`

Weekdays at 9 AM

\`0 0 1 * *\`

First of every month

* * *

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — destination must be a valid URL, batch body must be a non-empty array

402

Payment required — ensure you’re using the Aporto SDK

429

Rate limit exceeded

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://upstash.services.aporto.ai/v1/qstash";
async function processOrder(orderId: string) {  // Fire-and-forget: notify the fulfillment service  await aportoFetch(    \`\${baseUrl}/publish/https://api.example.com/fulfillment\`,    {      method: "POST",      headers: { "Content-Type": "application/json" },      body: JSON.stringify({ orderId, action: "ship" }),    }  );
  // Ordered queue: send confirmation emails sequentially  await aportoFetch(    \`\${baseUrl}/enqueue/email-queue/https://api.example.com/send-email\`,    {      method: "POST",      headers: { "Content-Type": "application/json" },      body: JSON.stringify({ orderId, template: "order-confirmation" }),    }  );
  // Batch: notify multiple services at once  await aportoFetch(\`\${baseUrl}/batch\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify([      {        destination: "https://api.example.com/analytics",        headers: { "Content-Type": "application/json" },        body: JSON.stringify({ event: "order.completed", orderId }),      },      {        destination: "https://api.example.com/inventory",        headers: { "Content-Type": "application/json" },        body: JSON.stringify({ action: "decrement", orderId }),      },    ]),  });
  console.log(\`Order \${orderId} processing dispatched\`);}
await processOrder("ord_456");
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Cost

Publish (per message)

\$0.00001

Enqueue (per message)

\$0.00001

Batch (per message in array)

\$0.00001

Schedule (per trigger)

\$0.00001

Management (get, list, delete, pause, resume)

\$0.001

Using Python?

See [Service Proxy](/service-proxy) for REST API access without the Node.js SDK.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
