import React, { useEffect, useState, createContext, useContext } from 'react';
interface AuthContextType {
  phone: string;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  setPhone: (phone: string) => void;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [phone, setPhoneState] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  // Simple persistence for MVP
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedPhone = localStorage.getItem('phone');
    const storedOnboarding = localStorage.getItem('onboardingCompleted');
    if (storedAuth === 'true') setIsAuthenticated(true);
    if (storedPhone) setPhoneState(storedPhone);
    if (storedOnboarding === 'true') setOnboardingCompleted(true);
  }, []);
  const setPhone = (newPhone: string) => {
    setPhoneState(newPhone);
    localStorage.setItem('phone', newPhone);
  };
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };
  const completeOnboarding = () => {
    setOnboardingCompleted(true);
    localStorage.setItem('onboardingCompleted', 'true');
  };
  const logout = () => {
    setIsAuthenticated(false);
    setPhoneState('');
    setOnboardingCompleted(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('phone');
    localStorage.removeItem('onboardingCompleted');
  };
  return <AuthContext.Provider value={{
    phone,
    isAuthenticated,
    onboardingCompleted,
    setPhone,
    login,
    logout,
    completeOnboarding
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}