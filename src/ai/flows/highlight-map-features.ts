'use server';

/**
 * @fileOverview Agente de IA para destacar las mejores características de las ubicaciones en el mapa interactivo.
 *
 * - highlightMapFeatures: Destaca características clave de ubicaciones del mapa usando IA.
 * - HighlightMapFeaturesInput: El tipo de entrada para la función highlightMapFeatures.
 * - HighlightMapFeaturesOutput: El tipo de retorno para la función highlightMapFeatures.
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
