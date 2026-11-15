
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { propertyTypes } from '@/lib/placeholder-images'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AiSuggestionModal } from './ai-suggestion-modal';
import { Slider } from '@/components/ui/slider';
import React from 'react';

export function PropertyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleParamChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.trim() !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/properties?${params.toString()}`);
  }
  
  const clearFilters = () => {
    router.replace('/properties');
  };

  const hasFilters = !!(searchParams.get('q') || searchParams.get('type') || searchParams.get('maxPrice'));
  const maxPrice = Number(searchParams.get('maxPrice') || 50000000);

  return (
    <div className="p-6 bg-card rounded-lg shadow-sm border mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium">Search by Location</label>
          <Input
            id="search"
            placeholder="e.g., Mumbai, Bangalore"
            defaultValue={searchParams.get('q') || ''}
            onChange={(e) => handleParamChange('q', e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">Property Type</label>
          <Select
            value={searchParams.get('type') || 'all'}
            onValueChange={(value) => handleParamChange('type', value === 'all' ? null : value)}
          >
            <SelectTrigger id="type" className="bg-background">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Type</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="price" className="text-sm font-medium flex justify-between">
            <span>Max Price:</span> 
            <span className="font-bold text-primary" dangerouslySetInnerHTML={{ __html: `&#8377;${maxPrice.toLocaleString('en-IN')}` }} />
          </label>
          <Slider
            id="price"
            min={5000000}
            max={50000000}
            step={1000000}
            defaultValue={[maxPrice]}
            onValueChange={(value) => handleParamChange('maxPrice', String(value[0]))}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-end mt-6 border-t pt-6">
          <div className="flex gap-2">
             {hasFilters && (
                <Button variant="ghost" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
                </Button>
            )}
            <AiSuggestionModal />
          </div>
      </div>
    </div>
  )
}
