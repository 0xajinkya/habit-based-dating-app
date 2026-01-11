import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HABITS } from '../../data/habits';
import { HabitCalendar } from '../habits/HabitCalendar';
import { cn } from '../../lib/utils';
interface MatchHabitCalendarProps {
  habitId: string;
  logs: string[]; // Mock logs for the match
  isShared?: boolean;
  className?: string;
}
export function MatchHabitCalendar({
  habitId,
  logs,
  isShared,
  className
}: MatchHabitCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(isShared);
  const habit = HABITS.find(h => h.id === habitId);
  if (!habit) return null;
  const Icon = habit.icon;
  const completionRate = Math.round(logs.length / 30 * 100);
  const streak = Math.floor(Math.random() * 15) + 1; // Mock streak
  return <div className={cn('bg-gray-50 rounded-xl overflow-hidden border border-gray-100', className)}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', isShared ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600')}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{habit.name}</h3>
              {isShared && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                  Shared
                </span>}
            </div>
            <p className="text-xs text-gray-500">{habit.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="font-semibold text-gray-900">{completionRate}%</div>
            <div className="text-xs text-gray-500">{streak}d streak</div>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
        </div>
      </button>

      {isExpanded && <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in-0">
          <HabitCalendar habitId={habitId} logs={logs} timeRange="month" compact />
        </div>}
    </div>;
}