'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AISuggestionsInputSchema = z.object({
  locationPreferences: z.string().describe('The desired location for the property.'),
  propertyType: z.string().describe('The type of property (e.g., house, apartment, condo).'),
  priceRange: z.string().describe('The desired price range for the property.'),
  features: z.string().describe('Desired features in the property.'),
  otherPreferences: z.string().describe('Any other user preferences.'),
});

const AISuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A detailed paragraph of property suggestions based on the user criteria.'),
});

export async function generatePropertySuggestions(
  input: z.infer<typeof AISuggestionsInputSchema>
): Promise<z.infer<typeof AISuggestionsOutputSchema>> {
  const prompt = ai.definePrompt(
    {
      name: 'propertySuggestionsPrompt',
      input: { schema: AISuggestionsInputSchema },
      output: { schema: AISuggestionsOutputSchema },
      prompt: `You are an expert real estate agent. Based on the following criteria, generate a helpful paragraph of property suggestions for the user. Be friendly and conversational.

      - Location: {{{locationPreferences}}}
      - Property Type: {{{propertyType}}}
      - Price Range: {{{priceRange}}}
      - Features: {{{features}}}
      - Other Notes: {{{otherPreferences}}}
      `,
    },
  );

  const { output } = await prompt(input);
  return output!;
}
