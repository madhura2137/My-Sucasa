'use server';

/**
 * @fileOverview AI-powered property recommendation flow.
 *
 * This file defines a Genkit flow that takes user preferences and browsing history as input
 * and returns a list of recommended properties.
 *
 * @fileOverview
 * - `getSuggestedProperties`: A function that retrieves property recommendations based on user input.
 * - `AISuggestedPropertiesInput`: The input type for the `getSuggestedProperties` function.
 * - `AISuggestedPropertiesOutput`: The output type for the `getSuggestedProperties` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the AI suggested properties flow
const AISuggestedPropertiesInputSchema = z.object({
  location: z.string().describe('The desired location for the property.'),
  priceRange: z.string().describe('The desired price range for the property.'),
  propertySize: z.string().describe('The desired property size (e.g., number of bedrooms, square footage).'),
  propertyType: z.string().describe('The type of property (e.g., house, apartment, condo).'),
  userPreferences: z.string().describe('Additional user preferences or requirements.'),
  browsingHistory: z.string().describe('The user browsing history'),
});
export type AISuggestedPropertiesInput = z.infer<typeof AISuggestedPropertiesInputSchema>;

// Output schema for the AI suggested properties flow
const AISuggestedPropertiesOutputSchema = z.object({
  propertyRecommendations: z.string().describe('A list of recommended properties based on the input criteria.'),
});
export type AISuggestedPropertiesOutput = z.infer<typeof AISuggestedPropertiesOutputSchema>;

// Wrapper function to call the flow
export async function getSuggestedProperties(input: AISuggestedPropertiesInput): Promise<AISuggestedPropertiesOutput> {
  return aiSuggestedPropertiesFlow(input);
}

// Define the prompt for the AI suggested properties flow
const prompt = ai.definePrompt({
  name: 'aiSuggestedPropertiesPrompt',
  input: {schema: AISuggestedPropertiesInputSchema},
  output: {schema: AISuggestedPropertiesOutputSchema},
  prompt: `You are an AI real estate expert. Based on the following user preferences and browsing history, recommend a list of properties.

User Preferences:
Location: {{{location}}}
Price Range: {{{priceRange}}}
Property Size: {{{propertySize}}}
Property Type: {{{propertyType}}}
Additional Preferences: {{{userPreferences}}}

Browsing History: {{{browsingHistory}}}

Provide a detailed description of each recommended property and explain why it matches the user's criteria.`, // Updated prompt to include browsing history
});

// Define the AI suggested properties flow
const aiSuggestedPropertiesFlow = ai.defineFlow(
  {
    name: 'aiSuggestedPropertiesFlow',
    inputSchema: AISuggestedPropertiesInputSchema,
    outputSchema: AISuggestedPropertiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
