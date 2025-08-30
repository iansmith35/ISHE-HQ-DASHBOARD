import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: {
    provider: 'googleai',
    name: 'gemini-2.5-flash',
  },
});
