import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ZeroShotAgent } from "langchain/agents";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { AgentExecutor } from "langchain/agents";
import SerpAPITool from "../tools/SerpAPI";
import WebBrowserTool from "../tools/WebBrowser";

const ResearchAgent = async (topic) => {
  console.log({ topic });
  try {
    const SerpAPI = SerpAPITool();
    const WebBrowser = WebBrowserTool();

    const tools = [SerpAPI, WebBrowser];

    const promptTemplate = ZeroShotAgent.createPrompt(tools, {
      prefix: `Answer the following questions as best you can. You have access to the following tools:`,
      suffix: `Begin! Answer concisely. It's OK to say you don't know.`,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      new SystemMessagePromptTemplate(promptTemplate),
      HumanMessagePromptTemplate.fromTemplate(`{input}`),
    ]);

    const chat = new ChatOpenAI({});
    const llmChain = new LLMChain({
      prompt: chatPrompt,
      llm: chat,
    });
    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: tools.map((tool) => tool.name),
    });

    const executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      returnIntermediateSteps: false,
      maxIterations: 3,
      verbose: true,
    });

    const result = await executor.run(`Who is ${topic}?`);

    return result;
  } catch (err) {
    console.error(err);
    return "Error in completing research";
  }
};
export default ResearchAgent;
