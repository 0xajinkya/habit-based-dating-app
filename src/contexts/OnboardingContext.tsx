import React, { useEffect, useState, createContext, useContext } from 'react';
import { Habit } from '../data/habits';
interface OnboardingData {
  name: string;
  age: number | '';
  gender: string;
  photos: string[]; // URLs or base64
  selectedHabits: Habit[];
  habitFrequencies: Record<string, number>; // habitId -> frequency
  preferences: {
    ageRange: [number, number];
    distance: number;
    gender: string;
  };
}
interface OnboardingContextType {
  data: OnboardingData;
  updateBasicInfo: (info: Partial<Pick<OnboardingData, 'name' | 'age' | 'gender'>>) => void;
  addPhoto: (photo: string) => void;
  removePhoto: (index: number) => void;
  reorderPhotos: (newPhotos: string[]) => void;
  toggleHabit: (habit: Habit) => void;
  setHabitFrequency: (habitId: string, frequency: number) => void;
  updatePreferences: (prefs: Partial<OnboardingData['preferences']>) => void;
  resetOnboarding: () => void;
}
const defaultData: OnboardingData = {
  name: '',
  age: '',
  gender: '',
  photos: [],
  selectedHabits: [],
  habitFrequencies: {},
  preferences: {
    ageRange: [21, 35],
    distance: 25,
    gender: 'any'
  }
};
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);
export function OnboardingProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem('onboarding_draft');
    return saved ? JSON.parse(saved) : defaultData;
  });
  // Auto-save draft
  useEffect(() => {
    localStorage.setItem('onboarding_draft', JSON.stringify(data));
  }, [data]);
  const updateBasicInfo = (info: Partial<Pick<OnboardingData, 'name' | 'age' | 'gender'>>) => {
    setData(prev => ({
      ...prev,
      ...info
    }));
  };
  const addPhoto = (photo: string) => {
    if (data.photos.length < 6) {
      setData(prev => ({
        ...prev,
        photos: [...prev.photos, photo]
      }));
    }
  };
  const removePhoto = (index: number) => {
    setData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };
  const reorderPhotos = (newPhotos: string[]) => {
    setData(prev => ({
      ...prev,
      photos: newPhotos
    }));
  };
  const toggleHabit = (habit: Habit) => {
    setData(prev => {
      const exists = prev.selectedHabits.find(h => h.id === habit.id);
      if (exists) {
        const newHabits = prev.selectedHabits.filter(h => h.id !== habit.id);
        const newFreqs = {
          ...prev.habitFrequencies
        };
        delete newFreqs[habit.id];
        return {
          ...prev,
          selectedHabits: newHabits,
          habitFrequencies: newFreqs
        };
      } else {
        if (prev.selectedHabits.length >= 3) return prev;
        return {
          ...prev,
          selectedHabits: [...prev.selectedHabits, habit],
          habitFrequencies: {
            ...prev.habitFrequencies,
            [habit.id]: habit.suggestedFrequency
          }
        };
      }
    });
  };
  const setHabitFrequency = (habitId: string, frequency: number) => {
    setData(prev => ({
      ...prev,
      habitFrequencies: {
        ...prev.habitFrequencies,
        [habitId]: frequency
      }
    }));
  };
  const updatePreferences = (prefs: Partial<OnboardingData['preferences']>) => {
    setData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefs
      }
    }));
  };
  const resetOnboarding = () => {
    setData(defaultData);
    localStorage.removeItem('onboarding_draft');
  };
  return <OnboardingContext.Provider value={{
    data,
    updateBasicInfo,
    addPhoto,
    removePhoto,
    reorderPhotos,
    toggleHabit,
    setHabitFrequency,
    updatePreferences,
    resetOnboarding
  }}>
      {children}
    </OnboardingContext.Provider>;
}
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}