import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatch } from '../../contexts/MatchContext';
import { useUser } from '../../contexts/UserContext';
import { MatchCard } from '../../components/matches/MatchCard';
import { EmptyQueue } from '../../components/matches/EmptyQueue';
import { VerificationGate } from '../../components/verification/VerificationGate';
import { useToast } from '../../design-system/components/Toast';
export function MatchesPage() {
  const navigate = useNavigate();
  const {
    queue,
    likeProfile,
    passProfile,
    resetQueue
  } = useMatch();
  const {
    profile
  } = useUser();
  const {
    showToast
  } = useToast();
  if (!profile) return null;
  const currentMatch = queue[0];
  const handleLike = () => {
    if (!profile.isVerified) {
      showToast('Please verify your profile to like matches', 'error');
      return;
    }
    likeProfile(currentMatch.id);
    showToast('Liked!', 'success');
  };
  const handlePass = () => {
    passProfile(currentMatch.id);
  };
  return <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-30">
        <h1 className="text-xl font-bold text-gray-900 text-center">
          Discover
        </h1>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto">
        {currentMatch ? <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <MatchCard key={currentMatch.id} profile={currentMatch} onLike={handleLike} onPass={handlePass} onViewDetails={() => navigate(`/matches/${currentMatch.id}`)} disabled={!profile.isVerified} />
          </div> : <EmptyQueue onReset={resetQueue} />}
      </main>

      {!profile.isVerified && <VerificationGate />}
    </div>;
}