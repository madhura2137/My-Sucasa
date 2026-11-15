import data from './placeholder-images.json';

export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  favorite: boolean;
  image: {
    imageUrl: string;
    imageHint: string;
  }
};

export const mockProperties: Property[] = data.placeholderImages;

export const propertyTypes = [...new Set(mockProperties.map(p => p.type))];
