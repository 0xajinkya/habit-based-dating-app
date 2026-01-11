import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../design-system/components/Toast';
import { HABITS, Habit } from '../../data/habits';
import { Button } from '../../design-system/components/Button';
import { Slider } from '../../design-system/components/Slider';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Tabs } from '../../design-system/components/Tabs';
import { cn } from '../../lib/utils';

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

const categoryColors: Record<HabitCategory, { bg: string; text: string }> = {
  Fitness: { bg: 'bg-orange-50', text: 'text-orange-600' },
  Wellness: { bg: 'bg-green-50', text: 'text-green-600' },
  Learning: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Lifestyle: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  Creative: { bg: 'bg-purple-50', text: 'text-purple-600' }
};

const categories = ['All', 'Fitness', 'Wellness', 'Learning', 'Lifestyle', 'Creative'];

export function ManageHabitsPage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUser();
  const { showToast } = useToast();

  const [habits, setHabits] = useState(profile?.habits || []);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [newFrequency, setNewFrequency] = useState(3);

  if (!profile) return null;

  const handleFrequencyChange = (habitId: string, frequency: number) => {
    setHabits(prev =>
      prev.map(h => (h.id === habitId ? { ...h, frequency } : h))
    );
  };

  const handleDeleteHabit = (habitId: string) => {
    if (habits.length <= 1) {
      showToast('You must have at least one habit', 'error');
      return;
    }
    setHabits(prev => prev.filter(h => h.id !== habitId));
    showToast('Habit removed', 'success');
  };

  const handleAddHabit = () => {
    if (!selectedHabit) return;
    if (habits.length >= 5) {
      showToast('Maximum 5 habits allowed', 'error');
      return;
    }
    setHabits(prev => [...prev, { id: selectedHabit.id, frequency: newFrequency }]);
    setShowAddSheet(false);
    setSelectedHabit(null);
    setNewFrequency(3);
    showToast('Habit added', 'success');
  };

  const handleSave = () => {
    updateProfile({ habits });
    showToast('Habits updated successfully!', 'success');
    navigate(-1);
  };

  // Get habits not already selected
  const availableHabits = HABITS.filter(
    h => !habits.some(uh => uh.id === h.id)
  );

  const filteredAvailableHabits = selectedCategory === 'All'
    ? availableHabits
    : availableHabits.filter(h => h.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Manage Habits</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-4">
        {/* Current Habits */}
        <div className="space-y-3">
          {habits.map((userHabit) => {
            const habit = HABITS.find(h => h.id === userHabit.id);
            if (!habit) return null;
            const Icon = habit.icon;
            const category = habit.category as HabitCategory;
            const colors = categoryColors[category] || categoryColors.Fitness;

            return (
              <div
                key={userHabit.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', colors.bg, colors.text)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{habit.name}</p>
                    <p className="text-sm text-gray-500">{habit.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteHabit(userHabit.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <Slider
                  min={1}
                  max={7}
                  value={userHabit.frequency}
                  onChange={(v) => handleFrequencyChange(userHabit.id, v as number)}
                  label="Frequency"
                  formatValue={(v) => v === 7 ? 'Everyday' : `${v}x/week`}
                />
              </div>
            );
          })}
        </div>

        {/* Add Habit Button */}
        {habits.length < 5 && (
          <Button
            variant="secondary"
            fullWidth
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={() => setShowAddSheet(true)}
          >
            Add Habit
          </Button>
        )}

        {/* Save Button */}
        <div className="pt-4">
          <Button fullWidth size="lg" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </main>

      {/* Add Habit Sheet */}
      <BottomSheet
        isOpen={showAddSheet}
        onClose={() => {
          setShowAddSheet(false);
          setSelectedHabit(null);
          setNewFrequency(3);
        }}
        title="Add Habit"
      >
        {/* Category Tabs */}
        <div className="mb-4 -mx-2 px-2 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Available Habits Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6 max-h-48 overflow-y-auto">
          {filteredAvailableHabits.map(habit => {
            const Icon = habit.icon;
            const category = habit.category as HabitCategory;
            const colors = categoryColors[category] || categoryColors.Fitness;
            const isSelected = selectedHabit?.id === habit.id;

            return (
              <button
                key={habit.id}
                onClick={() => setSelectedHabit(habit)}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all text-left',
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-100 hover:border-gray-200'
                )}
              >
                <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center mb-2', colors.bg, colors.text)}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">{habit.name}</p>
              </button>
            );
          })}
          {filteredAvailableHabits.length === 0 && (
            <div className="col-span-2 py-8 text-center text-gray-500">
              No more habits available in this category
            </div>
          )}
        </div>

        {/* Frequency Selector (shown when habit selected) */}
        {selectedHabit && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-3">
              How often will you do <span className="font-semibold">{selectedHabit.name}</span>?
            </p>
            <Slider
              min={1}
              max={7}
              value={newFrequency}
              onChange={(v) => setNewFrequency(v as number)}
              formatValue={(v) => v === 7 ? 'Everyday' : `${v}x/week`}
            />
          </div>
        )}

        {/* Add Button */}
        <Button
          fullWidth
          onClick={handleAddHabit}
          disabled={!selectedHabit}
        >
          Add Habit
        </Button>
      </BottomSheet>
    </div>
  );
}
