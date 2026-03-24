"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Aporto provides four database types: **Redis** for key-value storage, **Vector** for similarity search, **Search** for full-text search with auto-embedding, and **Postgres** for relational databases. Redis, Vector, and Search are backed by Upstash; Postgres is backed by Neon.

All database tools accept an optional \`agentName\` parameter for [spend attribution](/integration/mcp-servers/setup#agentname-pattern).

* * *

## Redis

[Section titled “Redis”](#redis)

Key-value storage with full Redis command support. Databases are ephemeral with configurable TTL.

### \`aporto_redis_create\`

[Section titled “aporto\_redis\_create”](#aporto_redis_create)

Create an Upstash Redis database. Returns the database URL for executing commands. Databases expire after the specified TTL.

\`name\` string required

Database name (1–128 chars)

\`region\` string default: us-east-1

Region

\`ttl\` string

Time-to-live (e.g. \`"1h"\`, \`"24h"\`, \`"7d"\`)

### \`aporto_redis_list\`

[Section titled “aporto\_redis\_list”](#aporto_redis_list)

List all Redis databases for the current account. Returns database IDs and URLs.

This tool takes no required parameters.

### \`aporto_redis_delete\`

[Section titled “aporto\_redis\_delete”](#aporto_redis_delete)

Delete a Redis database by ID. This permanently destroys the database and all its data.

\`id\` string required

Database ID to delete (e.g. \`"rds_abc123"\`)

### \`aporto_redis_update\`

[Section titled “aporto\_redis\_update”](#aporto_redis_update)

Update a Redis database — rename it or extend its expiry. Use to keep a database alive before it expires.

\`id\` string required

Database ID (e.g. \`"rds_abc123"\`)

\`name\` string

New name for the database (1–128 chars)

\`expiresAt\` string

New expiry as ISO 8601 timestamp (must be in the future)

### \`aporto_redis_create_fixed\`

[Section titled “aporto\_redis\_create\_fixed”](#aporto_redis_create_fixed)

Create a fixed-capacity Upstash Redis database. Returns direct Upstash credentials (endpoint, restToken, readOnlyRestToken). Charges upfront based on plan tier and TTL duration.

Plans: \`fixed_250mb\` (\$10/mo), \`fixed_1gb\` (\$20/mo), \`fixed_5gb\` (\$100/mo), \`fixed_10gb\` (\$200/mo), \`fixed_50gb\` (\$400/mo), \`fixed_100gb\` (\$800/mo), \`fixed_500gb\` (\$1500/mo).

\`name\` string required

Database name (1–128 chars)

\`plan\` enum required

Capacity plan tier: \`fixed_250mb\`, \`fixed_1gb\`, \`fixed_5gb\`, \`fixed_10gb\`, \`fixed_50gb\`, \`fixed_100gb\`, \`fixed_500gb\`

\`ttl\` string required

Required lifetime (e.g. \`"1d"\`, \`"7d"\`, \`"30d"\`). Charged upfront for this duration.

### \`aporto_redis_command\`

[Section titled “aporto\_redis\_command”](#aporto_redis_command)

Execute Redis commands against a database. Pass the database URL (from \`aporto_redis_create\`/\`aporto_redis_list\`) and a command array. Supports pipelines by passing an array of command arrays.

\`url\` string required

Database URL from \`aporto_redis_create\` or \`aporto_redis_list\`

\`command\` string\[\]

Redis command as array (e.g. \`["SET", "key", "value"]\`). Required unless \`pipeline\` is provided.

\`pipeline\` string\[\]\[\]

Pipeline: array of command arrays for batch execution

* * *

## Vector

[Section titled “Vector”](#vector)

Similarity search with vector embeddings. Create indexes, upsert vectors, and query by similarity.

### \`aporto_vector_create\`

[Section titled “aporto\_vector\_create”](#aporto_vector_create)

Create an Upstash Vector index for similarity search. Returns the index URL for data operations. Choose dimensions and similarity function based on your embedding model.

\`name\` string required

Index name (1–128 chars)

\`region\` string default: us-east-1

Region

\`dimensions\` number default: 1536

Vector dimensions (1–10000, default: 1536 for OpenAI)

\`similarityFunction\` enum default: cosine

Similarity function: \`cosine\`, \`euclidean\`, \`dotProduct\`

\`ttl\` string

Time-to-live (e.g. \`"1h"\`, \`"24h"\`, \`"7d"\`)

### \`aporto_vector_list\`

[Section titled “aporto\_vector\_list”](#aporto_vector_list)

List all Vector indexes for the current account.

This tool takes no required parameters.

### \`aporto_vector_delete\`

[Section titled “aporto\_vector\_delete”](#aporto_vector_delete)

Delete a Vector index by ID. This permanently destroys the index and all its data.

\`id\` string required

Index ID to delete (e.g. \`"vec_abc123"\`)

### \`aporto_vector_update\`

[Section titled “aporto\_vector\_update”](#aporto_vector_update)

Update a Vector index — rename it or extend its expiry. Use to keep an index alive before it expires.

\`id\` string required

Index ID (e.g. \`"vec_abc123"\`)

\`name\` string

New name for the index (1–128 chars)

\`expiresAt\` string

New expiry as ISO 8601 timestamp (must be in the future)

### \`aporto_vector_upsert\`

[Section titled “aporto\_vector\_upsert”](#aporto_vector_upsert)

Upsert vectors into an Upstash Vector index. Pass the index URL and an array of vectors with IDs, values, and optional metadata.

\`url\` string required

Index URL from \`aporto_vector_create\` or \`aporto_vector_list\`

\`namespace\` string default: default

Namespace to upsert into

\`vectors\` object\[\] required

Array of vectors to upsert. Each vector: \`{ id: string, vector?: number[], data?: string, metadata?: object }\`

### \`aporto_vector_query\`

[Section titled “aporto\_vector\_query”](#aporto_vector_query)

Query an Upstash Vector index for similar vectors. Returns ranked results with scores.

\`url\` string required

Index URL from \`aporto_vector_create\` or \`aporto_vector_list\`

\`namespace\` string default: default

Namespace to query

\`vector\` number\[\]

Query vector values (provide this or \`data\`)

\`data\` string

Query text for auto-embedding (alternative to \`vector\`)

\`topK\` number default: 10

Number of results to return (1–1000)

\`includeMetadata\` boolean default: true

Include metadata in results

\`includeData\` boolean

Include stored data in results

\`filter\` string

Metadata filter expression

* * *

## Search

[Section titled “Search”](#search)

Full-text search with auto-embedding. Create indexes, upsert documents, and query with optional reranking.

### \`aporto_searchindex_create\`

[Section titled “aporto\_searchindex\_create”](#aporto_searchindex_create)

Create an Upstash Search index for full-text search with auto-embedding. Returns the index URL for data operations.

\`name\` string required

Index name (1–128 chars)

\`region\` string default: us-central1

Region

\`ttl\` string

Time-to-live (e.g. \`"1h"\`, \`"24h"\`, \`"7d"\`)

### \`aporto_searchindex_list\`

[Section titled “aporto\_searchindex\_list”](#aporto_searchindex_list)

List all Search indexes for the current account.

This tool takes no required parameters.

### \`aporto_searchindex_delete\`

[Section titled “aporto\_searchindex\_delete”](#aporto_searchindex_delete)

Delete a Search index by ID. This permanently destroys the index and all its data.

\`id\` string required

Index ID to delete (e.g. \`"srch_abc123"\`)

### \`aporto_searchindex_update\`

[Section titled “aporto\_searchindex\_update”](#aporto_searchindex_update)

Update a Search index — rename it or extend its expiry. Use to keep an index alive before it expires.

\`id\` string required

Index ID (e.g. \`"srch_abc123"\`)

\`name\` string

New name for the index (1–128 chars)

\`expiresAt\` string

New expiry as ISO 8601 timestamp (must be in the future)

### \`aporto_searchindex_upsert\`

[Section titled “aporto\_searchindex\_upsert”](#aporto_searchindex_upsert)

Upsert documents into an Upstash Search index. Documents are auto-embedded for semantic search.

\`url\` string required

Index URL from \`aporto_searchindex_create\` or \`aporto_searchindex_list\`

\`indexName\` string required

Search index name to upsert into (e.g. \`"articles"\`, \`"default"\`)

\`documents\` object\[\] required

Array of documents to upsert. Each document: \`{ id: string, content: object, metadata?: object }\`

### \`aporto_searchindex_query\`

[Section titled “aporto\_searchindex\_query”](#aporto_searchindex_query)

Search an Upstash Search index. Supports text queries with optional reranking for improved relevance.

\`url\` string required

Index URL from \`aporto_searchindex_create\` or \`aporto_searchindex_list\`

\`indexName\` string required

Search index name to query (e.g. \`"articles"\`, \`"default"\`)

\`query\` string required

Search query text

\`limit\` number default: 5

Number of results to return (1–1000)

\`reranking\` boolean

Enable reranking for improved relevance (additional cost)

\`filter\` string

Metadata filter expression

* * *

## Postgres

[Section titled “Postgres”](#postgres)

Ephemeral Neon Postgres databases with specified lifetimes. Returns connection credentials for direct SQL access.

### \`aporto_database_create\`

[Section titled “aporto\_database\_create”](#aporto_database_create)

Provision an ephemeral Neon Postgres database with a specified lifetime. Returns connection credentials once provisioning completes. Use \`aporto_database_price\` to estimate cost before creating.

\`duration\` enum required

Database lifetime: \`15m\`, \`1h\`, \`4h\`, \`24h\`, \`7d\`

\`handle\` string

Stable LLM-friendly handle for lookups (lowercase alphanumeric + hyphens, 3–63 chars, e.g. \`"analytics-db"\`)

\`name\` string

Human-readable name for the database (max 100 chars)

\`description\` string

What this database is for — helps identify it in future sessions (max 500 chars)

\`region\` string default: aws-us-east-1

Neon region

\`pgVersion\` number default: 17

PostgreSQL version: 15, 16, or 17

### \`aporto_database_price\`

[Section titled “aporto\_database\_price”](#aporto_database_price)

Get the price estimate for creating a Neon Postgres database. **Free endpoint** — no payment required. Use before \`aporto_database_create\` to check costs.

\`duration\` enum required

Database lifetime to get price for: \`15m\`, \`1h\`, \`4h\`, \`24h\`, \`7d\`

### \`aporto_database_list\`

[Section titled “aporto\_database\_list”](#aporto_database_list)

List all your active and provisioning Neon Postgres databases, including connection URIs. Use \`aporto_database_get\` to retrieve a specific database by ID or handle.

This tool takes no required parameters.

### \`aporto_database_get\`

[Section titled “aporto\_database\_get”](#aporto_database_get)

Get details and connection URI for a specific Neon Postgres database. Accepts either a database ID or a handle.

\`id\` string required

Database ID (\`ndb_xxx\`) or handle (e.g. \`"analytics-db"\`)

### \`aporto_database_delete\`

[Section titled “aporto\_database\_delete”](#aporto_database_delete)

Delete a Neon Postgres database and its underlying project. Accepts either a database ID or a handle. This action is irreversible.

\`id\` string required

Database ID (\`ndb_xxx\`) or handle (e.g. \`"analytics-db"\`)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
