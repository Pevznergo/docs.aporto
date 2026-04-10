"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Use LangChain with Aporto by pointing \`ChatOpenAI\` at Aporto's LLM gateway. No special packages needed.

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
  modelName: "openai/gpt-4o-mini",
});

// Partner services via @aporto/core
const aporto = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });
\`\`\`

## Example: Agent with Web Search Tool

\`\`\`typescript
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import AportoClient from "@aporto/core";

const aporto = new AportoClient({ apiKey: process.env.APORTO_API_KEY! });

const llm = new ChatOpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  configuration: { baseURL: "https://api.aporto.tech/v1" },
  modelName: "openai/gpt-4o-mini",
});

const searchTool = new DynamicTool({
  name: "web_search",
  description: "Search the web for current information",
  func: async (query: string) => {
    const result = await aporto.services.search.query({
      query,
      depth: "standard",
      outputType: "sourcedAnswer",
    });
    return result.answer ?? JSON.stringify(result.sources);
  },
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant with access to web search."],
  ["human", "{input}"],
  ["assistant", "{agent_scratchpad}"],
]);

const agent = await createOpenAIFunctionsAgent({ llm, tools: [searchTool], prompt });
const executor = new AgentExecutor({ agent, tools: [searchTool] });

const result = await executor.invoke({
  input: "What are the latest developments in quantum computing?",
});
console.log(result.output);
\`\`\`

## Available Models

Any model from the [AI Models](/capabilities/ai-models) page works with the \`modelName\` parameter:

\`\`\`typescript
// Different models
const gpt4 = new ChatOpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  configuration: { baseURL: "https://api.aporto.tech/v1" },
  modelName: "openai/gpt-4o",
});

const claude = new ChatOpenAI({
  apiKey: process.env.APORTO_API_KEY!,
  configuration: { baseURL: "https://api.aporto.tech/v1" },
  modelName: "anthropic/claude-3.5-sonnet",
});
\`\`\`

## Next Steps

[@aporto/core SDK](/quick-start) Full SDK documentation

[AI Models](/capabilities/ai-models) Available models and pricing`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
