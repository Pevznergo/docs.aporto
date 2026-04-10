"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Connect your AI coding tool to Aporto's MCP server for direct access to web search, AI models, SMS, image generation, and TTS.

## Setup

**Claude Code — add to \`~/.claude/settings.json\`:**

\`\`\`json
{
  "mcpServers": {
    "aporto": {
      "transport": "http",
      "url": "https://app.aporto.tech/api/mcp",
      "headers": {
        "Authorization": "Bearer sk-live-your_key_here"
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
        "Authorization": "Bearer sk-live-your_key_here"
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
        "Authorization": "Bearer sk-live-your_key_here"
      }
    }
  }
}
\`\`\`

Replace \`sk-live-your_key_here\` with your API key from [dashboard settings](https://app.aporto.tech/dashboard/settings).

## Available Tools

| Tool | What it does | Cost |
|------|-------------|------|
| \`aporto_search\` | Web search via Linkup | $0.006 standard / $0.055 deep |
| \`aporto_ai_search\` | AI-powered search via You.com | $0.005 / $0.0065 research |
| \`aporto_sms_send\` | SMS/WhatsApp OTP via Prelude | $0.015/send |
| \`aporto_image_generate\` | Image generation via fal.ai | from $0.004/MP |
| \`aporto_tts_create\` | Text-to-speech via ElevenLabs | $0.24/1k chars |
| \`aporto_chat\` | LLM chat completions (400+ models) | model-dependent |

## Next Steps

[Core Tools](/integration/mcp-servers/core-tools) Full parameter reference for all tools

[@aporto/core SDK](/quick-start) Use the TypeScript SDK directly instead of MCP`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
