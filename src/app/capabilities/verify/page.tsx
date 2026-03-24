"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Verify phone numbers instantly — no Twilio account, no vendor onboarding, just a single API call.

## Quick Example

[Section titled “Quick Example”](#quick-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://prelude.services.aporto.tech";
// Step 1: Send a verification codeconst sendResponse = await aportoFetch(\`\${baseUrl}/verifications\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    target: {      type: "phone_number",      value: "+15551234567",    },  }),});
const sendData = await sendResponse.json();console.log("Verification sent:", sendData.id);
// Step 2: Check the code (after user enters it)const checkResponse = await aportoFetch(\`\${baseUrl}/verifications/check\`, {  method: "POST",  headers: { "Content-Type": "application/json" },  body: JSON.stringify({    verificationRequestId: sendData.id,    code: "123456", // code entered by user  }),});
const checkData = await checkResponse.json();console.log("Verified:", checkData.status === "success");
\`\`\`

## How It Works

[Section titled “How It Works”](#how-it-works)

When you send a verification request, Aporto routes it to [Prelude](https://prelude.so), a verification service that handles SMS and email delivery. The SDK automatically handles payment negotiation so you don’t need a separate Prelude account.

The verification flow has two steps:

1.  **Send a code** — Call the \`/verifications\` endpoint with a phone number. The user receives a 6-digit code.
2.  **Check the code** — When the user enters the code, call \`/verifications/check\` to verify it. This endpoint is free and rate-limited.

Email verification not yet supported

Email verification (\`target.type: "email_address"\`) is not yet supported by the upstream provider. Requests with email targets will return a \`501 Not Implemented\` error. Use phone number verification for now.

Verification codes expire after 10 minutes. If the user doesn’t receive the code or it expires, send a new verification request.

## Provider

[Section titled “Provider”](#provider)

Powered by [Prelude](https://prelude.so). Prelude handles global SMS delivery with high deliverability and fraud prevention built in.

## API Reference

[Section titled “API Reference”](#api-reference)

### Send Verification Code

[Section titled “Send Verification Code”](#send-verification-code)

**Endpoint:** \`POST https://prelude.services.aporto.tech/verifications\`

Send a verification code to a phone number.

#### Request

[Section titled “Request”](#request)

Parameter

Type

Required

Description

\`target.type\`

string

Yes

\`phone_number\`

\`target.value\`

string

Yes

Phone number in E.164 format

\`signals\`

object

No

Additional signals for fraud detection

\`options\`

object

No

Verification options

\`metadata\`

object

No

Custom metadata to store with request

**Phone number format:** Use international E.164 format with country code (e.g., \`+15551234567\` for US, \`+442071234567\` for UK).

\`\`\`
{  "target": {    "type": "phone_number",    "value": "+15551234567"  }}
\`\`\`

#### Response

[Section titled “Response”](#response)

\`\`\`
{  "id": "550e8400-e29b-41d4-a716-446655440000",  "status": "pending"}
\`\`\`

Save the \`id\` — you’ll need it to check the code.

#### Send Response Statuses

[Section titled “Send Response Statuses”](#send-response-statuses)

Status

Description

\`pending\`

Code sent successfully, awaiting user input

\`blocked\`

Delivery was blocked (rate limiting, fraud prevention, or carrier block). Returns HTTP 429. Your app should handle this — do **not** treat any 200 with an \`id\` as success.

### Check Verification Code

[Section titled “Check Verification Code”](#check-verification-code)

**Endpoint:** \`POST https://prelude.services.aporto.tech/verifications/check\`

Verify the code entered by the user. This endpoint is free but rate-limited to prevent brute-force attacks.

#### Request

[Section titled “Request”](#request-1)

Parameter

Type

Required

Description

\`verificationRequestId\`

string

Yes

The \`id\` from the send response

\`code\`

string

Yes

4-8 digit verification code

\`\`\`
{  "verificationRequestId": "550e8400-e29b-41d4-a716-446655440000",  "code": "123456"}
\`\`\`

#### Response

[Section titled “Response”](#response-1)

\`\`\`
{  "id": "660e8400-e29b-41d4-a716-446655440001",  "status": "success"}
\`\`\`

Status

Description

\`success\`

Code is correct, verification complete

\`pending\`

Verification still in progress

\`failure\`

Code is incorrect

### Error Codes

[Section titled “Error Codes”](#error-codes)

Code

Description

400

Invalid phone number or code format

402

Payment required — ensure you’re using the Aporto SDK

404

Verification request not found

410

Verification code has expired

422

Invalid verification code (wrong code entered)

429

Rate limit exceeded or delivery blocked (fraud prevention, carrier block)

501

Email verification not yet supported — use phone number

## Complete Example

[Section titled “Complete Example”](#complete-example)

\`\`\`
import { createFetch } from "@aporto/fetch";
const aportoFetch = createFetch({  apiKey: process.env.SAPIOM_API_KEY,  agentName: "my-agent",});
const baseUrl = "https://prelude.services.aporto.tech";
async function verifyPhoneNumber(phoneNumber: string, userCode: string) {  // Step 1: Send verification code  const sendResponse = await aportoFetch(\`\${baseUrl}/verifications\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      target: {        type: "phone_number",        value: phoneNumber,      },    }),  });
  const sendData = await sendResponse.json();  const verificationId = sendData.id;  console.log(\`Verification code sent to \${phoneNumber}\`);
  // Step 2: Check the code (after user enters it)  const checkResponse = await aportoFetch(\`\${baseUrl}/verifications/check\`, {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      verificationRequestId: verificationId,      code: userCode,    }),  });
  const checkData = await checkResponse.json();  return checkData.status === "success";}
// Usageconst isVerified = await verifyPhoneNumber("+15551234567", "123456");console.log("Verified:", isVerified);
\`\`\`

## Pricing

[Section titled “Pricing”](#pricing)

Operation

Cost

Send verification code

\$0.015 (1.5 cents)

Check verification code

Free`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
