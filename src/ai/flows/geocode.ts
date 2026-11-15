
'use server';

/**
 * @fileOverview Geocoding flow to convert addresses to coordinates.
 *
 * - geocodeAddress - A function that converts an address string to latitude and longitude.
 * - GeocodeInput - The input type for the geocodeAddress function.
 * - GeocodeOutput - The return type for the geocodeAddress function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

const GeocodeInputSchema = z.object({
  address: z.string().describe('The address to geocode.'),
});
export type GeocodeInput = z.infer<typeof GeocodeInputSchema>;

const GeocodeOutputSchema = z.object({
  lat: z.number().describe('The latitude of the address.'),
  lng: z.number().describe('The longitude of the address.'),
});
export type GeocodeOutput = z.infer<typeof GeocodeOutputSchema>;

export async function geocodeAddress(input: GeocodeInput): Promise<GeocodeOutput> {
  return geocodeFlow(input);
}

const geocodeTool = ai.defineTool(
  {
    name: 'geocodeTool',
    description: 'Converts an address to latitude and longitude coordinates.',
    inputSchema: GeocodeInputSchema,
    outputSchema: GeocodeOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured for server-side use. Please set GOOGLE_MAPS_API_KEY in your .env.local file.');
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      input.address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json() as any;
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error(`Geocoding failed: ${data.status}. Ensure Geocoding API is enabled and the API key is correct.`);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to fetch coordinates from Google Maps API.');
    }
  }
);


const geocodeFlow = ai.defineFlow(
  {
    name: 'geocodeFlow',
    inputSchema: GeocodeInputSchema,
    outputSchema: GeocodeOutputSchema,
  },
  async (input) => {
    return await geocodeTool(input);
  }
);
