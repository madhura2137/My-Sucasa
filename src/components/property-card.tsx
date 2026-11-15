
import Image from 'next/image';
import type { Property } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { BedDouble, Bath, Square } from 'lucide-react';
import Link from 'next/link';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={property.image.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={property.image.imageHint}
          />
        </div>
        <CardContent className="p-4 space-y-2 flex flex-col">
          <div className="flex-grow">
            <p className="text-2xl font-bold text-primary" dangerouslySetInnerHTML={{ __html: `&#8377;${property.price.toLocaleString('en-IN')}` }} />
            <h3 className="text-lg font-semibold mt-1 truncate">{property.title}</h3>
            <p className="text-muted-foreground text-sm mt-1 truncate">{property.location}</p>
          </div>
          <div className="flex justify-between items-center text-muted-foreground text-sm border-t pt-3 mt-auto">
            <div className="flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
