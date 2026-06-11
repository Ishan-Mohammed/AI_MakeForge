import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("CRITICAL ERROR: Neither GOOGLE_GENAI_API_KEY nor GEMINI_API_KEY is defined in the environment. Genkit calls will fail.");
}

export const ai = genkit({
  plugins: [googleAI({ apiKey: apiKey || 'DUMMY_KEY_TO_PREVENT_STARTUP_CRASH' })],
  model: 'googleai/gemini-2.5-flash',
});
