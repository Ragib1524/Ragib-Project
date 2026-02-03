'use server';
/**
 * @fileOverview This file defines a Genkit flow for rewriting resume bullet points to sound more professional and impactful.
 *
 * rewriteResumeBulletPoints - A function that accepts a resume bullet point and rewrites it.
 * RewriteResumeBulletPointsInput - The input type for the rewriteResumeBulletPoints function.
 * RewriteResumeBulletPointsOutput - The return type for the rewriteResumeBulletPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteResumeBulletPointsInputSchema = z.object({
  bulletPoint: z.string().describe('The resume bullet point to rewrite.'),
  tone: z
    .enum(['Professional', 'Confident', 'Leadership-focused', 'Entry-level'])
    .describe('The desired tone for the rewritten bullet point.')
    .optional(),
  jobRole: z.string().describe('The job role the user is applying for.').optional(),
});
export type RewriteResumeBulletPointsInput = z.infer<typeof RewriteResumeBulletPointsInputSchema>;

const RewriteResumeBulletPointsOutputSchema = z.object({
  rewrittenBulletPoint: z.string().describe('The rewritten resume bullet point.'),
});
export type RewriteResumeBulletPointsOutput = z.infer<typeof RewriteResumeBulletPointsOutputSchema>;

export async function rewriteResumeBulletPoints(input: RewriteResumeBulletPointsInput): Promise<RewriteResumeBulletPointsOutput> {
  return rewriteResumeBulletPointsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteResumeBulletPointsPrompt',
  input: {schema: RewriteResumeBulletPointsInputSchema},
  output: {schema: RewriteResumeBulletPointsOutputSchema},
  prompt: `You are a resume expert. Rewrite the following resume bullet point to be more professional and impactful, and optimized for Applicant Tracking Systems (ATS). Consider the job role, if provided, and the desired tone.

Bullet Point: {{{bulletPoint}}}

Job Role: {{{jobRole}}}

Tone: {{{tone}}}

Rewritten Bullet Point:`,
});

const rewriteResumeBulletPointsFlow = ai.defineFlow(
  {
    name: 'rewriteResumeBulletPointsFlow',
    inputSchema: RewriteResumeBulletPointsInputSchema,
    outputSchema: RewriteResumeBulletPointsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
