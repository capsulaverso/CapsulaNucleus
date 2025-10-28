// lib/agents/specialists/classifier.ts
// This file defines the Classifier agent.
// Its specific job is to analyze the user's initial prompt and
// determine the primary subject or segment (e.g., design, medicine).

import { Agent } from '@/types/agents';

export const classifierAgent: Agent = {
  id: 'classifier',
  name: 'Classificador de Segmento',
  specialty: 'Analyses user input to determine the content segment.',
  description: 'A specialized agent that classifies the user request into a specific category.',
  systemPrompt: `You are a world-class expert in content classification. Your task is to analyze the user's request and identify the main category or segment from the following options: Design, Medicine, Technology, Christian, Marketing. Respond with only the identified category name.`,
  model: 'claude-sonnet-4',
  tools: [],
  cost: 1,
};

// Logic for executing this agent would be in the orchestrator graph.
