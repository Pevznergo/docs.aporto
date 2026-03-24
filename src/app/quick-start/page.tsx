"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `Aporto wraps your existing HTTP client so any request to a Aporto service handles payment automatically.

1.  ## Get an API Key
    
    [Section titled “Get an API Key”](#get-an-api-key)
    
    Grab one from the [Aporto Dashboard](https://app.aporto.tech/settings).
    
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
    
3.  ## Make a Request
    
    [Section titled “Make a Request”](#make-a-request)
    
    \`\`\`
    import { createFetch } from "@aporto/fetch";
    const fetch = createFetch({  apiKey: process.env.APORTO_API_KEY!,});
    const response = await fetch(  "https://linkup.services.aporto.tech/v1/search?q=latest+AI+news&depth=standard");
    console.log(await response.json());
    \`\`\`
    
    That’s it. The SDK handles the payment flow behind the scenes — you just make normal HTTP requests.
    

## Next Steps

[Section titled “Next Steps”](#next-steps)

[Using Services](/using-services) Full walkthrough: verify a phone number end-to-end.

[Browse Capabilities](/capabilities) Search, AI models, images, audio, browser automation, and more.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
