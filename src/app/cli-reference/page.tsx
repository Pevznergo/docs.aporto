"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Complete reference for the \`aporto\` CLI included in the [\`@aporto-tech/sdk\`](https://www.npmjs.com/package/@aporto-tech/sdk) package.

## Installation

\`\`\`bash
npm install -g @aporto-tech/sdk
export APORTO_API_KEY="sk-live-your_key_here"
\`\`\`

---

## aporto discover

Search 1000+ skills by natural language intent.

\`\`\`bash
aporto discover <intent> [flags]
\`\`\`

### Flags

| Flag | Description | Example |
|------|-------------|---------|
| \`--category <value>\` | Filter by skill category | \`--category media/image\` |
| \`--capability <value>\` | Filter by capability type | \`--capability generate\` |
| \`--page <n>\` | Pagination offset (5 results per page, default: 0) | \`--page 2\` |
| \`--json\` | Output as JSON (for scripts and AI agents) | |

### Examples

\`\`\`bash
# Search for image generation skills
aporto discover "generate image"

# Output:
# 4    Image Generation              media/image    $0.0040/call
# 96   Image Generation Nano Banana  media/image    $0.0400/call
# 67   Image Generation Recraft      media/image    $0.0200/call

# Filter by category
aporto discover "scrape website" --category data/scraping

# Get structured output for AI agents
aporto discover "text to speech" --json
\`\`\`

### Categories

Common categories: \`media/image\`, \`media/audio\`, \`media/video\`, \`search/web\`, \`data/scraping\`, \`llm/chat\`, \`communication/sms\`, \`verification/email\`.

---

## aporto run

Execute a skill by ID or natural language intent.

\`\`\`bash
aporto run <skillId-or-intent> [flags]
\`\`\`

### Flags

| Flag | Description | Example |
|------|-------------|---------|
| \`--param key=value\` | Set a parameter (repeatable) | \`--param prompt="a cat"\` |
| \`--file key=path\` | Attach a local file (repeatable, base64-encoded) | \`--file image=./photo.jpg\` |
| \`--params <file.json>\` | Load all parameters from a JSON file | \`--params input.json\` |
| \`--provider <hint>\` | Provider preference (name or \`auto\`) | \`--provider fal\` |
| \`--wait\` | Wait for execution to complete | |
| \`--no-wait\` | Return immediately with runId | |
| \`--max-wait <seconds>\` | Max wait time (default: 300) | \`--max-wait 60\` |
| \`--session <id>\` | Session ID for retry deduplication | \`--session my-session-1\` |
| \`--json\` | Output as JSON | |

### Examples

\`\`\`bash
# Run by skill ID
aporto run 4 --param prompt="a cat on the moon" --wait

# Output:
# status: succeeded
# skill: Image Generation
# provider: fal-flux-schnell
# costUSD: 0.004
# artifact: https://storage.aporto.tech/...

# Run by intent (auto-discovery + execution)
aporto run "generate product video" \\
  --param prompt="clean product launch teaser" \\
  --provider auto \\
  --wait

# Attach a local file
aporto run 42 \\
  --file image=./product.jpg \\
  --param prompt="Remove background and enhance" \\
  --wait

# Load complex params from JSON file
aporto run 17 --params linkedin-params.json --wait --json

# Get JSON output for scripting
aporto run 4 --param prompt="sunset" --wait --json
\`\`\`

### ElevenLabs voice selection

ElevenLabs text-to-speech uses \`voice_id\` as a normal skill parameter. The \`--provider\` flag only selects the provider; it does not select a voice.

\`\`\`bash
# Discover the text-to-speech skill
aporto discover "text to speech elevenlabs" --json

# List available ElevenLabs voices
aporto run "list elevenlabs voices" --wait --json

# Generate speech with an explicit voice
aporto run 5 \\
  --param text="Hello! Welcome to Aporto." \\
  --param voice_id="21m00Tcm4TlvDq8ikWAM" \\
  --param model_id="eleven_multilingual_v2" \\
  --wait
\`\`\`

If \`voice_id\` is omitted, Aporto uses Rachel: \`21m00Tcm4TlvDq8ikWAM\`.

### How \`--file\` works

The \`--file\` flag reads a local file, base64-encodes it, and sends it as a parameter with metadata:

\`\`\`bash
# These are equivalent:
aporto run 42 --file image=./photo.jpg --param prompt="enhance"

# The skill receives:
# { image: { _file: true, name: "photo.jpg", mimeType: "image/jpeg", data: "base64..." }, prompt: "enhance" }
\`\`\`

Supported formats: JPEG, PNG, GIF, WebP, SVG, MP3, WAV, OGG, MP4, WebM, MOV, PDF, JSON, TXT, CSV.

### How \`--params\` works

\`\`\`bash
# Create a params file
echo '{"profileUrls": ["https://linkedin.com/in/example"], "fields": ["name", "title"]}' > params.json

# Pass it to a skill
aporto run 17 --params params.json --wait
\`\`\`

\`--param\` flags override values from \`--params\` file.

---

## aporto runs get

Check the status of a running or completed skill execution.

\`\`\`bash
aporto runs get <runId> [--json]
\`\`\`

### Example

\`\`\`bash
aporto runs get skill-run-abc123 --json
\`\`\`

---

## aporto runs wait

Poll a run until completion or timeout.

\`\`\`bash
aporto runs wait <runId> [flags]
\`\`\`

### Flags

| Flag | Description | Default |
|------|-------------|---------|
| \`--max-wait <seconds>\` | Max wait per poll cycle | 30 |
| \`--timeout <seconds>\` | Total timeout | 300 |
| \`--interval <seconds>\` | Poll interval | 30 |
| \`--json\` | Output as JSON | |

### Example

\`\`\`bash
# Start a skill without waiting
aporto run 76 --param prompt="generate video" --no-wait --json
# {"runId": "skill-run-xyz", "status": "running", ...}

# Then poll for completion
aporto runs wait skill-run-xyz --timeout 600 --interval 10 --json
\`\`\`

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| \`APORTO_API_KEY\` | Yes | Your API key from [app.aporto.tech/settings](https://app.aporto.tech/settings) |
| \`APORTO_BASE_URL\` | No | Override base URL (default: \`https://app.aporto.tech\`) |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Skill execution failed, or invalid arguments |

---

## Tips for AI Agents

- Always use \`--json\` for structured, parseable output
- Use \`--wait\` to get the final result in one call
- Use \`aporto discover "..." --json\` to find the right skill before running
- Chain discover + run: find the skill ID, then execute it
- Use \`--session\` to enable automatic retry routing on provider failures

\`\`\`bash
# Agent workflow: discover → run → get result
SKILL_ID=$(aporto discover "scrape website" --json | jq '.skills[0].skillId')
aporto run $SKILL_ID --param url="https://example.com" --wait --json
\`\`\``;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
