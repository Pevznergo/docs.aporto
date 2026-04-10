"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `In this guide, you'll send a verification code to a phone number using Aporto — no Prelude account required.

1.  ## Get Your API Key

    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.

    > Store your API key securely. Never commit it to version control or expose it in client-side code.

    \`\`\`bash
    export APORTO_API_KEY="sk-live-your_key_here"
    \`\`\`

2.  ## Install the SDK

    \`\`\`bash
    npm install @aporto/core
    \`\`\`

3.  ## Send a Verification Code

    Aporto calls Prelude under the hood, which sends a 6-digit OTP to the phone number.

    Create a file called \`verify.ts\`:

    \`\`\`typescript
    import AportoClient from "@aporto/core";

    const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

    async function sendVerificationCode(phoneNumber: string) {
      const result = await client.services.sms.send({ to: phoneNumber });
      console.log("Verification sent!", result);
      // result.id can be used to check the code via Prelude directly
      return result;
    }

    // Replace with a real phone number (E.164 format)
    await sendVerificationCode("+15551234567");
    \`\`\`

    Run it:

    \`\`\`bash
    npx tsx verify.ts
    \`\`\`

    The phone number will receive a text message with a 6-digit code. Cost: **$0.015 per send**.

4.  ## See It in the Dashboard

    Open the [Aporto Dashboard](https://app.aporto.tech) to see your SMS transaction logged in real time.

## Next Steps

[Browse Capabilities](/capabilities) See all available services — search, AI models, images, audio, and more.

[How It Works](/how-it-works) Understand the gateway architecture and billing model.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
