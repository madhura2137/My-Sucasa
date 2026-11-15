
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { View } from 'lucide-react';

interface ThreeDTourPlaceholderProps {
  imageUrl: string;
}

export function ThreeDTourPlaceholder({ imageUrl }: ThreeDTourPlaceholderProps) {
  return (
    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black group">
      <Image
        src={imageUrl}
        alt="Property background"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-500 flex items-center justify-center">
        <div className="text-center text-white">
          <View size={64} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">3D Tour Coming Soon</h3>
          <p className="text-lg opacity-80 mb-6">Get a feel for the space before you visit.</p>
          <Button variant="secondary" size="lg" disabled>
            <View className="mr-2 h-5 w-5" />
            Launch 3D Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
