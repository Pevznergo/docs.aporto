"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Send a verification code to a phone number — no Prelude account, no vendor onboarding, just a single SDK call.

## Quick Example

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

// Send a verification code
const result = await client.services.sms.send({ to: "+15551234567" });
console.log("Code sent!", result);
\`\`\`

## How It Works

Aporto routes verification requests to [Prelude](https://prelude.so), which sends a 6-digit OTP to the phone number via SMS (or WhatsApp). You never need a Prelude account.

Cost is **$0.015 per send** — deducted from your Aporto prepaid balance.

## SDK Reference

\`\`\`typescript
client.services.sms.send(params)
\`\`\`

### Parameters

Parameter | Type | Required | Description
----------|------|----------|------------
\`to\` | string | Yes | Phone number in E.164 format (e.g., \`+15551234567\`)
\`type\` | string | No | \`"sms"\` (default) or \`"whatsapp"\`

### Response

\`\`\`typescript
{
  success: boolean;
  id?: string;      // Prelude verification ID
  costUSD: number;  // 0.015
}
\`\`\`

Save the \`id\` if you need to reference the verification later.

## Raw HTTP

If you prefer to call the endpoint directly:

**Endpoint:** \`POST https://app.aporto.tech/api/services/sms\`

\`\`\`bash
curl https://app.aporto.tech/api/services/sms \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "to": "+15551234567", "type": "sms" }'
\`\`\`

## Complete Example

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

async function sendOTP(phoneNumber: string) {
  const result = await client.services.sms.send({ to: phoneNumber });

  if (!result.success) {
    throw new Error("Failed to send verification code");
  }

  console.log(\`OTP sent to \${phoneNumber}\`);
  return result.id;
}

await sendOTP("+15551234567");
\`\`\`

## Error Codes

Code | Description
-----|------------
400 | Invalid phone number format — use E.164 (e.g., \`+15551234567\`)
401 | Unauthorized — check your API key
402 | Insufficient balance — top up at app.aporto.tech
429 | Rate limit exceeded or carrier block (fraud prevention)

## Pricing

Operation | Cost
----------|-----
Send verification code (SMS) | \$0.015
Send verification code (WhatsApp) | \$0.015

## Provider

Powered by [Prelude](https://prelude.so). Prelude handles global SMS delivery with high deliverability and fraud prevention built in.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
