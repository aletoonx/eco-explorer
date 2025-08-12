'use server';

/**
 * @fileoverview Este archivo define un flujo de Genkit para sugerir una ruta de exploración personalizada.
 *
 * Exports:
 * - suggestExplorationPath: La función principal que invoca el flujo de IA.
 * - SuggestExplorationPathInput: El tipo de entrada para la función.
 * - SuggestExplorationPathOutput: El tipo de salida de la función.
 */

import { ai } from '@/ai/genkit';
import { getAnimals, getFoundations } from '@/lib/data';
import { 
    SuggestExplorationPathInputSchema, 
    type SuggestExplorationPathInput, 
    SuggestExplorationPathOutputSchema,
    type SuggestExplorationPathOutput
} from '@/ai/schemas';
import { z } from 'zod';

// Plantilla de prompt de Handlebars
const PROMPT_TEMPLATE = `
Eres "Guía de Eco Explorer", un experto en ecoturismo en Costa Rica con un profundo conocimiento de la vida silvestre y las organizaciones de conservación locales.

Tu tarea es crear una ruta de exploración personalizada, atractiva y coherente para un usuario, basada en sus intereses.

**Contexto Disponible:**
Aquí tienes la lista de animales y fundaciones que conoces. Usa esta información para construir tu sugerencia. No inventes animales o fundaciones que no estén en estas listas.

*   **Animales Disponibles:**
    {{#each animals}}
    - {{this.name}} (Slug: {{this.slug}})
    {{/each}}

*   **Fundaciones Disponibles:**
    {{#each foundations}}
    - {{this.name}} en {{this.location}} (Slug: {{this.slug}})
    {{/each}}

**Instrucciones:**
1.  **Analiza la Petición del Usuario:**
    - Interés Principal: {{{interest}}}
    {{#if specificAnimal}}
    - Animal Específico de Interés: {{{specificAnimal}}}
    {{/if}}

2.  **Crea un Plan de Exploración:**
    - Diseña una ruta con 3 a 5 pasos.
    - La ruta debe ser lógica. Si el interés es un animal específico, empieza por ahí y luego sugiere fundaciones cercanas o que trabajen con esa especie.
    - Si el interés es general ("animales" o "fundaciones"), crea una ruta temática (ej. "Ruta de los Felinos", "Héroes de la Conservación de Guanacaste").
    - Cada paso debe tener un tipo ('animal' o 'foundation'), un nombre, un slug para el enlace y una razón clara de su inclusión.

3.  **Genera la Respuesta en el Formato JSON Requerido:**
    - **title:** Un título creativo para la ruta (ej. "Tras las Huellas del Jaguar" o "Santuarios de Vida Silvestre del Pacífico Central").
    - **description:** Un párrafo introductorio que "venda" la ruta al usuario, explicando el viaje que está a punto de emprender.
    - **steps:** Un array con los pasos de la ruta. Asegúrate de que los slugs que proporcionas coinciden exactamente con los de las listas de contexto.
`;

// Definición del Prompt de Genkit
const suggestExplorationPrompt = ai.definePrompt({
    name: 'suggestExplorationPrompt',
    input: { schema: SuggestExplorationPathInputSchema.extend({
        animals: z.any(),
        foundations: z.any(),
    }) },
    output: { schema: SuggestExplorationPathOutputSchema },
    prompt: PROMPT_TEMPLATE,
});

// Definición del Flujo de Genkit
const suggestExplorationPathFlow = ai.defineFlow(
  {
    name: 'suggestExplorationPathFlow',
    inputSchema: SuggestExplorationPathInputSchema,
    outputSchema: SuggestExplorationPathOutputSchema,
  },
  async (input) => {
    // 1. Obtener datos actualizados de la base de datos
    const animals = await getAnimals();
    const foundations = await getFoundations();

    // 2. Llamar al LLM con los datos como contexto
    const { output } = await suggestExplorationPrompt({
        ...input,
        animals: animals.map(a => ({ name: a.name, slug: a.slug })),
        foundations: foundations.map(f => ({ name: f.name, location: f.location, slug: f.slug })),
    });

    // 3. Devolver la salida estructurada
    return output!;
  }
);


// Función de exportación principal que se llamará desde el frontend
export async function suggestExplorationPath(input: SuggestExplorationPathInput): Promise<SuggestExplorationPathOutput> {
  return await suggestExplorationPathFlow(input);
}
