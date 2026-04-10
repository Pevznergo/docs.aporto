"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Generate images from text prompts — no Fal.ai account required. Powered by FLUX models.

## Quick Example

\`\`\`typescript
import AportoClient from "@aporto/core";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

const result = await client.services.images.generate({
  prompt: "A serene mountain landscape at sunset",
  model: "flux-schnell",
  image_size: "landscape_4_3",
});

console.log(result.images?.[0].url);
\`\`\`

## How It Works

Aporto routes image requests to [Fal.ai](https://fal.ai), which runs FLUX and other state-of-the-art image generation models on fast GPU infrastructure. You pay per megapixel based on the model chosen.

## SDK Reference

\`\`\`typescript
client.services.images.generate(params)
\`\`\`

### Parameters

Parameter | Type | Required | Description
----------|------|----------|------------
\`prompt\` | string | Yes | Text description of the image to generate
\`model\` | string | No | \`"flux-schnell"\` (default), \`"flux-dev"\`, or \`"flux-pro"\`
\`image_size\` | string | No | Size preset (default: \`"landscape_4_3"\`)
\`num_images\` | number | No | Number of images to generate, 1–4 (default: 1)

**Image size presets:**

Preset | Dimensions
-------|----------
\`square_hd\` | 1024 × 1024
\`square\` | 512 × 512
\`portrait_4_3\` | 768 × 1024
\`portrait_16_9\` | 576 × 1024
\`landscape_4_3\` | 1024 × 768
\`landscape_16_9\` | 1024 × 576

### Response

\`\`\`typescript
{
  success: boolean;
  images?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  costUSD: number;
}
\`\`\`

## Raw HTTP

**Endpoint:** \`POST https://app.aporto.tech/api/services/image\`

\`\`\`bash
curl https://app.aporto.tech/api/services/image \\
  -H "Authorization: Bearer $APORTO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A serene mountain landscape at sunset",
    "model": "flux-schnell",
    "image_size": "landscape_4_3"
  }'
\`\`\`

## Complete Example

\`\`\`typescript
import AportoClient from "@aporto/core";
import fs from "fs";

const client = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

async function generateProductImage(description: string) {
  const result = await client.services.images.generate({
    prompt: \`Professional product photo: \${description}, studio lighting, white background\`,
    model: "flux-schnell",
    image_size: "square_hd",
    num_images: 1,
  });

  if (!result.success || !result.images?.length) {
    throw new Error("Image generation failed");
  }

  const imageUrl = result.images[0].url;
  console.log(\`Generated: \${imageUrl}\`);
  console.log(\`Cost: \$\${result.costUSD}\`);
  return imageUrl;
}

await generateProductImage("minimalist desk lamp");
\`\`\`

## Pricing

Pricing is based on megapixels (MP) — output width × height ÷ 1,000,000.

Model | Price per MP
------|-------------
flux-schnell | \$0.004
flux-dev | \$0.015
flux-pro | \$0.04

**Example costs (landscape_4_3 = 0.79 MP):**
- flux-schnell: ~\$0.003
- flux-dev: ~\$0.012
- flux-pro: ~\$0.032

## Error Codes

Code | Description
-----|------------
400 | Invalid request — check parameters
401 | Unauthorized — check your API key
402 | Insufficient balance — top up at app.aporto.tech
429 | Rate limit exceeded

## Provider

Powered by [Fal.ai](https://fal.ai). Fast, scalable inference for generative AI with optimized GPU infrastructure.`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
