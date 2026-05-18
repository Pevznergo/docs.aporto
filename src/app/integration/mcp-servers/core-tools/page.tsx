"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Reference for the core tools available through Aporto's MCP router. For setup instructions, see [Setup](/integration/mcp-servers/setup).

---

## Skill Network

### \`aporto_discover_skills\`

Find skills that match a user intent. Use this before execution when you do not know the exact skill ID or input schema.

\`query\` string required — Natural-language description of what the user wants done

\`category\` string — Optional category filter such as \`scraping/social\`, \`search\`, \`media\`, or \`communication\`

\`page\` number — Page index for pagination

Returns matching skills, IDs, categories, capabilities, and \`paramsSchema\`.

---

### \`aporto_list_options\`

List valid provider-specific options for a skill, such as ElevenLabs voices, model IDs, languages, or styles.

\`skillId\` number required — Skill ID returned by discovery

\`optionType\` string required — Option type, such as \`voice\`, \`model\`, \`language\`, or \`style\`

\`query\` string — Optional natural-language filter, such as \`female british\` or \`fast model\`

\`page\` number — Page index for pagination

Example: call \`aporto_list_options\` with \`skillId=5\`, \`optionType="voice"\`, and \`query="female british"\` before passing \`voice_id\` to text-to-speech.

---

### \`aporto_run_skill\`

Run a skill through discovery, provider selection, execution, artifact storage, and optional polling. This is the default execution tool for agents.

\`intent\` string required — Plain-language task intent

\`params\` object — Payload matching the selected skill schema

\`skillId\` number — Optional exact skill ID from discovery

\`providerHint\` string — Optional provider or model hint, such as \`nano banana\`, \`sora 2\`, or an Apify actor name

\`waitForResult\` boolean — Whether Aporto should wait for async completion within the request

\`maxWaitSeconds\` number — Maximum server-side wait time

---

### \`aporto_get_skill_run\`

Fetch or continue polling a run returned by \`aporto_run_skill\`.

\`runId\` string required — Run ID returned by \`aporto_run_skill\`

\`waitForResult\` boolean — Whether Aporto should wait for completion before returning

\`maxWaitSeconds\` number — Maximum server-side wait time

---

### \`aporto_execute_skill\`

Low-level execution escape hatch. It may return provider-specific async task IDs and does not provide the full run lifecycle. Prefer \`aporto_run_skill\` for agent workflows.

\`skillId\` number required — Skill ID returned by discovery

\`params\` object required — Payload matching the selected skill schema

\`sessionId\` string — Optional session ID for retry routing

---

## AI Models

### \`aporto_chat\`

Call any of 400+ AI models through Aporto's LLM gateway.

\`model\` string required — Model name, e.g. \`"openai/gpt-4o-mini"\`, \`"anthropic/claude-haiku-4-5-20251001"\`

\`messages\` array required — Chat messages: \`[{ role: "user", content: "Hello" }]\`

\`max_tokens\` number — Max tokens to generate

\`temperature\` number — Sampling temperature 0–2`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
