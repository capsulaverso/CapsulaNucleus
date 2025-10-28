// types/agents.ts
// This file contains the core TypeScript interfaces for the agent system.
// Defining these types centrally ensures consistency across the entire application,
// from the frontend UI to the backend orchestration logic.

export interface Agent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  systemPrompt: string;
  model: 'claude-sonnet-4' | 'gpt-4';
  tools: string[];
  cost: number; // in credits
}

export interface AgentWorkflow {
  id: string;
  name: string;
  userId: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'running' | 'paused' | 'completed' | 'error';
  context: SharedContext;
  agentsInvolved: Agent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  id: string;
  agentId: string;
  action: string;
  prompt: string;
  requiresUserInput: boolean;
  dependencies: string[];
  status: 'pending' | 'running' | 'completed' | 'error';
  input?: any;
  output?: any;
  executedAt?: Date;
}

export interface SharedContext {
  originalRequest: string;
  segment?: string;
  research?: any;
  specialists?: string[];
  [key: string]: any;
}
