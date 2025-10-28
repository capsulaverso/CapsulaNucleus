// lib/ai/openai.ts
// This file will contain the setup and helper functions for interacting
// with the OpenAI API. This can be used as a fallback or for specific
// tools where OpenAI models might excel.

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAIResponse(prompt: string) {
  // const completion = await openai.chat.completions.create({ ... });
  // return completion;
}
