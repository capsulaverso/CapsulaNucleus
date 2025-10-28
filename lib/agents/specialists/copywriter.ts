// lib/agents/specialists/copywriter.ts
// This file defines the Copywriter agent.
// This agent specializes in refining text to be more engaging, persuasive,
// and clear. It's often one of the final steps in a content generation workflow.

import { Agent } from '@/types/agents';

export const copywriterAgent: Agent = {
  id: 'copywriter',
  name: 'Copywriter Pro',
  specialty: 'Refines and enhances text for maximum impact.',
  systemPrompt: 'You are a senior copywriter from a top-tier advertising agency. Your job is to take existing text and elevate it, making it punchier, clearer, and more compelling. You have a keen eye for tone and voice.',
  model: 'claude-sonnet-4',
  tools: [],
  cost: 4,
};
