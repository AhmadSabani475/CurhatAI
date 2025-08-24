'use server';

import { analyzeTopic } from '@/ai/flows/analyze-topic';
import { personalizedAdvice } from '@/ai/flows/personalized-advice';
import type { Message } from '@/types';

export async function getAiResponse(
  messages: Message[]
): Promise<string> {
  const userInput = messages.findLast((m) => m.role === 'user')?.content || '';
  const chatHistory = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');

  try {
    const result = await personalizedAdvice({ chatHistory, userInput });
    return result.advice;
  } catch (error) {
    console.error('Error getting personalized advice:', error);
    return 'Maaf, ada sedikit gangguan. Coba lagi nanti ya.';
  }
}

export async function getTopicAnalysis(messages: Message[]) {
  if (messages.length === 0) {
    return { topics: [], summary: "Belum ada percakapan untuk dianalisis." };
  }
  const chatHistory = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');
  try {
    const result = await analyzeTopic({ chatHistory });
    return result;
  } catch (error) {
    console.error('Error analyzing topic:', error);
    return { topics: [], summary: "Gagal menganalisis topik percakapan." };
  }
}
