'use server';

/**
 * @fileOverview AI agent to find a document in the vault by name and provide a clickable link.
 *
 * - findRelevantDocument - A function that handles the document retrieval process.
 * - FindRelevantDocumentInput - The input type for the findRelevantDocument function.
 * - FindRelevantDocumentOutput - The return type for the findRelevantDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindRelevantDocumentInputSchema = z.object({
  documentName: z.string().describe('The name of the document to find.'),
});
export type FindRelevantDocumentInput = z.infer<typeof FindRelevantDocumentInputSchema>;

const FindRelevantDocumentOutputSchema = z.object({
  documentLink: z.string().describe('A clickable link to the document in the vault.'),
  documentFound: z.boolean().describe('Whether or not the document was found.'),
});
export type FindRelevantDocumentOutput = z.infer<typeof FindRelevantDocumentOutputSchema>;

export async function findRelevantDocument(input: FindRelevantDocumentInput): Promise<FindRelevantDocumentOutput> {
  return findRelevantDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findRelevantDocumentPrompt',
  input: {schema: FindRelevantDocumentInputSchema},
  output: {schema: FindRelevantDocumentOutputSchema},
  prompt: `You are a helpful assistant that helps users find documents in a vault.

  The user is looking for a document with the following name: {{{documentName}}}.

  If you find the document, provide a clickable link to the document. If you cannot find the document, return documentFound as false, and leave documentLink blank.

  Consider that the document may not exist, and be prepared to return documentFound as false.
`,
});

const findRelevantDocumentFlow = ai.defineFlow(
  {
    name: 'findRelevantDocumentFlow',
    inputSchema: FindRelevantDocumentInputSchema,
    outputSchema: FindRelevantDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
