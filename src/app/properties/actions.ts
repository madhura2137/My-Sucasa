'use server';

import { generatePropertySuggestions } from '@/ai/flows/generate-property-suggestions';
import { z } from 'zod';

const formSchema = z.object({
  locationPreferences: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  propertyType: z.string(),
  priceRange: z.string().min(2, {
    message: "Price range is required.",
  }),
  features: z.string(),
  otherPreferences: z.string(),
});

export async function getAiSuggestions(values: z.infer<typeof formSchema>) {
  try {
    const result = await generatePropertySuggestions(values);
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate suggestions. Please try again." };
  }
}
