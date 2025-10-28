// types/api.ts
// This file defines the TypeScript types for the API request and response bodies.
// This helps ensure that the frontend and backend are aligned on data contracts,
// reducing the chance of integration errors.

// Example for the /api/agents/execute endpoint
export interface ExecuteAgentRequest {
  workflowId: string;
  input: Record<string, any>;
}

export interface ExecuteAgentResponse {
  success: boolean;
  sessionId: string;
  error?: string;
}

// Types for streaming events
export type StreamEvent =
  | { type: 'agent_start', agentId: string }
  | { type: 'agent_output', agentId: string, chunk: string }
  | { type: 'agent_end', agentId: string }
  | { type: 'workflow_end', finalOutput: any };
