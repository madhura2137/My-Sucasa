
'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { geocodeAddress } from '@/ai/flows/geocode';
import { Loader2, AlertTriangle } from 'lucide-react';

type Coords = {
  lat: number;
  lng: number;
};

export default function PropertyMap({ address }: { address: string }) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!googleMapsApiKey) {
      setError('Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.');
      setLoading(false);
      return;
    }

    const fetchCoordinates = async () => {
      try {
        setLoading(true);
        const result = await geocodeAddress({ address });
        setCoords(result);
      } catch (e: any) {
        console.error('Geocoding failed:', e);
        setError(e.message || 'Could not find coordinates for the address. Ensure the Geocoding API is enabled.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address, googleMapsApiKey]);

  if (loading) {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  if (error || !googleMapsApiKey) {
    return (
      <div className="h-64 bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4">
        <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
        <h4 className="font-semibold text-lg text-destructive">Map Error</h4>
        <p className="text-muted-foreground text-sm max-w-sm mt-2">
          {error || 'The map cannot be displayed because the API key is not configured.'}
        </p>
      </div>
    );
  }
  
  if (!coords) {
     return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Could not load map for this location.</p>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden">
        <APIProvider apiKey={googleMapsApiKey}>
            <Map
            defaultCenter={coords}
            defaultZoom={15}
            mapId="MySuCasaPropertyMap"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            className="h-full w-full"
            >
            <Marker position={coords} />
            </Map>
        </APIProvider>
    </div>
  );
}
