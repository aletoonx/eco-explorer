'use server';

/**
 * @fileOverview An AI agent for highlighting the best features of locations on the interactive map.
 *
 * - highlightMapFeatures - A function that highlights key features of map locations using AI.
 * - HighlightMapFeaturesInput - The input type for the highlightMapFeatures function.
 * - HighlightMapFeaturesOutput - The return type for the highlightMapFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightMapFeaturesInputSchema = z.object({
  locationName: z.string().describe('The name of the location on the map.'),
  foundationActivities: z
    .string()
    .describe('A summary of recent foundation activities at the location.'),
});
export type HighlightMapFeaturesInput = z.infer<typeof HighlightMapFeaturesInputSchema>;

const HighlightMapFeaturesOutputSchema = z.object({
  highlightedFeatures: z
    .string()
    .describe('A highlighted summary of the best features of the location, in Spanish.'),
});
export type HighlightMapFeaturesOutput = z.infer<typeof HighlightMapFeaturesOutputSchema>;

export async function highlightMapFeatures(
  input: HighlightMapFeaturesInput
): Promise<HighlightMapFeaturesOutput> {
  return highlightMapFeaturesFlow(input);
}

const highlightMapFeaturesPrompt = ai.definePrompt({
  name: 'highlightMapFeaturesPrompt',
  input: {schema: HighlightMapFeaturesInputSchema},
  output: {schema: HighlightMapFeaturesOutputSchema},
  prompt: `You are an AI assistant designed to highlight the best features of a location on an interactive map for Eco Explorer. Your response must be in Spanish. Consider the foundation activities at the location.

Location Name: {{{locationName}}}
Foundation Activities: {{{foundationActivities}}}

Highlight the most significant aspects of this location in a concise summary. Focus on what makes this location particularly interesting or important for Eco Explorer users.`,
});

const highlightMapFeaturesFlow = ai.defineFlow(
  {
    name: 'highlightMapFeaturesFlow',
    inputSchema: HighlightMapFeaturesInputSchema,
    outputSchema: HighlightMapFeaturesOutputSchema,
  },
  async input => {
    const {output} = await highlightMapFeaturesPrompt(input);
    return output!;
  }
);
