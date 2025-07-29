// Implemented Genkit flow for personalized exploration path suggestions based on user interests.

'use server';

/**
 * @fileOverview AI-powered tool that suggests personalized exploration paths on the interactive map based on user interests.
 *
 * - suggestExplorationPath - A function that handles the suggestion of exploration paths.
 * - SuggestExplorationPathInput - The input type for the suggestExplorationPath function.
 * - SuggestExplorationPathOutput - The return type for the suggestExplorationPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestExplorationPathInputSchema = z.object({
  userInterests: z
    .string()
    .describe('The interests of the user, such as specific animals, habitats, or conservation topics.'),
  mapFeatures: z
    .string()
    .describe('A description of available features on the interactive map, including wildlife foundations and animal habitats.'),
});
export type SuggestExplorationPathInput = z.infer<typeof SuggestExplorationPathInputSchema>;

const SuggestExplorationPathOutputSchema = z.object({
  suggestedPath: z
    .string()
    .describe('A suggested exploration path on the interactive map, tailored to the user interests, in Spanish.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested path, explaining how it aligns with the user interests and map features, in Spanish.'),
});
export type SuggestExplorationPathOutput = z.infer<typeof SuggestExplorationPathOutputSchema>;

export async function suggestExplorationPath(input: SuggestExplorationPathInput): Promise<SuggestExplorationPathOutput> {
  return suggestExplorationPathFlow(input);
}

const suggestExplorationPathPrompt = ai.definePrompt({
  name: 'suggestExplorationPathPrompt',
  input: {schema: SuggestExplorationPathInputSchema},
  output: {schema: SuggestExplorationPathOutputSchema},
  prompt: `You are an AI assistant designed to suggest personalized exploration paths on an interactive map based on user interests. Your response must be in Spanish.

  Given the user's interests and the available features on the map, recommend a path that aligns with their interests.

  User Interests: {{{userInterests}}}
  Map Features: {{{mapFeatures}}}

  Suggest an exploration path and explain your reasoning for the suggestion. Be specific and provide detailed locations if possible.
  `,
});

const suggestExplorationPathFlow = ai.defineFlow(
  {
    name: 'suggestExplorationPathFlow',
    inputSchema: SuggestExplorationPathInputSchema,
    outputSchema: SuggestExplorationPathOutputSchema,
  },
  async input => {
    const {output} = await suggestExplorationPathPrompt(input);
    return output!;
  }
);
