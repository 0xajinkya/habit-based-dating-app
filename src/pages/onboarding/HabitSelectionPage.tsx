import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { HabitCard } from '../../components/onboarding/HabitCard';
import { Tabs } from '../../design-system/components/Tabs';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { HABITS, HABIT_CATEGORIES, HabitCategory } from '../../data/habits';
import { useToast } from '../../design-system/components/Toast';
export function HabitSelectionPage() {
  const navigate = useNavigate();
  const {
    data,
    toggleHabit
  } = useOnboarding();
  const {
    showToast
  } = useToast();
  const [activeCategory, setActiveCategory] = useState<HabitCategory>('Fitness');
  const filteredHabits = HABITS.filter(h => h.category === activeCategory);
  const selectedCount = data.selectedHabits.length;
  const handleContinue = () => {
    if (selectedCount === 0) {
      showToast('Please select at least 1 habit', 'error');
      return;
    }
    navigate('/onboarding/frequency');
  };
  const handleToggle = (habit: any) => {
    if (selectedCount >= 3 && !data.selectedHabits.find(h => h.id === habit.id)) {
      showToast('You can only select up to 3 habits', 'error');
      return;
    }
    toggleHabit(habit);
  };
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="mt-4">
          <ProgressStepper currentStep={3} totalSteps={6} />
        </div>
      </div>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Choose Habits
          </h1>
          <p className="text-gray-600">
            Select 1-3 habits you want to track and match on.
          </p>
        </div>

        <Tabs tabs={HABIT_CATEGORIES.map(c => ({
        id: c,
        label: c
      }))} activeTab={activeCategory} onChange={id => setActiveCategory(id as HabitCategory)} className="mb-6" />

        <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4">
          {filteredHabits.map(habit => <HabitCard key={habit.id} habit={habit} isSelected={!!data.selectedHabits.find(h => h.id === habit.id)} onToggle={() => handleToggle(habit)} disabled={selectedCount >= 3} />)}
        </div>

        <div className="mt-auto pt-4 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-600">Selected:</span>
            <span className="font-semibold text-indigo-600">
              {selectedCount}/3
            </span>
          </div>
          <Button fullWidth size="lg" onClick={handleContinue} disabled={selectedCount === 0}>
            Continue
          </Button>
        </div>
      </main>
    </div>;
}