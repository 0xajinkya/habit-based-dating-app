import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
export function CompletionPage() {
  const navigate = useNavigate();
  const {
    data,
    resetOnboarding
  } = useOnboarding();
  const {
    completeOnboarding,
    phone
  } = useAuth();
  const {
    updateProfile
  } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFinish = async () => {
    setIsSubmitting(true);
    // Simulate API save
    setTimeout(() => {
      // Save to UserContext (persisted to localStorage)
      updateProfile({
        id: Math.random().toString(36).substr(2, 9),
        phone,
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        photos: data.photos,
        habits: data.selectedHabits.map(h => ({
          id: h.id,
          frequency: data.habitFrequencies[h.id]
        })),
        preferences: data.preferences,
        isVerified: false,
        tier: 1
      });
      // Mark onboarding as complete in AuthContext
      completeOnboarding();
      // Clear draft
      resetOnboarding();
      // Navigate home
      navigate('/home');
    }, 2000);
  };
  console.log(data.selectedHabits);
  return <div className="min-h-screen bg-white px-6 py-8 flex flex-col items-center justify-center max-w-md mx-auto text-center">
      <div className="w-full mb-8">
        <ProgressStepper currentStep={6} totalSteps={6} />
      </div>

      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">You're all set!</h1>

      <p className="text-gray-600 mb-8 text-lg">
        Your profile is ready. Start logging your habits to unlock matches.
      </p>

      <div className="w-full bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-4">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Habits to Track
          </span>
          <div className="flex gap-2 mt-2">
            {data.selectedHabits.map(h => {
            const Icon = h.icon;
            return <div key={h.id} className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>;
          })}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Next Step:</span>{' '}
            Verify your profile to start matching with others.
          </p>
        </div>
      </div>

      <Button fullWidth size="lg" onClick={handleFinish} isLoading={isSubmitting}>
        Enter App
      </Button>
    </div>;
}