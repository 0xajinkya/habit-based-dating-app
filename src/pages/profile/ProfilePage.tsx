import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Edit2, LogOut, Settings, Heart, Dumbbell } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { HABITS } from '../../data/habits';
import { TierBadge, VerifiedBadge } from '../../design-system/components/Badge';
import { Button } from '../../design-system/components/Button';
import { cn } from '../../lib/utils';

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

const categoryColors: Record<HabitCategory, { bg: string; text: string }> = {
  Fitness: { bg: 'bg-orange-50', text: 'text-orange-600' },
  Wellness: { bg: 'bg-green-50', text: 'text-green-600' },
  Learning: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Lifestyle: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  Creative: { bg: 'bg-purple-50', text: 'text-purple-600' }
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile } = useUser();
  const { logout } = useAuth();

  if (!profile) return null;

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const getGenderPreferenceLabel = (gender: string) => {
    switch (gender) {
      case 'Male': return 'Men';
      case 'Female': return 'Women';
      default: return 'Everyone';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </header>

      <main className="px-4 py-6 space-y-4 max-w-md mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              {profile.photos && profile.photos.length > 0 ? (
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {profile.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <TierBadge tier={profile.tier} />
                {profile.isVerified && <VerifiedBadge size="sm" />}
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3"
                leftIcon={<Edit2 className="h-4 w-4" />}
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* My Habits Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              My Habits
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {profile.habits.map((userHabit) => {
              const habit = HABITS.find(h => h.id === userHabit.id);
              if (!habit) return null;
              const Icon = habit.icon;
              const category = habit.category as HabitCategory;
              const colors = categoryColors[category] || categoryColors.Fitness;

              return (
                <div key={userHabit.id} className="px-4 py-3 flex items-center gap-3">
                  <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', colors.bg, colors.text)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{habit.name}</p>
                    <p className="text-sm text-gray-500">{userHabit.frequency}x per week</p>
                  </div>
                </div>
              );
            })}
            {profile.habits.length === 0 && (
              <div className="px-4 py-6 text-center text-gray-500">
                No habits selected yet
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/profile/habits')}
            className="w-full px-4 py-3 flex items-center justify-between text-indigo-600 hover:bg-indigo-50 transition-colors border-t border-gray-100"
          >
            <span className="font-medium">Manage Habits</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Preferences
            </h3>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Age Range</span>
              <span className="font-medium text-gray-900">
                {profile.preferences.ageRange[0]} - {profile.preferences.ageRange[1]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Distance</span>
              <span className="font-medium text-gray-900">
                Up to {profile.preferences.distance} km
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Looking for</span>
              <span className="font-medium text-gray-900">
                {getGenderPreferenceLabel(profile.preferences.gender)}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/profile/preferences')}
            className="w-full px-4 py-3 flex items-center justify-between text-indigo-600 hover:bg-indigo-50 transition-colors border-t border-gray-100"
          >
            <span className="font-medium">Edit Preferences</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </h3>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </main>
    </div>
  );
}
