import React from 'react';
import { Check, Camera, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Habit } from '../../data/habits';
import { StreakChip } from './StreakChip';
import { WeeklyProgress } from './WeeklyProgress';
interface HabitLogItemProps {
  habit: Habit;
  isLogged: boolean;
  streak: number;
  weeklyProgress: number;
  onLog: () => void;
  onAddProof: () => void;
  onAddNote: () => void;
}
export function HabitLogItem({
  habit,
  isLogged,
  streak,
  weeklyProgress,
  onLog,
  onAddProof,
  onAddNote
}: HabitLogItemProps) {
  const Icon = habit.icon;
  return <div className={cn('p-4 rounded-xl border transition-all duration-300', isLogged ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 shadow-sm hover:border-gray-200')}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('h-10 w-10 rounded-full flex items-center justify-center transition-colors', isLogged ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600')}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className={cn('font-semibold', isLogged ? 'text-green-900' : 'text-gray-900')}>
              {habit.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <StreakChip streak={streak} isActive={isLogged} />
              {isLogged && <span className="text-xs text-green-600 font-medium">
                  Completed today!
                </span>}
            </div>
          </div>
        </div>

        <button onClick={onLog} disabled={isLogged} className={cn('h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300', isLogged ? 'bg-green-500 border-green-500 text-white scale-110' : 'border-gray-300 text-transparent hover:border-indigo-500')}>
          <Check className="h-4 w-4 stroke-[3px]" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Weekly Goal</span>
          <span>{weeklyProgress}%</span>
        </div>
        <WeeklyProgress progress={weeklyProgress} />
      </div>

      {isLogged && <div className="flex gap-2 mt-4 animate-in slide-in-from-top-2 fade-in-0">
          <button onClick={onAddProof} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
            <Camera className="h-3.5 w-3.5" />
            Add Proof
          </button>
          <button onClick={onAddNote} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
            <FileText className="h-3.5 w-3.5" />
            Add Note
          </button>
        </div>}
    </div>;
}