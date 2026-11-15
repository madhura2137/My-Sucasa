import { PropertyCard } from '@/components/property-card';
import { mockProperties } from '@/lib/placeholder-images';
import { PropertyFilters } from './property-filters';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

type PropertiesPageProps = {
  searchParams: {
    q?: string;
    type?: string;
    maxPrice?: string;
  };
};

function PropertyList({ q, type, maxPrice }: { q?: string; type?: string; maxPrice?: string; }) {
  const filteredProperties = mockProperties.filter(property => {
    const queryMatch = q ? property.location.toLowerCase().includes(q.toLowerCase()) : true;
    const typeMatch = type ? property.type.toLowerCase() === type.toLowerCase() : true;
    const priceMatch = maxPrice ? property.price <= Number(maxPrice) : true;
    return queryMatch && typeMatch && priceMatch;
  });

  return (
    <>
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold">No Properties Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </>
  )
}

function PropertyListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
         <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex justify-between items-center border-t pt-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { q, type, maxPrice } = searchParams;
  const key = JSON.stringify(searchParams);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold font-headline mb-2">Explore Properties</h1>
      <p className="text-lg text-muted-foreground mb-8">Find your next home from our curated list of properties.</p>
      
      <PropertyFilters />
      
      <Suspense key={key} fallback={<PropertyListSkeleton />}>
        <PropertyList q={q} type={type} maxPrice={maxPrice} />
      </Suspense>
    </div>
  );
}
