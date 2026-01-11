import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '../../lib/utils';
interface StreakChipProps {
  streak: number;
  isActive?: boolean; // logged today
  className?: string;
}
export function StreakChip({
  streak,
  isActive,
  className
}: StreakChipProps) {
  if (streak === 0) return null;
  return <div className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold transition-all', isActive ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-gray-100 text-gray-500 border border-gray-200', className)}>
      <Flame className={cn('h-3 w-3', isActive && 'fill-orange-600')} />
      <span>{streak}</span>
    </div>;
}