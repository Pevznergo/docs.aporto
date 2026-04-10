"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Get up and running with Aporto in under 5 minutes.

1.  ## Get an API Key

    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.

    \`\`\`bash
    export APORTO_API_KEY="sk-live-your_key_here"
    \`\`\`

2.  ## Install the SDK

    \`\`\`bash
    npm install @aporto/core
    \`\`\`

3.  ## Make Your First Request

    **Call an AI model:**

    \`\`\`typescript
    import AportoClient from "@aporto/core";

    const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "Hello!" }],
    });

    console.log(response.choices[0].message.content);
    \`\`\`

    **Or use the OpenAI SDK** — just point \`baseURL\` at Aporto's gateway:

    \`\`\`typescript
    import OpenAI from "openai";

    const client = new OpenAI({
      apiKey: process.env.APORTO_API_KEY!,
      baseURL: "https://api.aporto.tech/v1",
    });
    \`\`\`

    **Or use curl:**

    \`\`\`bash
    curl https://api.aporto.tech/v1/chat/completions \\
      -H "Authorization: Bearer $APORTO_API_KEY" \\
      -H "Content-Type: application/json" \\
      -d '{
        "model": "openai/gpt-4o-mini",
        "messages": [{ "role": "user", "content": "Hello!" }]
      }'
    \`\`\`

## Billing

Aporto uses a **prepaid balance** model. Top up your account at [app.aporto.tech](https://app.aporto.tech) — credit card (Stripe) gives you a **30% bonus** on your balance. Crypto is also accepted via NowPayments.

Each API call deducts the cost from your balance. No subscriptions, no minimums.

## Next Steps

[Using Services](/using-services) Send an SMS, search the web, generate images, and more.

[Browse Capabilities](/capabilities) See all available services and their pricing.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
