import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { Slider } from '../../design-system/components/Slider';
import { useOnboarding } from '../../contexts/OnboardingContext';
export function FrequencyGoalPage() {
  const navigate = useNavigate();
  const {
    data,
    setHabitFrequency
  } = useOnboarding();
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="mt-4">
          <ProgressStepper currentStep={4} totalSteps={6} />
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Set Goals</h1>
        <p className="text-gray-600 mb-8">
          How many times per week do you want to do each habit?
        </p>

        <div className="space-y-8">
          {data.selectedHabits.map(habit => {
          const Icon = habit.icon;
          const freq = data.habitFrequencies[habit.id] || habit.suggestedFrequency;
          return <div key={habit.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {habit.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Target: {freq} days/week
                    </p>
                  </div>
                </div>

                <Slider min={1} max={7} value={freq} onChange={val => setHabitFrequency(habit.id, val as number)} label="Frequency" formatValue={v => `${v}x`} />

                <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                  <span>1x</span>
                  <span>Everyday</span>
                </div>
              </div>;
        })}
        </div>

        <div className="mt-auto pt-8">
          <Button fullWidth size="lg" onClick={() => navigate('/onboarding/preferences')}>
            Continue
          </Button>
        </div>
      </main>
    </div>;
}