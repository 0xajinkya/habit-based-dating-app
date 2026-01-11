import React, { useMemo, useState } from 'react';
import { cn } from '../../lib/utils';
import { HABITS } from '../../data/habits';
import { tokens } from '../../design-system/tokens';
import { generateActivityGrid, getDayLabels } from '../../lib/dateUtils';
import { useHabitLog } from '../../contexts/HabitLogContext';
import { LogHabitSheet } from './LogHabitSheet';
import { useToast } from '../../design-system/components/Toast';

interface HabitCalendarProps {
  habitId: string;
  logs: string[]; // Array of dates in YYYY-MM-DD format
  timeRange: 'week' | 'month' | 'quarter';
  className?: string;
  compact?: boolean;
  showDayLabels?: boolean;
}

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

export function HabitCalendar({
  habitId,
  logs,
  timeRange,
  className,
  compact = false,
  showDayLabels = true
}: HabitCalendarProps) {
  const [showLogSheet, setShowLogSheet] = useState(false);
  const { logHabit, isHabitLoggedToday } = useHabitLog();
  const { showToast } = useToast();

  const habit = HABITS.find(h => h.id === habitId);
  if (!habit) return null;

  const category = habit.category as HabitCategory;
  const colors = tokens.colors.habitCategories[category] || {
    active: 'bg-gray-500',
    inactive: 'bg-gray-100'
  };

  const gridCells = useMemo(() => {
    return generateActivityGrid(logs, timeRange);
  }, [logs, timeRange]);

  const dayLabels = getDayLabels();
  const isLoggedToday = isHabitLoggedToday(habitId);

  // Gap sizing based on compact mode
  const gap = compact ? 'gap-[2px]' : 'gap-[3px]';
  const labelSize = compact ? 'text-[8px]' : 'text-[10px]';

  const handleTodayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!isLoggedToday) {
      setShowLogSheet(true);
    }
  };

  const handleLog = (data: { proofPhoto?: string; startTime?: string; endTime?: string }) => {
    logHabit(habitId, data);
    showToast('Activity logged successfully!', 'success');
  };

  return (
    <>
      <div className={cn('w-full', className)}>
        {/* Day labels header - S M T W T F S */}
        {showDayLabels && (
          <div className={cn('grid grid-cols-7 mb-1', gap)}>
            {dayLabels.map((label, idx) => (
              <div
                key={idx}
                className={cn(
                  'text-center',
                  labelSize,
                  'text-gray-400 font-medium'
                )}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Grid - 7 columns (days), N rows (weeks) */}
        <div className={cn('grid grid-cols-7', gap)}>
          {gridCells.map((cell, idx) => {
            const isTodayAndNotLogged = cell.isToday && !isLoggedToday;
            const isClickable = cell.isToday && !isLoggedToday;

            return (
              <div
                key={idx}
                onClick={isClickable ? (e) => handleTodayClick(e) : undefined}
                className={cn(
                  'aspect-square rounded-sm transition-all',
                  cell.hasLog || (cell.isToday && isLoggedToday)
                    ? colors.active
                    : colors.inactive,
                  cell.isToday && 'ring-2 ring-indigo-500 ring-offset-1',
                  isClickable && 'cursor-pointer hover:scale-110 hover:ring-2 hover:ring-indigo-400'
                )}
                title={
                  cell.isToday
                    ? isLoggedToday
                      ? 'Today - Completed'
                      : 'Today - Tap to log'
                    : `${cell.date} - ${cell.hasLog ? 'Completed' : 'Missed'}`
                }
              />
            );
          })}
        </div>
      </div>

      {/* Log Habit Sheet */}
      <LogHabitSheet
        isOpen={showLogSheet}
        onClose={() => setShowLogSheet(false)}
        habitId={habitId}
        onLog={handleLog}
      />
    </>
  );
}
