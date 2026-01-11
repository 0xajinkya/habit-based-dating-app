import React from 'react';
import { TrendingUp, Calendar, Flame, Target } from 'lucide-react';
import { cn } from '../../lib/utils';
interface HabitStatisticsProps {
  streak: number;
  completionRate: number; // 0-100
  totalLogs: number;
  targetFrequency: number;
  currentWeekLogs: number;
  className?: string;
}
export function HabitStatistics({
  streak,
  completionRate,
  totalLogs,
  targetFrequency,
  currentWeekLogs,
  className
}: HabitStatisticsProps) {
  const stats = [{
    icon: Flame,
    label: 'Current Streak',
    value: `${streak} days`,
    color: 'text-orange-600 bg-orange-50'
  }, {
    icon: Target,
    label: 'This Week',
    value: `${currentWeekLogs}/${targetFrequency}`,
    color: 'text-green-600 bg-green-50'
  }, {
    icon: TrendingUp,
    label: 'Completion Rate',
    value: `${completionRate}%`,
    color: 'text-blue-600 bg-blue-50'
  }, {
    icon: Calendar,
    label: 'Total Logs',
    value: totalLogs.toString(),
    color: 'text-purple-600 bg-purple-50'
  }];
  return <div className={cn('grid grid-cols-2 gap-3', className)}>
      {stats.map((stat, idx) => {
      const Icon = stat.icon;
      return <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center mb-2', stat.color)}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
          </div>;
    })}
    </div>;
}