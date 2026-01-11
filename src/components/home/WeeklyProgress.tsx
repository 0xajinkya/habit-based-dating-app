import React from 'react';
import { cn } from '../../lib/utils';
interface WeeklyProgressProps {
  progress: number; // 0-100
  className?: string;
}
export function WeeklyProgress({
  progress,
  className
}: WeeklyProgressProps) {
  return <div className={cn('w-full h-1.5 bg-gray-100 rounded-full overflow-hidden', className)}>
      <div className={cn('h-full transition-all duration-500 rounded-full', progress >= 100 ? 'bg-green-500' : 'bg-indigo-500')} style={{
      width: `${progress}%`
    }} />
    </div>;
}