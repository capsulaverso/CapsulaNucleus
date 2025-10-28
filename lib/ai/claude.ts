// lib/ai/claude.ts
// This file will contain the setup and helper functions for interacting
// with the Anthropic Claude API. It will handle client initialization,
// API calls, and streaming responses.

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getClaudeResponse(prompt: string) {
  // const msg = await anthropic.messages.create({ ... });
  // return msg;
}

// Add functions for streaming responses here.
