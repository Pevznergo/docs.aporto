"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Provision and use Redis, vector, and full-text search databases instantly — all accessible over REST, no Upstash account, no infrastructure setup, just API calls.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const mgmt = "https://upstash.services.aporto.ai";
// Step 1: Create a Redis databaseconst createRes = await aportoFetch(\`\${mgmt}/v1/redis/databases\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    name: "my-cache",    region: "us-east-1",    ttl: "1d",  }),});
const db = await createRes.json();console.log("Created:", db.id, db.url);
// Step 2: Use it via the resource URL (pipeline recommended for any real data)await aportoFetch(\`\${db.url}/pipeline\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify([["set", "my-key", "my-value"], ["get", "my-key"]]),});
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto provides a two-plane architecture for data services:

1.  **Provision a resource** — Call the management API at \`upstash.services.aporto.ai\` to create a Redis database, vector index, or search database. You get back a resource URL.
2.  **Use the resource** — Send commands to the resource URL (e.g., \`https://{id}.redis.data.aporto.ai\`). Aporto proxies requests to the underlying Upstash instance with automatic authentication.

Resources have optional TTLs (time-to-live). When a TTL expires, the resource transitions to \`expired\` status and is eventually cleaned up. You can extend a resource’s lifetime by updating its \`expiresAt\` field.

Each account can provision up to 50 resources per service (50 Redis databases, 50 vector indexes, 50 search indexes).

## Provider

[Section titled “Provider”](#provider)

Powered by [Upstash](https://upstash.com). Upstash provides serverless Redis, vector, and full-text search databases with per-request pricing and global replication.

## API Reference

[Section titled “API Reference”](#api-reference)

### Endpoints

[Section titled “Endpoints”](#endpoints)

**Management plane** (\`https://upstash.services.aporto.ai\`):

Method

Path

Description

POST

\`/v1/redis/databases\`

Create a Redis database

GET

\`/v1/redis/databases\`

List all Redis databases

GET

\`/v1/redis/databases/:id\`

Get a Redis database

PATCH

\`/v1/redis/databases/:id\`

Update a Redis database

DELETE

\`/v1/redis/databases/:id\`

Delete a Redis database

POST

\`/v1/vector/indexes\`

Create a vector index

GET

\`/v1/vector/indexes\`

List all vector indexes

GET

\`/v1/vector/indexes/:id\`

Get a vector index

PATCH

\`/v1/vector/indexes/:id\`

Update a vector index

DELETE

\`/v1/vector/indexes/:id\`

Delete a vector index

POST

\`/v1/search/indexes\`

Create a search index

GET

\`/v1/search/indexes\`

List all search indexes

GET

\`/v1/search/indexes/:id\`

Get a search index

PATCH

\`/v1/search/indexes/:id\`

Update a search index

DELETE

\`/v1/search/indexes/:id\`

Delete a search index

**Data plane** (per-resource URLs):

Host Pattern

Description

\`{id}.redis.data.aporto.ai\`

Redis commands (all paths proxied)

\`{id}.vector.data.aporto.ai\`

Vector operations (upsert, query, fetch, etc.)

\`{id}.search.data.aporto.ai\`

Search operations (upsert, search, etc.)

* * *

### Redis

[Section titled “Redis”](#redis)

#### Create Redis Database

[Section titled “Create Redis Database”](#create-redis-database)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/redis/databases\`

Parameter

Type

Required

Description

\`name\`

string

Yes

Database name (1-128 characters)

\`region\`

string

No

AWS region (default: \`us-east-1\`)

\`ttl\`

string

No

Time-to-live: \`30m\`, \`1h\`, \`1d\`, etc. Max 30 days

\`\`\`
{  "name": "my-cache",  "region": "us-east-1",  "ttl": "1d"}
\`\`\`

#### Response

[Section titled “Response”](#response)

\`\`\`
{  "id": "res_ab3k9mzxq1wp7rvnlt82",  "type": "redis",  "name": "my-cache",  "status": "provisioning",  "url": "https://res_ab3k9mzxq1wp7rvnlt82.redis.data.aporto.ai",  "region": "us-east-1",  "expiresAt": "2026-02-26T13:45:00.000Z",  "createdAt": "2026-02-25T13:45:00.000Z"}
\`\`\`

Note

Resources start in \`provisioning\` status. They transition to \`active\` within seconds. Use the resource URL from the response for all subsequent data operations.

#### Update Redis Database

[Section titled “Update Redis Database”](#update-redis-database)

**Endpoint:** \`PATCH https://upstash.services.aporto.ai/v1/redis/databases/:id\`

Parameter

Type

Required

Description

\`name\`

string

No

New name (1-128 characters)

\`expiresAt\`

string

No

New expiry (ISO 8601, must be in the future)

#### Delete Redis Database

[Section titled “Delete Redis Database”](#delete-redis-database)

**Endpoint:** \`DELETE https://upstash.services.aporto.ai/v1/redis/databases/:id\`

Returns \`204 No Content\` on success.

#### Redis Data Plane

[Section titled “Redis Data Plane”](#redis-data-plane)

Once provisioned, interact with Redis entirely over REST — no TCP connections or Redis client libraries needed. Send any [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi) command to the resource URL.

**Use \`POST /pipeline\` for most operations** — it handles any value size and lets you batch commands efficiently:

\`\`\`
// Pipeline (recommended) — works with any value sizeconst { data: results } = await client.post(\`\${db.url}/pipeline\`, [  ["set", "key1", JSON.stringify({ user: "alice", role: "admin" })],  ["set", "key2", "value2"],  ["get", "key1"],]);
// GET a keyconst { data } = await client.get(\`\${db.url}/get/my-key\`);
\`\`\`

Path-based commands have URL length limits

Path-based commands like \`/set/key/value\` encode the value in the URL. Values larger than ~4KB will fail with a \`400 Bad Request\` error. **Always use \`POST /pipeline\` with a JSON body when storing JSON objects, session state, or any structured data.**

Path-based commands are fine for tiny values (counters, flags, short strings):

\`\`\`
// Path-based — only for small valuesawait client.post(\`\${db.url}/set/my-key/my-value\`);await client.post(\`\${db.url}/incr/counter\`);
\`\`\`

* * *

### Vector

[Section titled “Vector”](#vector)

#### Create Vector Index

[Section titled “Create Vector Index”](#create-vector-index)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/vector/indexes\`

Parameter

Type

Required

Description

\`name\`

string

Yes

Index name (1-128 characters)

\`region\`

string

No

AWS region (default: \`us-east-1\`)

\`dimensions\`

number

No

Vector dimensions, 1-10000 (default: \`1536\`)

\`similarityFunction\`

string

No

\`cosine\`, \`euclidean\`, or \`dotProduct\` (default: \`cosine\`)

\`ttl\`

string

No

Time-to-live: \`30m\`, \`1h\`, \`1d\`, etc. Max 30 days

\`\`\`
{  "name": "my-embeddings",  "dimensions": 1536,  "similarityFunction": "cosine",  "ttl": "7d"}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

\`\`\`
{  "id": "res_xk7p2mwn9qr4jtbv5s01",  "type": "vector",  "name": "my-embeddings",  "status": "provisioning",  "url": "https://res_xk7p2mwn9qr4jtbv5s01.vector.data.aporto.ai",  "region": "us-east-1",  "dimensions": 1536,  "similarityFunction": "cosine",  "expiresAt": "2026-03-04T13:45:00.000Z",  "createdAt": "2026-02-25T13:45:00.000Z"}
\`\`\`

#### Vector Data Plane

[Section titled “Vector Data Plane”](#vector-data-plane)

Use the [Upstash Vector REST API](https://upstash.com/docs/vector/api/endpoints) through the resource URL:

\`\`\`
// Upsert vectorsawait client.post(\`\${index.url}/upsert\`, [  { id: "doc-1", vector: [0.1, 0.2, ...], metadata: { title: "Hello" } },  { id: "doc-2", vector: [0.3, 0.4, ...], metadata: { title: "World" } },]);
// Query similar vectorsconst { data } = await client.post(\`\${index.url}/query\`, {  vector: [0.1, 0.2, ...],  topK: 5,  includeMetadata: true,});
\`\`\`

* * *

### Search

[Section titled “Search”](#search)

#### Create Search Index

[Section titled “Create Search Index”](#create-search-index)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/search/indexes\`

Parameter

Type

Required

Description

\`name\`

string

Yes

Index name (1-128 characters)

\`region\`

string

No

\`us-central1\` or \`eu-west-1\` (default: \`us-central1\`)

\`ttl\`

string

No

Time-to-live: \`30m\`, \`1h\`, \`1d\`, etc. Max 30 days

\`\`\`
{  "name": "my-search-index",  "region": "us-central1",  "ttl": "7d"}
\`\`\`

#### Response

[Section titled “Response”](#response-2)

\`\`\`
{  "id": "res_mn4q8rvw2xp5kjtb6h93",  "type": "search",  "name": "my-search-index",  "status": "provisioning",  "url": "https://res_mn4q8rvw2xp5kjtb6h93.search.data.aporto.ai",  "region": "us-central1",  "expiresAt": "2026-03-04T13:45:00.000Z",  "createdAt": "2026-02-25T13:45:00.000Z"}
\`\`\`

#### Search Data Plane

[Section titled “Search Data Plane”](#search-data-plane)

Use the [Upstash Search REST API](https://upstash.com/docs/search) through the resource URL.

Caution

All search data plane paths require the **index name** as a path segment. Using an empty index name returns an error.

\`\`\`
// Upsert documents — content is a key-value object matching the index schemaawait client.post(\`\${searchDb.url}/upsert/\${indexName}\`, [  { id: "doc-1", content: { title: "TypeScript", text: "TypeScript is a typed superset of JavaScript" } },  { id: "doc-2", content: { title: "Rust", text: "Rust is a systems programming language" } },]);
// Searchconst { data } = await client.post(\`\${searchDb.url}/search/\${indexName}\`, {  query: "typed programming language",  topK: 5,});
\`\`\`

* * *

### Neon (PostgreSQL)

[Section titled “Neon (PostgreSQL)”](#neon-postgresql)

#### Create Database

[Section titled “Create Database”](#create-database)

**Endpoint:** \`POST https://neon.services.aporto.ai/databases\`

Provision an ephemeral PostgreSQL database with a specified lifetime.

Parameter

Type

Required

Description

\`duration\`

string

Yes

Database lifetime: \`15m\`, \`1h\`, \`4h\`, \`24h\`, or \`7d\`

\`handle\`

string

No

Stable handle for lookups (3-63 chars, lowercase alphanumeric + hyphens)

\`name\`

string

No

Human-readable name

\`description\`

string

No

Purpose description (max 500 chars)

\`region\`

string

No

Region (default: \`aws-us-east-1\`)

\`pgVersion\`

number

No

PostgreSQL version: 15, 16, or 17 (default: 17)

\`\`\`
{  "duration": "4h",  "handle": "analytics-db",  "name": "User Analytics"}
\`\`\`

#### Response

[Section titled “Response”](#response-3)

\`\`\`
{  "id": "ndb_abc123",  "handle": "analytics-db",  "name": "User Analytics",  "status": "active",  "region": "aws-us-east-1",  "pgVersion": 17,  "duration": "4h",  "connectionUri": "postgresql://user:password@host/dbname",  "expiresAt": "2026-03-01T06:00:00.000Z",  "createdAt": "2026-03-01T02:00:00.000Z"}
\`\`\`

Use the \`connectionUri\` to connect with any PostgreSQL client or ORM.

#### Price Estimate

[Section titled “Price Estimate”](#price-estimate)

**Endpoint:** \`POST https://neon.services.aporto.ai/databases/price\` (free)

Get the cost before creating a database. Accepts the same parameters as create.

#### Other Endpoints

[Section titled “Other Endpoints”](#other-endpoints)

Method

Path

Description

GET

\`/databases\`

List your databases

GET

\`/databases/:id\`

Get database by ID or handle

DELETE

\`/databases/:id\`

Delete database (irreversible)

**Base URL:** \`https://neon.services.aporto.ai\`

#### Neon Pricing

[Section titled “Neon Pricing”](#neon-pricing)

Duration

Price

15 minutes

\$0.000001

1 hour

\$0.000001

4 hours

\$0.001

24 hours

\$0.01

7 days

\$0.05

Management operations (list, get, delete): \$0.001 per request.

Powered by [Neon](https://neon.tech) — serverless Postgres with instant provisioning.

* * *

### Fixed Redis Plans

[Section titled “Fixed Redis Plans”](#fixed-redis-plans)

**Endpoint:** \`POST https://upstash.services.aporto.ai/v1/redis/databases/fixed\`

Create a fixed-capacity Redis database with direct Upstash credentials and predictable pricing.

Parameter

Type

Required

Description

\`name\`

string

Yes

Database name (1-128 characters)

\`plan\`

string

Yes

Capacity plan (see table below)

\`ttl\`

string

Yes

Time-to-live (e.g., \`1h\`, \`7d\`, \`30d\`)

\`\`\`
{  "name": "production-cache",  "plan": "fixed_1gb",  "ttl": "7d"}
\`\`\`

The response includes direct Upstash credentials (\`endpoint\`, \`restToken\`, \`readOnlyRestToken\`) — no proxy URL needed.

Need @upstash/redis typed client?

Standard pay-per-command Redis uses x402 auth via the Aporto SDK, which is **not compatible** with the \`@upstash/redis\` npm client (it expects a native Upstash REST token). If you need typed methods, auto-serialization, and pipeline helpers from \`@upstash/redis\`, use a **Fixed Redis Plan** — it returns \`restToken\` credentials that work directly with the client library.

**Standard vs Fixed Plans:**

Feature

Standard (pay-per-command)

Fixed Plan

Auth

Aporto SDK (x402)

Native Upstash \`restToken\`

\`@upstash/redis\` compatible

No

Yes

Typed methods

No (raw REST)

Yes

Pricing

Per command (\$0.000002)

Per second of capacity

Best for

Simple caching, counters

Apps needing typed client, production workloads

#### Fixed Plan Options

[Section titled “Fixed Plan Options”](#fixed-plan-options)

Plan

Capacity

Rate (per second)

~Monthly

\`fixed_250mb\`

250 MB

\$0.000004

\$10

\`fixed_1gb\`

1 GB

\$0.000008

\$20

\`fixed_5gb\`

5 GB

\$0.000039

\$100

\`fixed_10gb\`

10 GB

\$0.000077

\$200

\`fixed_50gb\`

50 GB

\$0.000154

\$400

\`fixed_100gb\`

100 GB

\$0.000309

\$800

\`fixed_500gb\`

500 GB

\$0.000579

\$1,500

Price = rate per second x TTL in seconds. Example: \`fixed_1gb\` for 7 days = \$4.67.

* * *

### Resource Status Lifecycle

[Section titled “Resource Status Lifecycle”](#resource-status-lifecycle)

All resources follow this lifecycle:

Status

Description

\`provisioning\`

Resource is being created (transitions to \`active\` within seconds)

\`active\`

Ready for use

\`expired\`

TTL has passed, pending cleanup

\`deleting\`

Deletion in progress

\`deleted\`

Fully removed

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — check parameter formats (name length, TTL format, dimensions range)

402

Payment required — ensure you’re using the Aporto SDK

404

Resource not found or not owned by your account

409

Resource is not in a valid state for the operation (e.g., deleting a non-active resource)

410

Resource has expired (data plane only)

422

Resource limit exceeded — maximum 50 per service per account

429

Rate limit exceeded

502

Upstream provisioning error from Upstash

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const mgmt = "https://upstash.services.aporto.ai";
async function cacheWorkflow() {  // Create a Redis database with 1-hour TTL  const createRes = await aportoFetch(\`\${mgmt}/v1/redis/databases\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({ name: "session-cache", ttl: "1h" }),  });
  const db = await createRes.json();  console.log(\`Redis ready at \${db.url}\`);
  // Store session data  await aportoFetch(\`\${db.url}/set/session:abc/active\`, { method: "POST" });  await aportoFetch(\`\${db.url}/expire/session:abc/3600\`, { method: "POST" });
  // Read it back  const getRes = await aportoFetch(\`\${db.url}/get/session:abc\`);  const value = await getRes.json();  console.log("Session:", value.result); // "active"
  // List all databases  const listRes = await aportoFetch(\`\${mgmt}/v1/redis/databases\`);  const list = await listRes.json();  console.log(\`Total databases: \${list.databases.length}\`);
  // Clean up  await aportoFetch(\`\${mgmt}/v1/redis/databases/\${db.id}\`, { method: "DELETE" });}
await cacheWorkflow();
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Cost

Redis command

\$0.000002 per command

Redis pipeline

\$0.000002 per command in batch

Vector upsert

\$0.000004 per vector

Vector query/fetch/other

\$0.000004 per request

Search upsert

\$0.00005 per request

Search query

\$0.00005 per request

Search query with reranking

\$0.00105 per request

Management operations (create, list, get, update, delete)

Nominal

Using Python?

See [Service Proxy](/service-proxy) for REST API access without the Node.js SDK.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
