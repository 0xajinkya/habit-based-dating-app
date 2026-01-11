import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useHabitLog } from '../../contexts/HabitLogContext';
import { HabitCalendarCard } from '../../components/habits/HabitCalendarCard';
import { TierBadge, VerifiedBadge } from '../../design-system/components/Badge';
import { Calendar } from 'lucide-react';
export function HabitsOverviewPage() {
  const {
    profile
  } = useUser();
  const {
    logs,
    getHabitStats
  } = useHabitLog();
  if (!profile) return null;
  const getHabitLogs = (habitId: string) => {
    return logs.filter(log => log.habitId === habitId).map(log => log.date);
  };
  const calculateCompletionRate = (habitId: string, timeRange: number = 30) => {
    const habitLogs = logs.filter(log => log.habitId === habitId);
    const targetFreq = profile.habits.find(h => h.id === habitId)?.frequency || 3;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - timeRange);
    const logsInRange = habitLogs.filter(log => new Date(log.date) >= daysAgo).length;
    const expectedLogs = Math.floor(timeRange / 7 * targetFreq);
    return Math.min(100, Math.round(logsInRange / expectedLogs * 100));
  };
  return <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-6 shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              Track your consistency
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <TierBadge tier={profile.tier} />
            {profile.isVerified && <VerifiedBadge size="sm" />}
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-4 max-w-md mx-auto">
        {profile.habits.length === 0 ? <div className="text-center py-12 text-gray-500">
            <p>No habits selected yet.</p>
          </div> : profile.habits.map(userHabit => {
        const stats = getHabitStats(userHabit.id);
        const habitLogs = getHabitLogs(userHabit.id);
        const completionRate = calculateCompletionRate(userHabit.id);
        return <HabitCalendarCard key={userHabit.id} habitId={userHabit.id} logs={habitLogs} streak={stats.streak} completionRate={completionRate} />;
      })}
      </main>
    </div>;
}