// lib/agents/core/orchestrator.ts
// This is a simplified, manual implementation of the agent workflow orchestrator,
// removing the dependency on LangGraph to resolve persistent build issues.

import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { SharedContext } from "@/types/agents";

type AgentNode = (state: GraphState) => Promise<Partial<GraphState>>;

// The state interface for our graph.
interface GraphState {
  sharedContext: SharedContext;
  nextNode: keyof typeof nodeRegistry | "END";
}

// A registry of all possible nodes in our graph.
const nodeRegistry = {
  classifier: runClassifier,
  researcher: runResearcher,
  "designer-expert": runDesignerExpert,
  copywriter: runCopywriter,
  "default-specialist": runDefaultSpecialist,
};

export class Orchestrator {
  model: ChatAnthropic;

  constructor() {
    this.model = new ChatAnthropic({
      modelName: "claude-3-sonnet-20240229",
      apiKey: process.env.ANTHROPIC_API_KEY,
      temperature: 0.7,
    });
  }

  // The main execution loop for the workflow.
  public async *run(initialContext: SharedContext) {
    let state: GraphState = {
      sharedContext: initialContext,
      nextNode: "classifier",
    };

    while (state.nextNode !== "END") {
      const node = nodeRegistry[state.nextNode];
      const partialUpdate = await node.call(this, state);

      state = { ...state, ...partialUpdate };
      state.nextNode = this.decideNextStep(state);

      // Yield the current state at each step.
      yield state;
    }
  }

  private decideNextStep(state: GraphState): keyof typeof nodeRegistry | "END" {
    if (state.nextNode === "classifier") return "researcher";
    if (state.nextNode === "researcher") {
      const { segment } = state.sharedContext;
      if (segment === "Design") return "designer-expert";
      if (segment === "Marketing") return "copywriter";
      return "default-specialist";
    }
    return "END";
  }
}

// Agent functions are now defined outside the class.
async function runClassifier(this: Orchestrator, state: GraphState): Promise<Partial<GraphState>> {
  const { originalRequest } = state.sharedContext;
  const prompt = `Classify the user's request into one of: Design, Medicine, Technology, Christian, Marketing. Respond with only the category name. Request: "${originalRequest}"`;
  const response = await this.model.invoke([new HumanMessage(prompt)]);
  const segment = response.content.toString().trim();
  return { sharedContext: { ...state.sharedContext, segment } };
}

async function runResearcher(this: Orchestrator, state: GraphState): Promise<Partial<GraphState>> {
  const { originalRequest, segment } = state.sharedContext;
  const prompt = `You are a master researcher. For the topic "${originalRequest}" in the segment "${segment}", find 3 key trends or facts. Format as a bulleted list.`;
  const response = await this.model.invoke([new HumanMessage(prompt)]);
  const research = response.content.toString();
  return { sharedContext: { ...state.sharedContext, research } };
}

async function runDesignerExpert(this: Orchestrator, state: GraphState): Promise<Partial<GraphState>> {
  const { originalRequest, research } = state.sharedContext;
  const prompt = `You are a world-renowned design director. Based on the request "${originalRequest}" and the research "${research}", create a high-level creative concept for a video script. Focus on visual storytelling.`;
  const response = await this.model.invoke([new HumanMessage(prompt)]);
  const script = response.content.toString();
  return { sharedContext: { ...state.sharedContext, script } };
}

async function runCopywriter(this: Orchestrator, state: GraphState): Promise<Partial<GraphState>> {
  const { originalRequest, research } = state.sharedContext;
  const prompt = `You are a senior copywriter. Based on the request "${originalRequest}" and research "${research}", write a compelling hook and call-to-action for a video script.`;
  const response = await this.model.invoke([new HumanMessage(prompt)]);
  const script = response.content.toString();
  return { sharedContext: { ...state.sharedContext, script } };
}

async function runDefaultSpecialist(this: Orchestrator, state: GraphState): Promise<Partial<GraphState>> {
  const { originalRequest, research, segment } = state.sharedContext;
  const prompt = `You are a general content strategist. Based on the request "${originalRequest}" for the segment "${segment}" and the research "${research}", outline a basic script structure.`;
  const response = await this.model.invoke([new HumanMessage(prompt)]);
  const script = response.content.toString();
  return { sharedContext: { ...state.sharedContext, script } };
}
