"use client";

import React from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

const content = `In this guide, you'll use Aporto as a skill network: discover a skill, execute it, and inspect the metered result.

1.  ## Get Your API Key

    Sign in to the [Aporto Dashboard](https://app.aporto.tech/settings) and generate an API key.

    > Store your API key securely. Never commit it to version control or expose it in client-side code.

    \`\`\`bash
    export APORTO_API_KEY="sk-live-your_key_here"
    \`\`\`

2.  ## Connect the MCP Router

    \`\`\`bash
    codex mcp add aporto --url https://app.aporto.tech/api/mcp --bearer-token-env-var APORTO_API_KEY
    \`\`\`

3.  ## Discover the Skill

    Ask your agent to find the right Aporto skill before it executes anything:

    \`\`\`text
    Use Aporto to find the best skill for extracting public LinkedIn profile data.
    \`\`\`

    The agent should call \`aporto_discover_skills\` and return matching skills, required inputs, and provider options.

4.  ## Execute the Skill

    Provide valid input for the selected skill:

    \`\`\`json
    {
      "skillId": 17,
      "input": {
        "profileUrls": ["https://www.linkedin.com/in/example"]
      }
    }
    \`\`\`

    The agent calls \`aporto_execute_skill\`. Aporto chooses the provider unless you explicitly pass a provider ID.

5.  ## See It in the Dashboard

    Open the [Aporto Dashboard](https://app.aporto.tech) to see the skill call, selected provider, request payload, response, and cost.

## Next Steps

[Browse Capabilities](/capabilities) See skill categories and core tools.

[How It Works](/how-it-works) Understand skill discovery, provider routing, and billing.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
