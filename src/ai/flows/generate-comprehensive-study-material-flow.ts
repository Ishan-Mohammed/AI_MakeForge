'use server';
/**
 * @fileOverview A Genkit flow that generates essential study materials for the MindForge AI internship requirements.
 *
 * - generateComprehensiveStudyMaterial - A function that handles the study material generation process.
 * - GenerateStudyMaterialInput - The input type for the function.
 * - GenerateStudyMaterialOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FlashcardSchema = z.object({
  question: z.string().describe('A clear, challenging question.'),
  answer: z.string().describe('A concise, accurate answer.'),
});

const KeyConceptSchema = z.object({
  concept: z.string().describe('The name of the concept.'),
  explanation: z.string().describe('A brief explanation of why this concept is important.'),
});

const RevisionCardSchema = z.object({
  title: z.string().describe('The topic heading.'),
  points: z.array(z.string()).describe('3-5 bullet points summarizing the most critical exam info.'),
});

const GenerateStudyMaterialInputSchema = z.object({
  lessonContent: z.string().describe('The raw text to be synthesized.'),
});

export type GenerateStudyMaterialInput = z.infer<typeof GenerateStudyMaterialInputSchema>;

const GenerateStudyMaterialOutputSchema = z.object({
  flashcards: z.array(FlashcardSchema).describe('Minimum 10 high-quality flashcards.'),
  keyConcepts: z.array(KeyConceptSchema).describe('The most important key concepts extracted.'),
  revisionCards: z.array(RevisionCardSchema).describe('Concise, scanable revision cards in bullet points.'),
});

export type GenerateStudyMaterialOutput = z.infer<typeof GenerateStudyMaterialOutputSchema>;

export async function generateComprehensiveStudyMaterial(
  input: GenerateStudyMaterialInput
): Promise<GenerateStudyMaterialOutput> {
  try {
    return await generateStudyMaterialFlow(input);
  } catch (error) {
    console.error("Error in generateComprehensiveStudyMaterial flow:", error);
    throw error;
  }
}

const studyMaterialPrompt = ai.definePrompt({
  name: 'studyMaterialPrompt',
  input: { schema: GenerateStudyMaterialInputSchema },
  output: { schema: GenerateStudyMaterialOutputSchema },
  prompt: `You are an expert educational designer. Transform the following lesson content into a structured study package.

Input Content:
"""
{{{lessonContent}}}
"""

Requirements:
1. Flashcards: Generate exactly 10-12 flashcards. Each must have a clear 'question' and 'answer'.
2. Key Concepts: Extract 5-8 central concepts. Provide the 'concept' name and a one-sentence 'explanation'.
3. Revision Cards: Create 4-6 topical 'revisionCards'. Each should have a 'title' and 3-5 'points' (bullet points) summarizing critical exam information.

Focus on clarity, accuracy, and exam relevance. Output ONLY valid JSON.`,
});

const generateStudyMaterialFlow = ai.defineFlow(
  {
    name: 'generateStudyMaterialFlow',
    inputSchema: GenerateStudyMaterialInputSchema,
    outputSchema: GenerateStudyMaterialOutputSchema,
  },
  async (input) => {
    const { output } = await studyMaterialPrompt(input);
    return output!;
  }
);