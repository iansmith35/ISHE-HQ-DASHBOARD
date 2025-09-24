'use server';
/**
 * @fileOverview An AI agent to automatically tag uploaded documents.
 *
 * - autoTagDocument - A function that handles the document tagging process.
 * - AutoTagDocumentInput - The input type for the autoTagDocument function.
 * - AutoTagDocumentOutput - The return type for the autoTagDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTagDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentName: z.string().describe('The name of the document.'),
  ocrText: z.string().optional().describe('The OCR text extracted from the document, if available.'),
});
export type AutoTagDocumentInput = z.infer<typeof AutoTagDocumentInputSchema>;

const AutoTagDocumentOutputSchema = z.object({
  tags: z.array(z.string()).describe('A list of tags generated for the document.'),
});
export type AutoTagDocumentOutput = z.infer<typeof AutoTagDocumentOutputSchema>;

export async function autoTagDocument(input: AutoTagDocumentInput): Promise<AutoTagDocumentOutput> {
  return autoTagDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoTagDocumentPrompt',
  input: {schema: AutoTagDocumentInputSchema},
  output: {schema: AutoTagDocumentOutputSchema},
  prompt: `You are an expert document tagger. Your job is to generate relevant tags for documents based on their content and name.

Document Name: {{{documentName}}}

Content: {{{ocrText}}}

Generate a list of tags that describe the document. The tags should be concise and relevant. Consider the document's topic, keywords, and purpose.
Tags:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const autoTagDocumentFlow = ai.defineFlow(
  {
    name: 'autoTagDocumentFlow',
    inputSchema: AutoTagDocumentInputSchema,
    outputSchema: AutoTagDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
