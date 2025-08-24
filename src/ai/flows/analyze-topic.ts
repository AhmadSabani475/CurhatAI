// use server'
'use server';
/**
 * @fileOverview A topic analysis AI agent.
 *
 * - analyzeTopic - A function that handles the topic analysis process.
 * - AnalyzeTopicInput - The input type for the analyzeTopic function.
 * - AnalyzeTopicOutput - The return type for the analyzeTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTopicInputSchema = z.object({
  chatHistory: z
    .string()
    .describe(
      'The complete chat history of the user with the chatbot.'
    ),
});
export type AnalyzeTopicInput = z.infer<typeof AnalyzeTopicInputSchema>;

const AnalyzeTopicOutputSchema = z.object({
  topics: z.array(z.string()).describe('The topics discussed in the chat history.'),
  summary: z.string().describe('A summary of the chat history.'),
});
export type AnalyzeTopicOutput = z.infer<typeof AnalyzeTopicOutputSchema>;

export async function analyzeTopic(input: AnalyzeTopicInput): Promise<AnalyzeTopicOutput> {
  return analyzeTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTopicPrompt',
  input: {schema: AnalyzeTopicInputSchema},
  output: {schema: AnalyzeTopicOutputSchema},
  prompt: `You are an expert AI topic analyzer. Review the chat history and determine the different topics the user is talking about.  Also provide a summary of the conversation. Return the topics as an array of strings and the summary as a string.

Chat History: {{{chatHistory}}}`,
});

const analyzeTopicFlow = ai.defineFlow(
  {
    name: 'analyzeTopicFlow',
    inputSchema: AnalyzeTopicInputSchema,
    outputSchema: AnalyzeTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
