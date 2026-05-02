"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Connect your AI coding tool to Aporto's MCP router for access to the AI skill network: 1000+ skills, multiple providers, and metered paid execution through one API key.

## Setup

Set your API key:

\`\`\`bash
export APORTO_API_KEY="sk-live-your_key_here"
\`\`\`

**Codex CLI:**

\`\`\`bash
codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
\`\`\`

**Claude Code — add to \`~/.claude/settings.json\`:**

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "transport": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

**Cursor — add to \`.cursor/mcp.json\`:**

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "transport": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer \${APORTO_API_KEY}"
      }
    }
  }
}
\`\`\`

**Windsurf — add to \`.windsurf/mcp.json\`:**

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "transport": "http",
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
| \`aporto_execute_skill\` | Execute a selected skill through provider routing | Skill pricing |
| \`aporto_search\` | Web search via Linkup | $0.006 standard / $0.055 deep |
| \`aporto_ai_search\` | AI-powered search via You.com | $0.005 / $0.0065 research |
| \`aporto_sms_send\` | SMS/WhatsApp OTP via Prelude | $0.015/send |
| \`aporto_image_generate\` | Image generation via fal.ai | from $0.004/MP |
| \`aporto_tts_create\` | Text-to-speech via ElevenLabs | $0.24/1k chars |
| \`aporto_chat\` | LLM chat completions (400+ models) | model-dependent |

## Recommended Agent Flow

1. Call \`aporto_discover_skills\` with the user's intent.
2. Select the most relevant skill and inspect required inputs.
3. Call \`aporto_execute_skill\` with the skill ID and input payload.
4. Use the normalized result in your agent workflow.

## Next Steps

[Skill Tools](/integration/mcp-servers/core-tools) Full parameter reference for all tools

[@aporto/core SDK](/quick-start) Use the TypeScript SDK directly when MCP is not available`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
