import React from 'react';
import { Habit } from '../../data/habits';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
interface HabitCardProps {
  habit: Habit;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}
export function HabitCard({
  habit,
  isSelected,
  onToggle,
  disabled
}: HabitCardProps) {
  const Icon = habit.icon;
  return <button onClick={onToggle} disabled={disabled && !isSelected} className={cn('relative flex flex-col items-center p-4 rounded-xl border transition-all duration-200 text-center h-full', isSelected ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50', disabled && !isSelected && 'opacity-50 cursor-not-allowed hover:bg-white hover:border-gray-200')}>
      {isSelected && <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center animate-in zoom-in duration-200">
          <Check className="h-3 w-3 text-white" />
        </div>}

      <div className={cn('h-10 w-10 rounded-full flex items-center justify-center mb-3 transition-colors', isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500')}>
        <Icon className="h-5 w-5" />
      </div>

      <h3 className={cn('font-medium text-sm mb-1', isSelected ? 'text-indigo-900' : 'text-gray-900')}>
        {habit.name}
      </h3>

      <p className="text-xs text-gray-500 line-clamp-2">{habit.description}</p>
    </button>;
}