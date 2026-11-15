export type Property = {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  images: string[];
  type: 'House' | 'Apartment' | 'Condo';
  favorite?: boolean;
};
