import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Heart, TrendingUp, Zap } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useHabitLog } from '../../contexts/HabitLogContext';
import { useMatch } from '../../contexts/MatchContext';
import { useToast } from '../../design-system/components/Toast';
import { HABITS } from '../../data/habits';
import { HabitCalendar } from '../../components/habits/HabitCalendar';
import { HabitStatistics } from '../../components/habits/HabitStatistics';
import { TimeRangeSelector } from '../../components/habits/TimeRangeSelector';
import { Button } from '../../design-system/components/Button';
import { cn } from '../../lib/utils';

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

const categoryColors: Record<HabitCategory, { bg: string; text: string; activeBg: string; inactiveBg: string }> = {
  Fitness: { bg: 'bg-orange-50', text: 'text-orange-600', activeBg: 'bg-orange-500', inactiveBg: 'bg-orange-100' },
  Wellness: { bg: 'bg-green-50', text: 'text-green-600', activeBg: 'bg-green-500', inactiveBg: 'bg-green-100' },
  Learning: { bg: 'bg-blue-50', text: 'text-blue-600', activeBg: 'bg-blue-500', inactiveBg: 'bg-blue-100' },
  Lifestyle: { bg: 'bg-yellow-50', text: 'text-yellow-600', activeBg: 'bg-yellow-500', inactiveBg: 'bg-yellow-100' },
  Creative: { bg: 'bg-purple-50', text: 'text-purple-600', activeBg: 'bg-purple-500', inactiveBg: 'bg-purple-100' }
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  subtitle?: string;
}

function StatCard({ icon: Icon, label, value, color, subtitle }: StatCardProps) {
  return (
    <div className={cn('rounded-xl p-4', color)}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium opacity-80">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
      {subtitle && <div className="text-xs opacity-70 mt-0.5">{subtitle}</div>}
    </div>
  );
}

export function HabitDetailPage() {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { profile } = useUser();
  const { logs, logHabit, isHabitLoggedToday, getHabitStats } = useHabitLog();
  const { getHabitMatchStats } = useMatch();
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  if (!habitId || !profile) return null;

  const habit = HABITS.find(h => h.id === habitId);
  const userHabit = profile.habits.find(h => h.id === habitId);

  if (!habit || !userHabit) {
    return <div className="p-8 text-center">Habit not found</div>;
  }

  const Icon = habit.icon;
  const category = habit.category as HabitCategory;
  const colors = categoryColors[category] || categoryColors.Fitness;
  const stats = getHabitStats(habitId);
  const habitLogs = logs.filter(log => log.habitId === habitId).map(log => log.date);
  const isLoggedToday = isHabitLoggedToday(habitId);
  const matchStats = getHabitMatchStats(habitId, profile.tier);

  const calculateCompletionRate = () => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const expectedLogs = Math.floor((days / 7) * userHabit.frequency);
    const actualLogs = habitLogs.filter(date => {
      const logDate = new Date(date);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return logDate >= cutoff;
    }).length;
    return expectedLogs > 0 ? Math.min(100, Math.round((actualLogs / expectedLogs) * 100)) : 0;
  };

  const handleLog = () => {
    logHabit(habitId, {});
    showToast('Habit logged!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </header>

      <main className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Habit Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className={cn('h-16 w-16 rounded-2xl flex items-center justify-center', colors.bg, colors.text)}>
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{habit.name}</h1>
              <p className="text-sm text-gray-500">{habit.category}</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{habit.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Target:{' '}
              <span className="font-semibold text-gray-900">
                {userHabit.frequency}x/week
              </span>
            </span>
            <Button
              onClick={handleLog}
              disabled={isLoggedToday}
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              {isLoggedToday ? 'Logged Today' : 'Log Now'}
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <HabitStatistics
          streak={stats.streak}
          completionRate={calculateCompletionRate()}
          totalLogs={stats.totalLogs}
          targetFrequency={userHabit.frequency}
          currentWeekLogs={habitLogs.filter(date => {
            const logDate = new Date(date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return logDate >= weekAgo;
          }).length}
        />

        {/* Activity Calendar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
          </div>

          {/* GitHub-style activity grid */}
          <div className="overflow-x-auto -mx-2 px-2">
            <HabitCalendar
              habitId={habitId}
              logs={habitLogs}
              timeRange={timeRange}
              showDayLabels={true}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-1.5">
              <div className={cn('w-2 h-2 rounded-sm', colors.inactiveBg)} />
              <span className="text-gray-500">No activity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={cn('w-2 h-2 rounded-sm', colors.activeBg)} />
              <span className="text-gray-500">Completed</span>
            </div>
          </div>
        </div>

        {/* Match Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Match Insights</h2>

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Users}
              label="Folks Ahead"
              value={matchStats.usersAhead}
              color="bg-blue-50 text-blue-700"
            />
            <StatCard
              icon={Heart}
              label="Current Matches"
              value={matchStats.matchedProfiles}
              color="bg-pink-50 text-pink-700"
            />
            <StatCard
              icon={TrendingUp}
              label="Potential Matches"
              value={matchStats.potentialMatches}
              color="bg-green-50 text-green-700"
            />
            <StatCard
              icon={Zap}
              label="Level Up Bonus"
              value={`+${matchStats.levelUpBonus}`}
              color="bg-yellow-50 text-yellow-700"
              subtitle="at next tier"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
