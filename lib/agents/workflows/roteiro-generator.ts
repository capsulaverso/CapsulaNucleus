// lib/agents/workflows/roteiro-generator.ts
// This file defines the specific workflow for the "Gerador de Roteiros" (Script Generator).
// It outlines the sequence of agents, their connections, and the points
// where user interaction is required.

import { AgentWorkflow } from '@/types/agents';

export const roteiroGeneratorWorkflow: AgentWorkflow = {
  id: 'roteiro-generator',
  name: 'Gerador de Roteiros',
  userId: 'system', // Indicates a default workflow
  steps: [
    {
      id: 'step1',
      agentId: 'classifier',
      action: 'Classify the user topic.',
      prompt: '{{originalRequest}}',
      requiresUserInput: true, // User must confirm the classification
      dependencies: [],
      status: 'pending',
    },
    {
      id: 'step2',
      agentId: 'researcher',
      action: 'Research trends for the given topic and segment.',
      prompt: 'Topic: {{originalRequest}}, Segment: {{step1.output}}',
      requiresUserInput: false,
      dependencies: ['step1'],
      status: 'pending',
    },
    // ... more steps for specialist collaboration and editing
  ],
  currentStep: 0,
  status: 'paused',
  context: {
    originalRequest: '',
  },
  agentsInvolved: [], // Will be populated at runtime
  createdAt: new Date(),
  updatedAt: new Date(),
};
