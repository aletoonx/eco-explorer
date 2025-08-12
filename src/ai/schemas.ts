/**
 * @fileoverview Este archivo define los esquemas de Zod y los tipos de TypeScript para los flujos de Genkit.
 * Se separa para evitar problemas con la directiva "use server" de Next.js.
 */

import { z } from 'zod';

// Esquema de entrada Zod para suggestExplorationPath
export const SuggestExplorationPathInputSchema = z.object({
  interest: z.string().describe('El interés principal del usuario (ej. "animales", "fundaciones", "ambos").'),
  specificAnimal: z.string().optional().describe('Un animal específico de interés si se proporciona.'),
});
export type SuggestExplorationPathInput = z.infer<typeof SuggestExplorationPathInputSchema>;


// Esquema de salida Zod para suggestExplorationPath
export const SuggestExplorationPathOutputSchema = z.object({
  title: z.string().describe("Un título creativo y llamativo para la ruta de exploración sugerida."),
  description: z.string().describe("Una descripción de 1-2 párrafos que explique la ruta y por qué es interesante para el usuario."),
  steps: z.array(z.object({
    type: z.enum(['animal', 'foundation']).describe("El tipo de parada en la ruta (un animal o una fundación)."),
    name: z.string().describe("El nombre del animal o la fundación."),
    reason: z.string().describe("Una breve explicación (1-2 frases) de por qué esta parada es relevante para la ruta."),
    slug: z.string().describe("El slug único para enlazar a la página de detalles del animal o fundación.")
  })).describe("Una lista de 3 a 5 pasos o paradas en la ruta de exploración.")
});
export type SuggestExplorationPathOutput = z.infer<typeof SuggestExplorationPathOutputSchema>;
