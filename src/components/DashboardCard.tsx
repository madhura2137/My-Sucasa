"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface DashboardCardProps {
  title: string;
  description: string;
  aiFeature: string;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'teal' | 'green' | 'blue' | 'orange';
  flow: string;
  onClick: () => void;
}

const colorVariants = {
  cyan: {
    bg: 'dark:bg-cyan-950/40 bg-cyan-100',
    border: 'border-cyan-500/30 dark:border-cyan-800/50',
    shadow: 'hover:shadow-cyan-500/10',
    dot: 'bg-cyan-400',
    iconBg: 'dark:bg-cyan-900/50 bg-cyan-100',
    text: 'text-cyan-900 dark:text-cyan-100',
    descriptionText: 'text-cyan-800/90 dark:text-cyan-300/80',
    aiFeatureText: 'text-cyan-700 dark:text-cyan-200',
    aiFeatureBorder: 'border-cyan-500/30 dark:border-cyan-800'
  },
  purple: {
    bg: 'dark:bg-purple-950/40 bg-purple-100',
    border: 'border-purple-500/30 dark:border-purple-800/50',
    shadow: 'hover:shadow-purple-500/10',
    dot: 'bg-purple-400',
    iconBg: 'dark:bg-purple-900/50 bg-purple-100',
    text: 'text-purple-900 dark:text-purple-100',
    descriptionText: 'text-purple-800/90 dark:text-purple-300/80',
    aiFeatureText: 'text-purple-700 dark:text-purple-200',
    aiFeatureBorder: 'border-purple-500/30 dark:border-purple-800'
  },
  teal: {
    bg: 'dark:bg-teal-950/40 bg-teal-100',
    border: 'border-teal-500/30 dark:border-teal-800/50',
    shadow: 'hover:shadow-teal-500/10',
    dot: 'bg-teal-400',
    iconBg: 'dark:bg-teal-900/50 bg-teal-100',
    text: 'text-teal-900 dark:text-teal-100',
    descriptionText: 'text-teal-800/90 dark:text-teal-300/80',
    aiFeatureText: 'text-teal-700 dark:text-teal-200',
    aiFeatureBorder: 'border-teal-500/30 dark:border-teal-800'
  },
  green: {
    bg: 'dark:bg-green-950/40 bg-green-100',
    border: 'border-green-500/30 dark:border-green-800/50',
    shadow: 'hover:shadow-green-500/10',
    dot: 'bg-green-400',
    iconBg: 'dark:bg-green-900/50 bg-green-100',
    text: 'text-green-900 dark:text-green-100',
    descriptionText: 'text-green-800/90 dark:text-green-300/80',
    aiFeatureText: 'text-green-700 dark:text-green-200',
    aiFeatureBorder: 'border-green-500/30 dark:border-green-800'
  },
  blue: {
    bg: 'dark:bg-blue-950/40 bg-blue-100',
    border: 'border-blue-500/30 dark:border-blue-800/50',
    shadow: 'hover:shadow-blue-500/10',
    dot: 'bg-blue-400',
    iconBg: 'dark:bg-blue-900/50 bg-blue-100',
    text: 'text-blue-900 dark:text-blue-100',
    descriptionText: 'text-blue-800/90 dark:text-blue-300/80',
    aiFeatureText: 'text-blue-700 dark:text-blue-200',
    aiFeatureBorder: 'border-blue-500/30 dark:border-blue-800'
  },
  orange: {
    bg: 'dark:bg-orange-950/40 bg-orange-100',
    border: 'border-orange-500/30 dark:border-orange-800/50',
    shadow: 'hover:shadow-orange-500/10',
    dot: 'bg-orange-400',
    iconBg: 'dark:bg-orange-900/50 bg-orange-100',
    text: 'text-orange-900 dark:text-orange-100',
    descriptionText: 'text-orange-800/90 dark:text-orange-300/80',
    aiFeatureText: 'text-orange-700 dark:text-orange-200',
    aiFeatureBorder: 'border-orange-500/30 dark:border-orange-800'
  },
};


export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  aiFeature,
  icon,
  color,
  onClick,
}) => {
  const variants = colorVariants[color];

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 ease-in-out',
        'transform hover:-translate-y-2 hover:shadow-xl',
        variants.bg,
        variants.border,
        variants.shadow
      )}
    >
      <div className={cn("absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-50 blur-xl", variants.dot)}></div>
      <div className="flex flex-col items-center">
        <div className={cn("mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110", variants.iconBg)}>
          {icon}
        </div>
        <h3 className={cn("mb-2 text-2xl font-bold", variants.text)}>{title}</h3>
        <p className={cn("mb-6 text-sm", variants.descriptionText)}>{description}</p>
        <div className={cn("rounded-full border bg-background/30 px-4 py-1 text-xs", variants.aiFeatureBorder)}>
          <span className={variants.aiFeatureText}>{aiFeature}</span>
        </div>
      </div>
    </div>
  );
};
