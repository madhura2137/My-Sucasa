"use client";
/**
 * Placeholder component for flows that are not yet implemented
 */
import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const FlowHeader = ({ showBackButton, onBack, title }: { showBackButton: boolean; onBack: () => void; title: string }) => (
    <div className="flex items-center gap-4 mb-8">
        {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
            </Button>
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
    </div>
)

interface PlaceholderFlowProps {
  onBack: () => void;
  title: string;
  description: string;
  emoji: string;
}

export const PlaceholderFlow: React.FC<PlaceholderFlowProps> = ({ 
  onBack, 
  title, 
  description, 
  emoji 
}) => {
  return (
    <div className="min-h-screen">
      <FlowHeader 
        showBackButton={true} 
        onBack={onBack}
        title={title}
      />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-5xl">
            {emoji}
          </div>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            {description}
          </p>
          <Button
            onClick={onBack}
          >
            Back to User Types
          </Button>
        </div>
      </div>
    </div>
  );
};
