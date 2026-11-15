
'use client';

import { mockProperties } from '@/lib/placeholder-images';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, Square, MapPin, Building, Home, CalendarIcon, Mail, Phone, User } from 'lucide-react';
import { ThreeDTourPlaceholder } from '@/components/ThreeDTourPlaceholder';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import PropertyMap from './map';
import NeighborhoodInsights from './neighborhood-insights';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type PropertyPageProps = {
  params: {
    id: string;
  };
};

// Placeholder for seller data
const mockSeller = {
  name: "Rohan Sharma",
  email: "rohan.sharma@example.com",
  phone: "+91 98765 43210",
  profilePhoto: "https://i.pravatar.cc/150?u=seller"
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = mockProperties.find(p => String(p.id) === params.id);
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!property) {
    notFound();
  }

  const features = [
    { icon: <BedDouble className="h-5 w-5" />, label: `${property.bedrooms} Bedrooms` },
    { icon: <Bath className="h-5 w-5" />, label: `${property.bathrooms} Bathrooms` },
    { icon: <Square className="h-5 w-5" />, label: `${property.area} sqft` },
    { icon: <Home className="h-5 w-5" />, label: property.type },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2">{property.type}</Badge>
                      <CardTitle className="text-4xl font-bold">{property.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-4xl font-bold text-primary" dangerouslySetInnerHTML={{ __html: `&#8377;${property.price.toLocaleString('en-IN')}` }} />
                      <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: `Est. EMI &#8377;${Math.round(property.price * 0.08 / 12).toLocaleString('en-IN')}/month` }} />
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3D Virtual Tour</CardTitle>
                  <CardDescription>Explore the property from the comfort of your home.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ThreeDTourPlaceholder imageUrl={property.image.imageUrl} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {features.map(feature => (
                      <div key={feature.label} className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center">
                        <div className="text-primary mb-2">{feature.icon}</div>
                        <span className="font-semibold">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">This beautiful {property.bedrooms} bed, {property.bathrooms} bath {property.type.toLowerCase()} in {property.location} offers {property.area} sqft of modern living space. Perfect for families or professionals looking for comfort and style.</p>
                  </div>
                </CardContent>
              </Card>
              <NeighborhoodInsights propertyAddress={property.location} />
            </div>
            
            <div className="space-y-8">
              <Card>
                 <CardHeader>
                  <CardTitle>Interested?</CardTitle>
                  <CardDescription>Schedule a visit or contact the owner.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Owner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mockSeller.profilePhoto} alt={mockSeller.name} />
                      <AvatarFallback>{mockSeller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{mockSeller.name}</h4>
                      <p className="text-sm text-muted-foreground">Property Owner</p>
                    </div>
                  </div>
                   <div className="space-y-2 text-sm pt-4 border-t">
                     <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${mockSeller.email}`} className="hover:underline">{mockSeller.email}</a>
                     </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{mockSeller.phone}</span>
                     </div>
                   </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <PropertyMap address={property.location} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
