import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';
export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [{
    id: 'home',
    icon: Home,
    label: 'Today',
    path: '/home'
  }, {
    id: 'matches',
    icon: Heart,
    label: 'Matches',
    path: '/matches'
  }, {
    id: 'chat',
    icon: MessageCircle,
    label: 'Chat',
    path: '/chat'
  }, {
    id: 'profile',
    icon: User,
    label: 'Profile',
    path: '/profile'
  }];
  // Hide on auth/onboarding/verification pages
  const hideNav =
    location.pathname === '/' ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/onboarding') ||
    location.pathname.startsWith('/verification');
  if (hideNav) return null;
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-40 safe-area-bottom">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map(tab => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return <button key={tab.id} onClick={() => navigate(tab.path)} className={cn('flex flex-col items-center gap-1 transition-colors', isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600')}>
              <Icon className={cn('h-6 w-6', isActive && 'fill-current')} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>;
      })}
      </div>
    </nav>;
}