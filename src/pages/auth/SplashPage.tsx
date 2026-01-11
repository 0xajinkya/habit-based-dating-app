import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../design-system/components/Button';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

export function SplashPage() {
  const navigate = useNavigate();
  const { isAuthenticated, onboardingCompleted } = useAuth();

  useEffect(() => {
    if (isAuthenticated && onboardingCompleted) {
      navigate('/home', { replace: true });
    } else if (isAuthenticated && !onboardingCompleted) {
      navigate('/onboarding/welcome', { replace: true });
    }
  }, [isAuthenticated, onboardingCompleted, navigate]);

  return <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-50 to-white -z-10" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto w-full">
        {/* Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl rotate-3">
            <TrendingUp className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
            <ShieldCheck className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Consistency is <br />
          <span className="text-indigo-600">Attractive</span>
        </h1>

        {/* Value Prop */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          The first consistency verification engine. Match with people who share
          your dedication.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-medium text-gray-700">
              Verified Only
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-medium text-gray-700">
              Bangalore Exclusive
            </span>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="w-full mt-auto mb-8 space-y-4">
          <Button fullWidth size="lg" onClick={() => navigate('/auth/phone')} className="shadow-indigo-200 shadow-lg">
            Continue with Phone
          </Button>

          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </main>
    </div>;
}