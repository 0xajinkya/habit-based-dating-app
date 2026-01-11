import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { HABITS } from '../../data/habits';
import { HabitCalendar } from './HabitCalendar';
import { cn } from '../../lib/utils';

interface HabitCalendarCardProps {
  habitId: string;
  logs: string[];
  streak: number;
  completionRate: number;
  className?: string;
}

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

const categoryColors: Record<HabitCategory, { bg: string; text: string }> = {
  Fitness: { bg: 'bg-orange-50', text: 'text-orange-600' },
  Wellness: { bg: 'bg-green-50', text: 'text-green-600' },
  Learning: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Lifestyle: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  Creative: { bg: 'bg-purple-50', text: 'text-purple-600' }
};

export function HabitCalendarCard({
  habitId,
  logs,
  streak,
  completionRate,
  className
}: HabitCalendarCardProps) {
  const navigate = useNavigate();
  const habit = HABITS.find(h => h.id === habitId);
  if (!habit) return null;

  const Icon = habit.icon;
  const category = habit.category as HabitCategory;
  const colors = categoryColors[category] || { bg: 'bg-gray-50', text: 'text-gray-600' };

  return (
    <div
      onClick={() => navigate(`/habits/${habitId}`)}
      className={cn(
        'bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', colors.bg, colors.text)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{habit.name}</h3>
            <p className="text-xs text-gray-500">{habit.category}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>

      {/* Compact 4-week activity grid */}
      <div
        className="py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <HabitCalendar
          habitId={habitId}
          logs={logs}
          timeRange="month"
          compact
          showDayLabels={false}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
        <span>
          <strong className="text-orange-600">{streak}d</strong> streak
        </span>
        <span>
          <strong className="text-green-600">{completionRate}%</strong> rate
        </span>
      </div>
    </div>
  );
}