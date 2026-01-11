import React, { useEffect, useState, createContext, useContext } from 'react';
import { useUser } from './UserContext';
export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completedAt: string; // ISO timestamp
  proofPhoto?: string;
  note?: string;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
}

export interface LogHabitData {
  proofPhoto?: string;
  note?: string;
  startTime?: string;
  endTime?: string;
}
interface HabitStats {
  streak: number;
  weeklyProgress: number; // 0-100
  totalLogs: number;
  lastLogDate?: string;
}
interface HabitLogContextType {
  logs: HabitLog[];
  getHabitStats: (habitId: string) => HabitStats;
  logHabit: (habitId: string, data?: LogHabitData) => void;
  isHabitLoggedToday: (habitId: string) => boolean;
  getTodayLogs: () => HabitLog[];
  generateMockLogs: (habitId: string, days: number) => void;
}
const HabitLogContext = createContext<HabitLogContextType | undefined>(undefined);
export function HabitLogProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    profile
  } = useUser();
  const [logs, setLogs] = useState<HabitLog[]>(() => {
    const saved = localStorage.getItem('habit_logs');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('habit_logs', JSON.stringify(logs));
  }, [logs]);
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const isHabitLoggedToday = (habitId: string) => {
    const today = getTodayDate();
    return logs.some(log => log.habitId === habitId && log.date === today);
  };
  const getTodayLogs = () => {
    const today = getTodayDate();
    return logs.filter(log => log.date === today);
  };
  const logHabit = (habitId: string, data?: LogHabitData) => {
    if (isHabitLoggedToday(habitId)) return;
    const newLog: HabitLog = {
      id: Math.random().toString(36).substr(2, 9),
      habitId,
      date: getTodayDate(),
      completedAt: new Date().toISOString(),
      proofPhoto: data?.proofPhoto,
      note: data?.note,
      startTime: data?.startTime,
      endTime: data?.endTime
    };
    setLogs(prev => [...prev, newLog]);
  };
  // Generate mock historical logs for demo purposes
  const generateMockLogs = (habitId: string, days: number = 30) => {
    const mockLogs: HabitLog[] = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      // 70% chance of logging each day
      if (Math.random() > 0.3) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        // Don't duplicate existing logs
        if (!logs.some(log => log.habitId === habitId && log.date === dateStr)) {
          mockLogs.push({
            id: Math.random().toString(36).substr(2, 9),
            habitId,
            date: dateStr,
            completedAt: date.toISOString()
          });
        }
      }
    }
    setLogs(prev => [...prev, ...mockLogs]);
  };
  const getHabitStats = (habitId: string): HabitStats => {
    const habitLogs = logs.filter(l => l.habitId === habitId).sort((a, b) => b.date.localeCompare(a.date));
    // Calculate streak
    let streak = 0;
    const today = getTodayDate();
    let checkDate = new Date(today);
    if (isHabitLoggedToday(habitId)) {
      streak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasLog = habitLogs.some(l => l.date === dateStr);
      if (hasLog) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    // Weekly progress
    const targetFreq = profile?.habits.find(h => h.id === habitId)?.frequency || 3;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const logsLastWeek = habitLogs.filter(l => new Date(l.date) >= oneWeekAgo).length;
    const weeklyProgress = Math.min(100, Math.round(logsLastWeek / targetFreq * 100));
    return {
      streak,
      weeklyProgress,
      totalLogs: habitLogs.length,
      lastLogDate: habitLogs[0]?.date
    };
  };
  return <HabitLogContext.Provider value={{
    logs,
    getHabitStats,
    logHabit,
    isHabitLoggedToday,
    getTodayLogs,
    generateMockLogs
  }}>
      {children}
    </HabitLogContext.Provider>;
}
export function useHabitLog() {
  const context = useContext(HabitLogContext);
  if (!context) {
    throw new Error('useHabitLog must be used within HabitLogProvider');
  }
  return context;
}