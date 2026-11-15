'use server';

/**
 * @fileOverview A neighborhood insights AI agent.
 *
 * - getNeighborhoodInsights - A function that handles the neighborhood insights process.
 * - NeighborhoodInsightsInput - The input type for the getNeighborhoodInsights function.
 * - NeighborhoodInsightsOutput - The return type for the getNeighborhoodInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NeighborhoodInsightsInputSchema = z.object({
  propertyAddress: z
    .string()
    .describe('The address of the property for which neighborhood insights are desired.'),
});
export type NeighborhoodInsightsInput = z.infer<typeof NeighborhoodInsightsInputSchema>;

const NeighborhoodInsightsOutputSchema = z.object({
  schools: z.string().describe('Information about nearby schools.'),
  amenities: z.string().describe('Information about nearby amenities, such as restaurants, parks, and shops.'),
  safetyRatings: z.string().describe('Information about the safety ratings of the neighborhood.'),
  overallImpression: z
    .string()
    .describe('An overall impression of the neighborhood, summarizing its key characteristics.'),
});
export type NeighborhoodInsightsOutput = z.infer<typeof NeighborhoodInsightsOutputSchema>;

export async function getNeighborhoodInsights(input: NeighborhoodInsightsInput): Promise<NeighborhoodInsightsOutput> {
  return neighborhoodInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'neighborhoodInsightsPrompt',
  input: {schema: NeighborhoodInsightsInputSchema},
  output: {schema: NeighborhoodInsightsOutputSchema},
  prompt: `You are a real estate expert providing insights about neighborhoods.

  Provide insights about the neighborhood of the following property address:
  {{{propertyAddress}}}

  Include information about schools, amenities, and safety ratings.
  Also, provide an overall impression of the neighborhood.

  Format the output as a JSON object.
  `,
});

const neighborhoodInsightsFlow = ai.defineFlow(
  {
    name: 'neighborhoodInsightsFlow',
    inputSchema: NeighborhoodInsightsInputSchema,
    outputSchema: NeighborhoodInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
