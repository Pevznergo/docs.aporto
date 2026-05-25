"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `# Aporto Coworker for Telegram

Aporto Coworker is the Aporto skill network inside Telegram. Use it in a direct chat for personal work, or add it to a group so a team can request AI work from the same thread.

[Open the Telegram bot](https://t.me/aporto_bot)

Use it when a task starts as a message:

- ask Sonnet, GPT, Gemini, Codex, and other LLM skills
- convert files, merge PDFs, or process documents
- generate images, videos, voiceovers, and sound
- search the web and summarize results
- scrape leads, listings, posts, reviews, and company data
- run async jobs and receive files back when they finish

> The bot is best for team workflows: add it to a Telegram group, mention the bot, and let everyone see the request, status, and final artifact in one place.

## Quick Start

1. Open [@aporto_bot](https://t.me/aporto_bot) in Telegram.
2. Send a task in plain language.
3. If the bot finds several relevant skills, reply with a number or use \`/more\` to see the next 10.
4. For paid or higher-volume usage, connect your Aporto account from [Settings → Integrations](https://app.aporto.tech/settings?tab=integrations).

\`\`\`text
convert this JPG to PDF
\`\`\`

\`\`\`text
what LLM models are available?
\`\`\`

\`\`\`text
use Claude Sonnet 4.6 to summarize this file
\`\`\`

\`\`\`text
find 50 AI agencies in London and return a CSV
\`\`\`

## Direct Chat vs Group Chat

| Mode | Best for | How it behaves |
| --- | --- | --- |
| Direct chat | Personal tasks, quick tests, private files | Send a message or file directly to the bot. |
| Group chat | Team research, shared lead lists, approvals, async media jobs | Add the bot to a group and mention it when you want Aporto to work. Results return in the same group. |

Group chat is the main coworker workflow. It keeps requests, clarifications, selected skills, and final files visible to everyone.

## How Skill Discovery Works

The bot does not expose a fixed menu. It routes your request through Aporto discovery:

1. It reads your message, attachments, file type, and any provider/model hints.
2. It searches the Aporto skill catalog.
3. If one skill is clearly right, it runs it.
4. If several skills match, it shows up to 10 options.
5. Use \`/more\` to show the next 10 relevant skills.

Examples:

| Request | Expected routing |
| --- | --- |
| \`jpg to pdf\` with a JPG attached | JPG to PDF Converter |
| \`what AI models do you have?\` | LLM model skill list: Sonnet, GPT, Gemini, Codex, and related skills |
| \`text to speech kie provider - hello\` | ElevenLabs Text to Speech with KIE provider hint |
| \`find companies from this niche and make a CSV\` | Search, scraping, or lead extraction skills |

## Asking About LLM Models

Users can ask the bot what model skills are available:

\`\`\`text
what LLM models do you have?
\`\`\`

\`\`\`text
какие ИИ модели доступны?
\`\`\`

\`\`\`text
show me Sonnet GPT Gemini options
\`\`\`

The bot returns model skills such as:

- Claude Sonnet chat skills
- Claude Opus and Haiku chat skills
- GPT chat and response skills
- Gemini chat skills
- Codex coding skills

To run a specific model, name it in the request:

\`\`\`text
use Sonnet 4.6 to rewrite this update for investors
\`\`\`

\`\`\`text
use Gemini 3 Pro to compare these options
\`\`\`

## Files and Artifacts

You can attach files to Telegram messages. The bot uploads the file to Aporto storage, passes the file URL to the selected skill, and returns the resulting file when the skill finishes.

Supported workflows include:

- image to PDF
- PDF to image
- merge, split, rotate, compress, and redact PDF files
- speech and audio generation
- generated images and videos
- CSV, JSON, markdown, and document outputs

When a skill returns a file, the bot sends the file directly in Telegram whenever possible. The run record also stores a JSON audit artifact with the request, provider, cost, result metadata, and expiration date.

## Commands

| Command | Purpose |
| --- | --- |
| \`/start\` or \`/help\` | Show basic usage and account connection help. |
| \`/choose\` | Reopen the current skill selection list. |
| \`/more\` | Show the next 10 relevant skills. |
| \`/dashboard\` | Open the Aporto dashboard. |
| \`/quiet on\` | Reduce service messages and send only the result when possible. |
| \`/quiet off\` or \`/verbose\` | Show status and cost messages again. |
| \`/link CODE\` | Link Telegram to an Aporto account. |
| \`/unlink\` | Disconnect Telegram from the linked Aporto account. |

Retry buttons only appear when a skill returns an error.

## Connect an Aporto Account

The bot can be tested before registration. For account-based usage:

1. Open [Aporto Settings → Integrations](https://app.aporto.tech/settings?tab=integrations).
2. Create a Telegram link code.
3. Send the bot:

\`\`\`text
/link YOUR_CODE
\`\`\`

After linking, Telegram runs use your Aporto account balance and appear in your dashboard activity.

## Pricing and Trial

- You can test the bot with 2 requests before registration.
- After creating an account, use the $3 test balance to try real provider skills.
- Skill runs are metered by the selected provider. The bot shows costs unless quiet mode is enabled.
- Some skills are free while they are backed by Aporto-hosted infrastructure or promotional providers.

## Team Workflow Examples

### Research

\`\`\`text
@aporto find 30 cybersecurity startups in Germany, include website, LinkedIn, founder names, and return a CSV
\`\`\`

### Documents

\`\`\`text
@aporto merge these PDFs and compress the result
\`\`\`

### LLM work

\`\`\`text
@aporto use Claude Sonnet 4.6 to turn this meeting transcript into decisions, risks, and next steps
\`\`\`

### Media

\`\`\`text
@aporto generate a short product video concept from this landing page copy
\`\`\`

### Audio

\`\`\`text
@aporto text to speech kie provider - Welcome to the weekly product review
\`\`\`

## Troubleshooting

| Problem | What to do |
| --- | --- |
| The bot shows the wrong skills | Add the format, provider, or category: \`PDF to PNG\`, \`KIE provider\`, \`Sonnet\`, \`Gemini\`, \`lead scraping\`. |
| You attached a file but nothing ran | Add an instruction or caption with the file, for example \`convert this JPG to PDF\`. |
| There are more than 10 relevant skills | Use \`/more\` to page through the next 10. |
| A result is taking a long time | Async jobs keep running. The bot sends the result when the run completes. |
| You need account billing instead of trial | Link Telegram from Settings → Integrations with \`/link CODE\`. |

## Next Steps

- [Open the Telegram bot](https://t.me/aporto_bot)
- [Connect your account](https://app.aporto.tech/settings?tab=integrations)
- [Browse skill pricing](/skill-pricing)
- [Learn how Aporto works](/how-it-works)
`;

export default function CoworkerPage() {
    return <MarkdownRenderer content={content} />;
}
