'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing role-specific suggestions to enhance a resume.
 *
 * - getRoleSpecificSuggestions - A function that suggests improvements to a resume based on a specific job role.
 * - GetRoleSpecificSuggestionsInput - The input type for the getRoleSpecificSuggestions function.
 * - GetRoleSpecificSuggestionsOutput - The return type for the getRoleSpecificSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetRoleSpecificSuggestionsInputSchema = z.object({
  jobRole: z.string().describe('The job role the user is applying for.'),
  resumeContent: z.string().describe('The current content of the resume.'),
});
export type GetRoleSpecificSuggestionsInput = z.infer<typeof GetRoleSpecificSuggestionsInputSchema>;

const GetRoleSpecificSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('AI-powered suggestions for improving the resume based on the specified job role.'),
});
export type GetRoleSpecificSuggestionsOutput = z.infer<typeof GetRoleSpecificSuggestionsOutputSchema>;

export async function getRoleSpecificSuggestions(
  input: GetRoleSpecificSuggestionsInput
): Promise<GetRoleSpecificSuggestionsOutput> {
  return getRoleSpecificSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getRoleSpecificSuggestionsPrompt',
  input: {schema: GetRoleSpecificSuggestionsInputSchema},
  output: {schema: GetRoleSpecificSuggestionsOutputSchema},
  prompt: `You are an expert career advisor specializing in resume optimization.

  Based on the job role provided, analyze the resume content and suggest specific improvements.
  Consider skills, experience, and keywords relevant to the role.

  Job Role: {{{jobRole}}}
  Resume Content: {{{resumeContent}}}

  Provide suggestions on how to tailor the resume to better fit the specified job role.
  Be concise and actionable.
  Response should be in markdown format.
  `,
});

const getRoleSpecificSuggestionsFlow = ai.defineFlow(
  {
    name: 'getRoleSpecificSuggestionsFlow',
    inputSchema: GetRoleSpecificSuggestionsInputSchema,
    outputSchema: GetRoleSpecificSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
