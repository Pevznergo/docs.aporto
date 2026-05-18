"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Connect your AI coding tool to Aporto's MCP router for access to the AI skill network: 1000+ skills, multiple providers, and metered paid execution through one API key.

## Setup

Set your API key first:

\`\`\`bash
export APORTO_API_KEY="sk-live-your_key_here"
\`\`\`

## Claude Code CLI

Add Aporto as a remote HTTP MCP server:

\`\`\`bash
claude mcp add --transport http aporto https://app.aporto.tech/api/mcp \\
  --header "Authorization: Bearer $APORTO_API_KEY"
\`\`\`

Verify the server is registered:

\`\`\`bash
claude mcp get aporto
\`\`\`

Inside Claude Code, run \`/mcp\` to confirm Aporto is connected and tools are visible.

## Claude Code project config

For a checked-in project config, create \`.mcp.json\` in the project root:

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "type": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

Claude Code expands \`\${APORTO_API_KEY}\` in \`.mcp.json\`. Use \`--scope user\` with \`claude mcp add\` instead if you want Aporto available across projects without checking in config.

## Codex CLI

\`\`\`bash
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
\`\`\`

Verify:

\`\`\`bash
codex mcp get aporto
\`\`\`

## Cursor

For project-specific tools, create \`.cursor/mcp.json\` in the project root. For global tools, create \`~/.cursor/mcp.json\`.

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${env:APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

Cursor CLI uses the same config as the editor. Verify:

\`\`\`bash
cursor-agent mcp list
cursor-agent mcp list-tools aporto
\`\`\`

## Windsurf

Open the MCP configuration panel in Windsurf, or edit \`~/.codeium/windsurf/mcp_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "serverUrl": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${env:APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

Refresh MCP servers in Windsurf after saving the file.

## OpenClaw

OpenClaw stores MCP server definitions under its own config. Register Aporto with:

\`\`\`bash
openclaw mcp set aporto '{"url":"https://app.aporto.tech/api/mcp","headers":{"Authorization":"Bearer \${env:APORTO_API_KEY}"}}'
\`\`\`

Verify the stored definition:

\`\`\`bash
openclaw mcp show aporto --json
\`\`\`

OpenClaw's \`mcp set\` command stores the definition; runtime adapters decide which transports and interpolation patterns they support. If your runtime does not expand \`\${env:APORTO_API_KEY}\`, paste the API key directly in the Authorization header.

## Generic MCP JSON

Use this shape for clients that accept standard streamable HTTP MCP config:

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "type": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

If your MCP client does not expand environment variables inside JSON config, paste the API key directly in the Authorization header.

## Available Tools

| Tool | What it does | Cost |
|------|-------------|------|
| \`aporto_discover_skills\` | Find the best skills for an intent | Free |
| \`aporto_list_options\` | List valid skill options such as voices, models, languages, or styles | Free |
| \`aporto_run_skill\` | Discover, route, execute, and optionally wait for a skill result | Skill pricing |
| \`aporto_get_skill_run\` | Poll an async skill run | Free |
| \`aporto_chat\` | LLM chat completions (400+ models) | model-dependent |

## Recommended Agent Flow

1. Call \`aporto_discover_skills\` with the user's intent.
2. Select the most relevant skill and inspect required inputs.
3. Call \`aporto_list_options\` when a parameter has provider-specific choices, such as ElevenLabs \`voice_id\`.
4. Call \`aporto_run_skill\` with the skill ID and input payload.
5. Continue with \`aporto_get_skill_run\` if the run is still pending.

## Next Steps

[Skill Tools](/integration/mcp-servers/core-tools) Full parameter reference for all tools

[@aporto/core SDK](/quick-start) Use the TypeScript SDK directly when MCP is not available`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
