// lib/agents/core/workflow-engine.ts
// This engine is responsible for executing the workflow defined in the orchestrator.
// It acts as a simple bridge between the API and the orchestration logic.

import { Orchestrator } from './orchestrator';
import { SharedContext } from '@/types/agents';

export class WorkflowEngine {
  /**
   * Runs the defined workflow and streams the output.
   * @param initialContext - The initial shared context, including the user's request.
   * @returns An async generator that yields the state of the graph at each step.
   */
  public async *run(initialContext: SharedContext) {
    const orchestrator = new Orchestrator();

    // The orchestrator's run method is now an async generator itself.
    for await (const event of orchestrator.run(initialContext)) {
      yield event;
    }
  }
}
