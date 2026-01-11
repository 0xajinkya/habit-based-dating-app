import React, { useEffect, useState, createContext, useContext } from 'react';
import { MatchProfile, MOCK_MATCHES } from '../data/mockMatches';
import { useUser } from './UserContext';

export interface HabitMatchStats {
  matchedProfiles: number;    // Liked profiles with same habit
  potentialMatches: number;   // Queue profiles with same habit
  usersAhead: number;         // Profiles with higher tier
  levelUpBonus: number;       // Additional matches at next tier
}

interface MatchContextType {
  queue: MatchProfile[];
  likedProfiles: string[];
  passedProfiles: string[];
  likeProfile: (id: string) => void;
  passProfile: (id: string) => void;
  resetQueue: () => void;
  getHabitMatchStats: (habitId: string, userTier: number) => HabitMatchStats;
}
const MatchContext = createContext<MatchContextType | undefined>(undefined);
export function MatchProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    profile
  } = useUser();
  const [queue, setQueue] = useState<MatchProfile[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<string[]>([]);
  // Initialize queue (filter based on preferences in a real app)
  useEffect(() => {
    if (profile) {
      // Simple filter for MVP: exclude already acted upon
      const initialQueue = MOCK_MATCHES.filter(m => !likedProfiles.includes(m.id) && !passedProfiles.includes(m.id));
      setQueue(initialQueue);
    }
  }, [profile, likedProfiles, passedProfiles]);
  const likeProfile = (id: string) => {
    setLikedProfiles(prev => [...prev, id]);
    setQueue(prev => prev.filter(p => p.id !== id));
    // In real app: check for match, show match screen
  };
  const passProfile = (id: string) => {
    setPassedProfiles(prev => [...prev, id]);
    setQueue(prev => prev.filter(p => p.id !== id));
  };
  const resetQueue = () => {
    setLikedProfiles([]);
    setPassedProfiles([]);
    setQueue(MOCK_MATCHES);
  };

  const getHabitMatchStats = (habitId: string, userTier: number): HabitMatchStats => {
    // Get all profiles that share this habit
    const profilesWithHabit = MOCK_MATCHES.filter(m => m.habits.includes(habitId));

    // Matched profiles: liked profiles that share this habit
    const matchedProfiles = likedProfiles.filter(id =>
      MOCK_MATCHES.find(m => m.id === id)?.habits.includes(habitId)
    ).length;

    // Potential matches: profiles in queue that share this habit
    const potentialMatches = queue.filter(m => m.habits.includes(habitId)).length;

    // Users ahead: profiles with higher tier than user
    const usersAhead = profilesWithHabit.filter(m => m.tier > userTier).length;

    // Level up bonus: profiles at user's tier or one tier above that could unlock
    const nextTier = Math.min(userTier + 1, 5) as 1 | 2 | 3 | 4 | 5;
    const levelUpBonus = profilesWithHabit.filter(m =>
      m.tier === nextTier && !likedProfiles.includes(m.id)
    ).length;

    return {
      matchedProfiles,
      potentialMatches,
      usersAhead,
      levelUpBonus
    };
  };

  return <MatchContext.Provider value={{
    queue,
    likedProfiles,
    passedProfiles,
    likeProfile,
    passProfile,
    resetQueue,
    getHabitMatchStats
  }}>
      {children}
    </MatchContext.Provider>;
}
export function useMatch() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within MatchProvider');
  }
  return context;
}