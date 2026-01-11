import React from 'react';
import { Heart, X, MapPin } from 'lucide-react';
import { MatchProfile } from '../../data/mockMatches';
import { ProfilePhotos } from './ProfilePhotos';
import { HabitOverlap } from './HabitOverlap';
import { TierBadge, VerifiedBadge, ActivityDot, CompatibilityPill } from '../../design-system/components/Badge';
import { cn } from '../../lib/utils';
interface MatchCardProps {
  profile: MatchProfile;
  onLike: () => void;
  onPass: () => void;
  onViewDetails: () => void;
  disabled?: boolean;
}
export function MatchCard({
  profile,
  onLike,
  onPass,
  onViewDetails,
  disabled
}: MatchCardProps) {
  return <div className="relative w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div onClick={onViewDetails} className="cursor-pointer">
        <ProfilePhotos photos={profile.photos} name={profile.name} />

        <div className="p-5 pb-24">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}, {profile.age}
                </h2>
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
                  <span>{profile.distance}km</span>
                </div>
              </div>
            </div>
            <TierBadge tier={profile.tier} />
          </div>

          {profile.compatibility > 80 && <div className="mb-4">
              <CompatibilityPill />
            </div>}

          <div className="mb-4">
            <p className="text-gray-600 line-clamp-2">{profile.bio}</p>
          </div>

          <HabitOverlap habitIds={profile.habits} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 px-6">
        <button onClick={e => {
        e.stopPropagation();
        onPass();
      }} disabled={disabled} className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all disabled:opacity-50 disabled:hover:scale-100">
          <X className="h-8 w-8" />
        </button>
        <button onClick={e => {
        e.stopPropagation();
        onLike();
      }} disabled={disabled} className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-green-500 hover:bg-green-50 hover:scale-110 transition-all disabled:opacity-50 disabled:hover:scale-100">
          <Heart className="h-8 w-8 fill-current" />
        </button>
      </div>
    </div>;
}