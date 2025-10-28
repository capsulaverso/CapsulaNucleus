// lib/agents/core/workflow-engine.ts
// This engine is responsible for executing a compiled workflow graph.
// It takes user input, passes it to the orchestrator's compiled graph,
// and streams the events and results back.

import { Orchestrator } from './orchestrator';
import { SharedContext } from '@/types/agents';

export class WorkflowEngine {
  /**
   * Runs the defined workflow and streams the output.
   * @param initialContext - The initial shared context, including the user's request.
   * @returns An async generator that yields the state of the graph at each step.
   */
  public async *run(initialContext: SharedContext) {
    console.log("--- Workflow Engine Started ---");

    // 1. Create a new orchestrator and compile its graph
    const orchestrator = new Orchestrator();
    const compiledGraph = orchestrator.compile();

    // 2. Define the initial state for the graph execution
    const initialState = {
      sharedContext: initialContext,
    };

    // 3. Stream the execution events
    const stream = compiledGraph.stream(initialState);

    console.log("Graph stream initiated. Waiting for events...");

    for await (const event of stream) {
      // The event object contains the state of the graph at each node's completion.
      // We yield the entire event so the caller can see what's happening.
      console.log("--- Yielding Event ---", event);
      yield event;
    }

    console.log("--- Workflow Engine Finished ---");
  }
}
