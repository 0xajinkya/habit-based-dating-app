import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useHabitLog } from '../../contexts/HabitLogContext';
import { HabitCalendarCard } from '../../components/habits/HabitCalendarCard';
import { VerificationGate } from '../../components/verification/VerificationGate';
import { TierBadge, VerifiedBadge } from '../../design-system/components/Badge';
import { Calendar, BarChart3 } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
export function HomePage() {
  const navigate = useNavigate();
  const {
    profile
  } = useUser();
  const {
    logs,
    getHabitStats,
    generateMockLogs
  } = useHabitLog();
  // Generate mock logs on first load for demo
  useEffect(() => {
    if (profile && logs.length === 0) {
      profile.habits.forEach(habit => {
        generateMockLogs(habit.id, 30);
      });
    }
  }, [profile]);
  if (!profile) return null;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const getHabitLogs = (habitId: string) => {
    return logs.filter(log => log.habitId === habitId).map(log => log.date);
  };
  const calculateCompletionRate = (habitId: string) => {
    const habitLogs = logs.filter(log => log.habitId === habitId);
    const targetFreq = profile.habits.find(h => h.id === habitId)?.frequency || 3;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 30);
    const logsInRange = habitLogs.filter(log => new Date(log.date) >= daysAgo).length;
    const expectedLogs = Math.floor(30 / 7 * targetFreq);
    return Math.min(100, Math.round(logsInRange / expectedLogs * 100));
  };
  return <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-6 shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Today</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {today}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <TierBadge tier={profile.tier} />
            {profile.isVerified && <VerifiedBadge size="sm" />}
          </div>
        </div>

        <Button variant="secondary" fullWidth onClick={() => navigate('/habits')} leftIcon={<BarChart3 className="h-4 w-4" />} className="mt-4">
          View All Habits
        </Button>
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

      {!profile.isVerified && <VerificationGate />}
    </div>;
}