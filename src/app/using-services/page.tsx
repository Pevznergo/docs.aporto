"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `In this guide, you’ll verify a phone number using Aporto — no Prelude account required.

1.  ## Get Your API Key
    
    [Section titled “Get Your API Key”](#get-your-api-key)
    
    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.
    
    Caution
    
    Store your API key securely. Never commit it to version control or expose it in client-side code.
    
    Add your API key to your environment:
    
    Terminal window
    
    \`\`\`
    export APORTO_API_KEY="your_api_key_here"
    \`\`\`
    
2.  ## Install the SDK
    
    [Section titled “Install the SDK”](#install-the-sdk)
    
    Terminal window
    
    \`\`\`
    npm install @aporto/fetch
    \`\`\`
    
3.  ## Send a Verification Code
    
    [Section titled “Send a Verification Code”](#send-a-verification-code)
    
    Create a file called \`verify.ts\` and add the following code:
    
    \`\`\`
    import { createFetch } from '@aporto/fetch';
    const fetch = createFetch({  apiKey: process.env.APORTO_API_KEY!,});
    async function sendVerificationCode(phoneNumber: string) {  const response = await fetch(    'https://prelude.services.aporto.tech/verifications',    {      method: 'POST',      headers: { 'Content-Type': 'application/json' },      body: JSON.stringify({        target: {          type: 'phone_number',          value: phoneNumber,        },      }),    }  );
      const data = await response.json();  console.log('Verification sent!');  console.log('Verification ID:', data.id);  return data.id;}
    // Replace with your phone number (E.164 format)sendVerificationCode('+15551234567');
    \`\`\`
    
    Run it:
    
    Terminal window
    
    \`\`\`
    npx tsx verify.ts
    \`\`\`
    
    You’ll receive a text message with a verification code.
    
4.  ## Check the Code
    
    [Section titled “Check the Code”](#check-the-code)
    
    Update your file to check the code:
    
    \`\`\`
    import { createFetch } from '@aporto/fetch';
    const fetch = createFetch({  apiKey: process.env.APORTO_API_KEY!,});
    async function checkVerificationCode(verificationId: string, code: string) {  const response = await fetch(    'https://prelude.services.aporto.tech/verifications/check',    {      method: 'POST',      headers: { 'Content-Type': 'application/json' },      body: JSON.stringify({        verificationRequestId: verificationId,        code: code,      }),    }  );
      const data = await response.json();  if (data.status === 'success') {    console.log('Phone number verified!');  } else {    console.log('Verification failed:', data.status);  }}
    // Use the verification ID from step 3 and the code you receivedcheckVerificationCode('your-verification-id', '123456');
    \`\`\`
    
    Run it with your verification ID and the code from your text message:
    
    Terminal window
    
    \`\`\`
    npx tsx verify.ts
    \`\`\`
    
5.  ## See It in the Dashboard
    
    [Section titled “See It in the Dashboard”](#see-it-in-the-dashboard)
    
    Open the [Aporto Dashboard](https://app.aporto.tech) to see your verification transaction.
    
    You just verified a phone number with **zero Prelude account setup**. That’s the power of Aporto.
    

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Browse Capabilities](/capabilities) See all available services — search, AI models, images, audio, and more.

[Set Up Governance](/governance) Add spend limits and usage rules for production.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
