import { PropertyCard } from '@/components/property-card';
import { mockProperties } from '@/lib/placeholder-images';
import type { Property } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const favoriteProperties = mockProperties.filter(p => p.favorite);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-headline text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg text-muted-foreground mt-1">Here are your saved properties and settings.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">My Favorite Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't favorited any properties yet. Start searching to find homes you love!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
