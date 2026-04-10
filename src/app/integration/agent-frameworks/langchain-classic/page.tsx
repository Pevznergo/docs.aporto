"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Use LangChain v0.3+ with Aporto by configuring \`ChatOpenAI\` to point at Aporto's LLM gateway.

## Setup

\`\`\`bash
npm install @langchain/openai @aporto/core
\`\`\`

## Basic Setup

\`\`\`typescript
import { ChatOpenAI } from "@langchain/openai";
import AportoClient from "@aporto/core";

// LangChain LLM via Aporto gateway
const llm = new ChatOpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  configuration: {
    baseURL: "https://api.aporto.tech/v1",
  },
  model: "openai/gpt-4o-mini",
});

// Partner services via @aporto/core
const aporto = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
\`\`\`

## Example: Chain with Tools

\`\`\`typescript
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { z } from "zod";
import AportoClient from "@aporto/core";

const aporto = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

const llm = new ChatOpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  configuration: { baseURL: "https://api.aporto.tech/v1" },
  model: "openai/gpt-4o-mini",
});

const searchTool = new DynamicStructuredTool({
  name: "web_search",
  description: "Search the web for current information",
  schema: z.object({ query: z.string() }),
  func: async ({ query }) => {
    const result = await aporto.services.search.query({
      query,
      depth: "standard",
      outputType: "sourcedAnswer",
    });
    return result.answer ?? "No answer found";
  },
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

const agent = await createOpenAIToolsAgent({ llm, tools: [searchTool], prompt });
const executor = new AgentExecutor({ agent, tools: [searchTool] });

const result = await executor.invoke({ input: "What happened in AI this week?" });
console.log(result.output);
\`\`\`

## Next Steps

[LangChain v1.x](/integration/agent-frameworks/langchain) Middleware-based integration

[@aporto/core SDK](/quick-start) Full SDK documentation`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
