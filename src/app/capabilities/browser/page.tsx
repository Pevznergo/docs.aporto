"use client";

import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const content = `Automate browser tasks, take screenshots, and scrape web pages.

## Coming Soon

Browser automation (Anchor Browser) is not yet available through Aporto.

In the meantime, you can use [Playwright](https://playwright.dev) or [Puppeteer](https://pptr.dev) directly for browser automation.

[Back to Capabilities](/capabilities)`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
