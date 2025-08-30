'use server';
/**
 * @fileOverview Summarizes a conversation thread to provide a quick overview.
 *
 * - summarizeConversationThread - A function that summarizes the conversation thread.
 * - SummarizeConversationThreadInput - The input type for the summarizeConversationThread function.
 * - SummarizeConversationThreadOutput - The return type for the summarizeConversationThread function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationThreadInputSchema = z.object({
  thread:
    z.string().describe('The complete text of the conversation thread to summarize.'),
});
export type SummarizeConversationThreadInput = z.infer<
  typeof SummarizeConversationThreadInputSchema
>;

const SummarizeConversationThreadOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the provided conversation thread.'),
});
export type SummarizeConversationThreadOutput = z.infer<
  typeof SummarizeConversationThreadOutputSchema
>;

export async function summarizeConversationThread(
  input: SummarizeConversationThreadInput
): Promise<SummarizeConversationThreadOutput> {
  return summarizeConversationThreadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationThreadPrompt',
  input: {schema: SummarizeConversationThreadInputSchema},
  output: {schema: SummarizeConversationThreadOutputSchema},
  prompt: `Summarize the following conversation thread in a concise manner:

  {{{thread}}}`,
});

const summarizeConversationThreadFlow = ai.defineFlow(
  {
    name: 'summarizeConversationThreadFlow',
    inputSchema: SummarizeConversationThreadInputSchema,
    outputSchema: SummarizeConversationThreadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
