import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useMatch } from '../../contexts/MatchContext';
import { useUser } from '../../contexts/UserContext';
import { ProfilePhotos } from '../../components/matches/ProfilePhotos';
import { MatchHabitCalendar } from '../../components/matches/MatchHabitCalendar';
import { TierBadge, VerifiedBadge, ActivityDot, CompatibilityPill } from '../../design-system/components/Badge';
import { Button } from '../../design-system/components/Button';
import { useToast } from '../../design-system/components/Toast';
export function MatchProfilePage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    queue,
    likeProfile,
    passProfile
  } = useMatch();
  const {
    profile: userProfile
  } = useUser();
  const {
    showToast
  } = useToast();
  const [showOtherActivities, setShowOtherActivities] = useState(false);
  const profile = queue.find(p => p.id === id);
  if (!profile) {
    return <div className="p-8 text-center">Profile not found</div>;
  }
  const handleLike = () => {
    if (!userProfile?.isVerified) {
      showToast('Please verify your profile to like matches', 'error');
      return;
    }
    likeProfile(profile.id);
    showToast('Liked!', 'success');
    navigate('/matches');
  };
  const handlePass = () => {
    passProfile(profile.id);
    navigate('/matches');
  };
  // Generate mock logs for match's habits
  const generateMockLogsForHabit = (habitId: string) => {
    const logs: string[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      if (Math.random() > 0.25) {
        // 75% completion rate
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        logs.push(date.toISOString().split('T')[0]);
      }
    }
    return logs;
  };
  // Find shared habits
  const userHabitIds = userProfile?.habits.map(h => h.id) || [];
  const sharedHabits = profile.habits.filter(habitId => userHabitIds.includes(habitId));
  const otherHabits = profile.habits.filter(habitId => !userHabitIds.includes(habitId));
  return <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      <ProfilePhotos photos={profile.photos} name={profile.name} />

      <div className="px-6 py-6 -mt-6 relative bg-white rounded-t-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}, {profile.age}
              </h1>
              {profile.isVerified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ActivityDot status={profile.lastActive} />
              <span>
                {profile.lastActive === 'today' ? 'Active today' : 'Recently active'}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{profile.distance}km away</span>
              </div>
            </div>
          </div>
          <TierBadge tier={profile.tier} />
        </div>

        {profile.compatibility > 80 && <div className="mb-6">
            <CompatibilityPill />
          </div>}

        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
          </section>

          {/* Shared Habits */}
          {sharedHabits.length > 0 && <section>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Shared Habits ({sharedHabits.length})
              </h3>
              <div className="space-y-3">
                {sharedHabits.map(habitId => <MatchHabitCalendar key={habitId} habitId={habitId} logs={generateMockLogsForHabit(habitId)} isShared />)}
              </div>
            </section>}

          {/* Other Activities Accordion */}
          {otherHabits.length > 0 && <section>
              <button onClick={() => setShowOtherActivities(!showOtherActivities)} className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Other Activities ({otherHabits.length})
                </h3>
                {showOtherActivities ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </button>

              {showOtherActivities && <div className="space-y-3 mt-3 animate-in slide-in-from-top-2 fade-in-0">
                  {otherHabits.map(habitId => <MatchHabitCalendar key={habitId} habitId={habitId} logs={generateMockLogsForHabit(habitId)} />)}
                </div>}
            </section>}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom z-40">
        <div className="flex gap-4 max-w-md mx-auto">
          <Button variant="secondary" fullWidth onClick={handlePass} className="border-red-200 text-red-600 hover:bg-red-50">
            <X className="h-5 w-5 mr-2" />
            Pass
          </Button>
          <Button fullWidth onClick={handleLike} disabled={!userProfile?.isVerified} className="bg-green-600 hover:bg-green-700">
            <Heart className="h-5 w-5 mr-2 fill-current" />
            Like
          </Button>
        </div>
      </div>
    </div>;
}