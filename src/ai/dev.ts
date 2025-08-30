import { config } from 'dotenv';
config();

import '@/ai/flows/find-relevant-document.ts';
import '@/ai/flows/summarize-conversation-thread.ts';
import '@/ai/flows/auto-tag-uploaded-documents.ts';