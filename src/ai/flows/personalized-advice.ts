'use server';
/**
 * @fileOverview A personalized advice AI agent.
 *
 * - personalizedAdvice - A function that handles the personalized advice process.
 * - PersonalizedAdviceInput - The input type for the personalizedAdvice function.
 * - PersonalizedAdviceOutput - The return type for the personalizedAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAdviceInputSchema = z.object({
  chatHistory: z
    .string()
    .describe("The user's chat history with the chatbot."),
  userInput: z.string().describe('The user input message.'),
});
export type PersonalizedAdviceInput = z.infer<typeof PersonalizedAdviceInputSchema>;

const PersonalizedAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized advice from the chatbot based on the chat history and user input.'),
});
export type PersonalizedAdviceOutput = z.infer<typeof PersonalizedAdviceOutputSchema>;

export async function personalizedAdvice(input: PersonalizedAdviceInput): Promise<PersonalizedAdviceOutput> {
  return personalizedAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAdvicePrompt',
  input: {schema: PersonalizedAdviceInputSchema},
  output: {schema: PersonalizedAdviceOutputSchema},
  prompt: `You are a helpful chatbot designed to give personalized advice to teenagers based on their chat history and current input.\n\nChat History:\n{{{chatHistory}}}\n\nUser Input:\n{{{userInput}}}\n\nBased on the chat history and user input, provide personalized advice to the user.\n`,
});

const personalizedAdviceFlow = ai.defineFlow(
  {
    name: 'personalizedAdviceFlow',
    inputSchema: PersonalizedAdviceInputSchema,
    outputSchema: PersonalizedAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
