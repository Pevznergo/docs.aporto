import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `# Quick Start

## 1. Create and store a key

Create a key in [Settings → API Keys](https://app.aporto.tech/settings?tab=api-keys), then put it in your server environment:

\`\`\`bash
export APORTO_API_KEY="your-api-key"
export APORTO_MODEL="full-model-id-from-the-catalog"
\`\`\`

Use the exact model ID from [Models & Pricing](/capabilities/ai-models?tab=pricing). Availability and endpoint compatibility can change, so examples use an environment variable instead of a hard-coded model.

## 2. Send a request

\`\`\`bash
curl https://api.aporto.tech/v1/chat/completions \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"'"$APORTO_MODEL"'","messages":[{"role":"user","content":"Reply in one sentence."}]}'
\`\`\`

## OpenAI Python SDK

\`\`\`bash
pip install openai
\`\`\`

\`\`\`python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["APORTO_API_KEY"],
    base_url="https://api.aporto.tech/v1",
)

response = client.chat.completions.create(
    model=os.environ["APORTO_MODEL"],
    messages=[{"role": "user", "content": "Reply in one sentence."}],
)
print(response.choices[0].message.content)
\`\`\`

## OpenAI JavaScript SDK

\`\`\`bash
npm install openai
\`\`\`

\`\`\`javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.APORTO_API_KEY,
  baseURL: "https://api.aporto.tech/v1",
});

const response = await client.chat.completions.create({
  model: process.env.APORTO_MODEL,
  messages: [{ role: "user", content: "Reply in one sentence." }],
});
console.log(response.choices[0].message.content);
\`\`\`

## Next

- [Endpoints and model compatibility](/capabilities/ai-models?tab=endpoints)
- [Streaming, usage, errors, and rate limits](/api-reference)
- [Live model prices and RUB calculation](/billing)`;

export default function QuickStartPage() {
    return <MarkdownRenderer content={content} />;
}
