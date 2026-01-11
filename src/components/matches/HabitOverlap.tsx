import React from 'react';
import { HABITS } from '../../data/habits';
import { cn } from '../../lib/utils';
interface HabitOverlapProps {
  habitIds: string[];
  className?: string;
}
export function HabitOverlap({
  habitIds,
  className
}: HabitOverlapProps) {
  return <div className={cn('flex flex-wrap gap-2', className)}>
      {habitIds.map(id => {
      const habit = HABITS.find(h => h.id === id);
      if (!habit) return null;
      const Icon = habit.icon;
      return <div key={id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{habit.name}</span>
          </div>;
    })}
    </div>;
}