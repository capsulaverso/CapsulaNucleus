// lib/agents/specialists/researcher.ts
// This file defines the Researcher agent.
// It is responsible for searching the web or internal databases for
// relevant information, trends, and data related to a given topic.

import { Agent } from '@/types/agents';

export const researcherAgent: Agent = {
  id: 'researcher',
  name: 'Pesquisador de Tendências',
  specialty: 'Searches for trends and relevant data.',
  description: 'An agent that performs web searches to find trends and data for a given topic.',
  systemPrompt: 'You are a master researcher. Given a topic, you must find the most relevant, recent, and impactful trends and data. You have access to a web search tool.',
  model: 'claude-sonnet-4',
  tools: ['web_search'], // Placeholder for a tool
  cost: 3,
};
