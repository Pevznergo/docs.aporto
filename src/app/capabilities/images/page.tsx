"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Generate images from text prompts, transform existing images, or upscale low-resolution images — all through a single API with no account setup required.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
// Create a Aporto-tracked fetch functionconst aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
// Generate image with Fal.ai - SDK handles payment/auth automaticallyconst response = await aportoFetch(  "https://fal.services.aporto.tech/v1/run/fal-ai/flux/dev",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      prompt: "A serene mountain landscape at sunset",      image_size: "landscape_4_3",    }),  });
const data = await response.json();console.log("Generated image:", data.images[0].url);
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

Aporto routes image generation requests to [FAL](https://fal.ai), which provides access to state-of-the-art image generation models including FLUX and SDXL. The SDK handles payment negotiation automatically — you pay per megapixel based on the model and image size.

The service supports three operations:

1.  **Generate** — Create images from text prompts
2.  **Transform** — Modify existing images with img2img
3.  **Upscale** — Increase image resolution

## Provider

[Section titled “Provider”](#provider)

Powered by [FAL](https://fal.ai). FAL provides fast, scalable inference for generative AI models with optimized GPU infrastructure.

## API Reference

[Section titled “API Reference”](#api-reference)

### Generate Image

[Section titled “Generate Image”](#generate-image)

**Endpoint:** \`POST https://fal.services.aporto.tech/v1/run/{model}\`

Generate one or more images from a text prompt. The model is specified in the URL path.

**Supported models:** \`fal-ai/flux/dev\`, \`fal-ai/flux/schnell\`, \`fal-ai/flux-pro\`, \`fal-ai/stable-diffusion-xl\`

#### Request

[Section titled “Request”](#request)

Parameter

Type

Required

Description

\`prompt\`

string

Yes

Text description of the image to generate

\`image_size\`

string

No

Size preset (default: \`landscape_4_3\`)

\`num_images\`

number

No

Number of images to generate, 1-4 (default: 1)

\`num_inference_steps\`

number

No

Quality steps, 1-100 (default: 28)

\`guidance_scale\`

number

No

Prompt adherence (default: 3.5)

\`output_format\`

string

No

\`jpeg\` or \`png\` (default: \`jpeg\`)

\`seed\`

number

No

Seed for reproducible generation

**Image size presets:**

Preset

Dimensions

\`square_hd\`

1024 × 1024

\`square\`

512 × 512

\`portrait_4_3\`

768 × 1024

\`portrait_16_9\`

576 × 1024

\`landscape_4_3\`

1024 × 768

\`landscape_16_9\`

1024 × 576

\`\`\`
{  "prompt": "A serene mountain lake at dawn with mist",  "image_size": "landscape_16_9",  "num_images": 1}
\`\`\`

#### Response

[Section titled “Response”](#response)

\`\`\`
{  "images": [    {      "url": "https://fal.media/files/abc123.jpg",      "width": 1024,      "height": 576,      "content_type": "image/jpeg"    }  ],  "seed": 42,  "prompt": "A serene mountain lake at dawn with mist"}
\`\`\`

### Transform Image

[Section titled “Transform Image”](#transform-image)

**Endpoint:** \`POST https://fal.services.aporto.tech/v1/run/fal-ai/flux/dev/image-to-image\`

Transform an existing image using img2img techniques. The model path can vary — use any Fal img2img model.

#### Request

[Section titled “Request”](#request-1)

Parameter

Type

Required

Description

\`image_url\`

string

Yes

URL of the input image

\`prompt\`

string

Yes

Description of the desired transformation

\`image_size\`

string

No

Output size preset (default: \`landscape_4_3\`)

\`strength\`

number

No

Transformation strength, 0.0-1.0 (default: 0.75)

\`num_inference_steps\`

number

No

Quality steps, 1-100 (default: 28)

\`num_images\`

number

No

Number of outputs, 1-4 (default: 1)

\`output_format\`

string

No

\`jpeg\` or \`png\` (default: \`jpeg\`)

\`seed\`

number

No

Seed for reproducible generation

\`\`\`
{  "image_url": "https://example.com/photo.jpg",  "prompt": "Transform into a watercolor painting style",  "strength": 0.75}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

\`\`\`
{  "images": [    {      "url": "https://fal.media/files/xyz789.jpg",      "width": 1024,      "height": 768,      "content_type": "image/jpeg"    }  ]}
\`\`\`

### Upscale Image

[Section titled “Upscale Image”](#upscale-image)

**Endpoint:** \`POST https://fal.services.aporto.tech/v1/run/fal-ai/topaz/upscale/image\`

Increase image resolution while preserving quality.

#### Request

[Section titled “Request”](#request-2)

Parameter

Type

Required

Description

\`image_url\`

string

Yes

URL of the image to upscale

\`model\`

string

No

Upscaling model (default: \`topaz\`)

\`scale\`

number

No

Scale factor: \`2\` or \`4\` (default: 2)

\`output_format\`

string

No

\`jpeg\` or \`png\` (default: \`jpeg\`)

\`\`\`
{  "image_url": "https://example.com/small-image.jpg",  "scale": 4}
\`\`\`

#### Response

[Section titled “Response”](#response-2)

\`\`\`
{  "image": {    "url": "https://fal.media/files/upscaled.jpg",    "width": 4096,    "height": 3072,    "content_type": "image/jpeg"  }}
\`\`\`

### Price Estimation

[Section titled “Price Estimation”](#price-estimation)

**Endpoint:** \`POST https://fal.services.aporto.tech/v1/price/run/{model}\`

Get the estimated cost before making a request. Use the same model path as the main endpoint (e.g., \`v1/price/run/fal-ai/flux/dev\`).

\`\`\`
{  "price": "\$0.012",  "currency": "USD"}
\`\`\`

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid request — check parameters and image URL

402

Payment required — ensure you’re using the Aporto SDK

404

Model not found

413

Image too large for processing

429

Rate limit exceeded

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://fal.services.aporto.tech/v1";
async function generateProductImage(description: string) {  // Generate a product visualization  const response = await aportoFetch(\`\${baseUrl}/run/fal-ai/flux/dev\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      prompt: \`Professional product photo: \${description}, studio lighting, white background\`,      image_size: "square_hd",      num_images: 1,      guidance_scale: 4.0,    }),  });
  const data = await response.json();  return data.images[0].url;}
async function createVariation(imageUrl: string, style: string) {  // Transform an existing image  const response = await aportoFetch(\`\${baseUrl}/run/fal-ai/flux/dev/image-to-image\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      image_url: imageUrl,      prompt: \`Render in \${style} style\`,      strength: 0.6,    }),  });
  const data = await response.json();  return data.images[0].url;}
// Usageconst productImage = await generateProductImage("minimalist desk lamp");console.log("Generated:", productImage);
const artVariation = await createVariation(productImage, "pop art");console.log("Variation:", artVariation);
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Pricing is based on megapixels (MP) — the total pixels in the output image divided by 1,000,000.

Model

Price per MP

flux-schnell

\$0.004

flux-dev

\$0.015

flux-pro

\$0.04

sdxl

\$0.007

Operation

Price per MP

Transform (img2img)

\$0.045

Upscale

\$0.03

**Example costs (landscape\_4\_3 = 0.79 MP):**

*   flux-schnell: ~\$0.003
*   flux-dev: ~\$0.012
*   flux-pro: ~\$0.032`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
