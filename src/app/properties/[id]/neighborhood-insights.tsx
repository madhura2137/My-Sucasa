'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getNeighborhoodInsights } from '@/ai/flows/ai-neighborhood-insights';
import type { NeighborhoodInsightsOutput } from '@/ai/flows/ai-neighborhood-insights';
import { useToast } from '@/hooks/use-toast';
import { Loader2, School, ShoppingCart, Shield, Sparkles } from 'lucide-react';

type NeighborhoodInsightsProps = {
  propertyAddress: string;
};

export default function NeighborhoodInsights({ propertyAddress }: NeighborhoodInsightsProps) {
  const [insights, setInsights] = useState<NeighborhoodInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await getNeighborhoodInsights({ propertyAddress });
      setInsights(result);
    } catch (error) {
      console.error('Failed to get neighborhood insights:', error);
      toast({
        variant: 'destructive',
        title: 'Insight Generation Failed',
        description: 'There was a problem getting neighborhood details. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Neighborhood Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {!insights && !isLoading && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Want to know more about the area? Let our AI provide a detailed analysis of the neighborhood.
            </p>
            <Button onClick={handleGetInsights} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                 <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>
        )}
        {isLoading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Our AI is analyzing the neighborhood...</p>
            </div>
        )}
        {insights && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold flex items-center mb-2"><School className="mr-2 h-5 w-5 text-primary"/>Schools</h4>
              <p className="text-muted-foreground text-sm">{insights.schools}</p>
            </div>
             <div>
              <h4 className="font-semibold flex items-center mb-2"><ShoppingCart className="mr-2 h-5 w-5 text-primary"/>Amenities</h4>
              <p className="text-muted-foreground text-sm">{insights.amenities}</p>
            </div>
             <div>
              <h4 className="font-semibold flex items-center mb-2"><Shield className="mr-2 h-5 w-5 text-primary"/>Safety</h4>
              <p className="text-muted-foreground text-sm">{insights.safetyRatings}</p>
            </div>
             <div className="border-t pt-4">
              <h4 className="font-semibold flex items-center mb-2"><Sparkles className="mr-2 h-5 w-5 text-primary"/>Overall Impression</h4>
              <p className="text-muted-foreground text-sm">{insights.overallImpression}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
