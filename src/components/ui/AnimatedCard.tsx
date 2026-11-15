
"use client"
/**
 * AI-themed animated card with holographic effects
 */
import React from 'react';
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <div
      className={cn(
        'relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl',
        'bg-card/60 dark:bg-black/20 backdrop-blur-sm border dark:border-cyan-400/30 rounded-2xl overflow-hidden',
        'dark:hover:border-cyan-400/50 dark:hover:shadow-cyan-500/20',
        className
      )}
      onClick={onClick}
    >
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-xl transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-xl transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
    </div>
  );
};

