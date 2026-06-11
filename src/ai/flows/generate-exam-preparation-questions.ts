'use server';
/**
 * @fileOverview A Genkit flow that generates various exam preparation questions (short answer, long answer, MCQs) based on study material.
 *
 * - generateExamPreparationQuestions - A function that handles the generation process.
 * - GenerateExamPreparationQuestionsInput - The input type for the generateExamPreparationQuestions function.
 * - GenerateExamPreparationQuestionsOutput - The return type for the generateExamPreparationQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateExamPreparationQuestionsInputSchema = z.object({
  studyMaterial: z.string().describe('The study material content from which to generate questions.'),
});
export type GenerateExamPreparationQuestionsInput = z.infer<typeof GenerateExamPreparationQuestionsInputSchema>;

const GenerateExamPreparationQuestionsOutputSchema = z.object({
  shortQuestions: z
    .array(z.string())
    .min(5)
    .max(5)
    .describe('An array of 5 short answer questions based on the study material.'),
  longQuestions: z
    .array(z.string())
    .min(5)
    .max(5)
    .describe('An array of 5 long answer questions based on the study material.'),
  mcqs: z
    .array(
      z.object({
        question: z.string().describe('The multiple-choice question.'),
        options: z.array(z.string()).min(4).max(4).describe('An array of 4 possible answer options.'),
        correctAnswer: z.string().describe('The correct answer option.'),
      })
    )
    .min(5)
    .max(5)
    .describe('An array of 5 multiple-choice questions, each with 4 options and a correct answer.'),
});
export type GenerateExamPreparationQuestionsOutput = z.infer<typeof GenerateExamPreparationQuestionsOutputSchema>;

export async function generateExamPreparationQuestions(
  input: GenerateExamPreparationQuestionsInput
): Promise<GenerateExamPreparationQuestionsOutput> {
  try {
    return await generateExamPreparationQuestionsFlow(input);
  } catch (error) {
    console.error("Error in generateExamPreparationQuestions flow:", error);
    throw error;
  }
}

const examPrepPrompt = ai.definePrompt({
  name: 'examPreparationQuestionsPrompt',
  input: { schema: GenerateExamPreparationQuestionsInputSchema },
  output: { schema: GenerateExamPreparationQuestionsOutputSchema },
  prompt: `You are an AI assistant specialized in generating exam preparation questions.
Your task is to create a variety of questions based on the provided study material, formatted as JSON.

Generate exactly 5 short answer questions, 5 long answer questions, and 5 multiple-choice questions.
For each multiple-choice question, provide 4 distinct options and clearly indicate the correct answer.

Ensure all generated questions are directly relevant to the study material and test key understanding.

Study Material:
"""{{{studyMaterial}}}"""`,
});

const generateExamPreparationQuestionsFlow = ai.defineFlow(
  {
    name: 'generateExamPreparationQuestionsFlow',
    inputSchema: GenerateExamPreparationQuestionsInputSchema,
    outputSchema: GenerateExamPreparationQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await examPrepPrompt(input);
    return output!;
  }
);
