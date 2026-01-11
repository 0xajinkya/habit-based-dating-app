import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
interface UserProfile {
  id: string;
  phone: string;
  name: string;
  age: number;
  gender: string;
  photos: string[];
  habits: Array<{
    id: string;
    frequency: number;
  }>;
  preferences: {
    ageRange: [number, number];
    distance: number;
    gender: string;
  };
  isVerified: boolean;
  tier: 1 | 2 | 3 | 4 | 5;
}
interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    phone,
    isAuthenticated
  } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated && phone) {
      // Load user profile from storage or API
      const storedProfile = localStorage.getItem(`user_${phone}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } else {
      setProfile(null);
    }
    setIsLoading(false);
  }, [isAuthenticated, phone]);
  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => {
      const newProfile = {
        ...prev,
        ...data
      } as UserProfile;
      localStorage.setItem(`user_${phone}`, JSON.stringify(newProfile));
      return newProfile;
    });
  };
  return <UserContext.Provider value={{
    profile,
    updateProfile,
    isLoading
  }}>
      {children}
    </UserContext.Provider>;
}
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}