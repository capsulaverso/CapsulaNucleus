// lib/agents/specialists/designer-expert.ts
// This file defines the Design Expert agent.
// This is a specialist agent summoned when the topic is related to design.
// It provides expert insights, critiques, and suggestions.

import { Agent } from '@/types/agents';

export const designerExpertAgent: Agent = {
  id: 'designer-expert',
  name: 'Especialista em Design',
  specialty: 'Provides expert-level insights on design topics.',
  systemPrompt: 'You are a world-renowned design director with 20 years of experience. You provide insightful, creative, and actionable advice on visual design, UX, and branding.',
  model: 'claude-sonnet-4',
  tools: [],
  cost: 5,
};
