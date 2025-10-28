// lib/agents/core/orchestrator.ts
// This is the central piece of the AI system, built using LangGraph.
// It defines the state graph, nodes (agents), and conditional edges
// that control the flow of a workflow.

import { StateGraph, END } from "@langchain/langgraph";
import { ChatAnthropic } from "@langchain/anthropic";
import { z } from "zod";
import { SharedContext } from "@/types/agents";

const graphStateSchema = z.object({
  sharedContext: z.custom<SharedContext>(),
});

type GraphState = z.infer<typeof graphStateSchema>;

export class Orchestrator {
  private graph: StateGraph<GraphState>;
  private model: ChatAnthropic;

  constructor() {
    this.graph = new StateGraph({ channels: graphStateSchema });
    this.model = new ChatAnthropic({
      modelName: "claude-3-sonnet-20240229",
      apiKey: process.env.ANTHROPIC_API_KEY,
      temperature: 0.7, // Higher temp for more creative tasks
    });
    this.buildGraph();
  }

  private buildGraph() {
    this.graph.addNode("classifier", this.runClassifier.bind(this));
    this.graph.addNode("researcher", this.runResearcher.bind(this));
    this.graph.addNode("designer-expert", this.runDesignerExpert.bind(this));
    this.graph.addNode("copywriter", this.runCopywriter.bind(this));
    this.graph.addNode("default-specialist", this.runDefaultSpecialist.bind(this));

    this.graph.setEntryPoint("classifier");
    this.graph.addEdge("classifier", "researcher");

    // Conditional routing based on the classified segment
    this.graph.addConditionalEdges("researcher", this.decideNextStep.bind(this), {
      "Design": "designer-expert",
      "Marketing": "copywriter",
      // Add other routes here, e.g., "Medicine": "medical-expert"
      "fallback": "default-specialist",
    });

    // All specialist paths lead to the end for now
    this.graph.addEdge("designer-expert", END);
    this.graph.addEdge("copywriter", END);
    this.graph.addEdge("default-specialist", END);
  }

  // Decider function for conditional routing
  private decideNextStep(state: GraphState): "Design" | "Marketing" | "fallback" {
    const { segment } = state.sharedContext;
    console.log(`--- Deciding next step based on segment: ${segment} ---`);
    if (segment === "Design") {
      return "Design";
    }
    if (segment === "Marketing") {
      return "Marketing";
    }
    return "fallback";
  }

  private async runClassifier(state: GraphState): Promise<Partial<GraphState>> {
    console.log("--- Running Classifier Agent ---");
    const { originalRequest } = state.sharedContext;
    const prompt = `Classify the user's request into one of: Design, Medicine, Technology, Christian, Marketing. Respond with only the category name. Request: "${originalRequest}"`;
    const response = await this.model.invoke(prompt);
    const segment = response.content.toString().trim();
    console.log(`Classifier identified segment: ${segment}`);
    return { sharedContext: { ...state.sharedContext, segment } };
  }

  private async runResearcher(state: GraphState): Promise<Partial<GraphState>> {
    console.log("--- Running Researcher Agent ---");
    const { originalRequest, segment } = state.sharedContext;
    const prompt = `You are a master researcher. For the topic "${originalRequest}" in the segment "${segment}", find 3 key trends or facts. Format as a bulleted list.`;
    const response = await this.model.invoke(prompt);
    const research = response.content.toString();
    console.log(`Researcher found: \n${research}`);
    return { sharedContext: { ...state.sharedContext, research } };
  }

  private async runDesignerExpert(state: GraphState): Promise<Partial<GraphState>> {
    console.log("--- Running Design Expert Agent ---");
    const { originalRequest, research } = state.sharedContext;
    const prompt = `You are a world-renowned design director. Based on the request "${originalRequest}" and the research "${research}", create a high-level creative concept for a video script. Focus on visual storytelling.`;
    const response = await this.model.invoke(prompt);
    const script = response.content.toString();
    console.log(`Design Expert created: \n${script}`);
    return { sharedContext: { ...state.sharedContext, script } };
  }

  private async runCopywriter(state: GraphState): Promise<Partial<GraphState>> {
    console.log("--- Running Copywriter Agent ---");
    const { originalRequest, research } = state.sharedContext;
    const prompt = `You are a senior copywriter. Based on the request "${originalRequest}" and research "${research}", write a compelling hook and call-to-action for a video script.`;
    const response = await this.model.invoke(prompt);
    const script = response.content.toString();
    console.log(`Copywriter created: \n${script}`);
    return { sharedContext: { ...state.sharedContext, script } };
  }

  private async runDefaultSpecialist(state: GraphState): Promise<Partial<GraphState>> {
    console.log("--- Running Default Specialist Agent ---");
    const { originalRequest, research, segment } = state.sharedContext;
    const prompt = `You are a general content strategist. Based on the request "${originalRequest}" for the segment "${segment}" and the research "${research}", outline a basic script structure.`;
    const response = await this.model.invoke(prompt);
    const script = response.content.toString();
    console.log(`Default Specialist created: \n${script}`);
    return { sharedContext: { ...state.sharedContext, script } };
  }

  public compile() {
    return this.graph.compile();
  }
}
