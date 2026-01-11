import React, { useState, useRef } from 'react';
import { Camera, Clock, X, Upload } from 'lucide-react';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button } from '../../design-system/components/Button';
import { Input } from '../../design-system/components/Input';
import { HABITS } from '../../data/habits';
import { cn } from '../../lib/utils';

interface LogHabitSheetProps {
  isOpen: boolean;
  onClose: () => void;
  habitId: string;
  onLog: (data: { proofPhoto?: string; startTime?: string; endTime?: string }) => void;
}

type HabitCategory = 'Fitness' | 'Wellness' | 'Learning' | 'Lifestyle' | 'Creative';

const categoryColors: Record<HabitCategory, { bg: string; text: string }> = {
  Fitness: { bg: 'bg-orange-50', text: 'text-orange-600' },
  Wellness: { bg: 'bg-green-50', text: 'text-green-600' },
  Learning: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Lifestyle: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  Creative: { bg: 'bg-purple-50', text: 'text-purple-600' }
};

export function LogHabitSheet({ isOpen, onClose, habitId, onLog }: LogHabitSheetProps) {
  const [proofPhoto, setProofPhoto] = useState<string | undefined>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const habit = HABITS.find(h => h.id === habitId);
  if (!habit) return null;

  const Icon = habit.icon;
  const category = habit.category as HabitCategory;
  const colors = categoryColors[category] || categoryColors.Fitness;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onLog({
      proofPhoto,
      startTime: startTime || undefined,
      endTime: endTime || undefined
    });
    // Reset form
    setProofPhoto(undefined);
    setStartTime('');
    setEndTime('');
    onClose();
  };

  const handleCancel = () => {
    setProofPhoto(undefined);
    setStartTime('');
    setEndTime('');
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleCancel} title="Log Activity">
      {/* Habit Info */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', colors.bg, colors.text)}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{habit.name}</h3>
          <p className="text-sm text-gray-500">{habit.category}</p>
        </div>
      </div>

      {/* Proof Photo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Proof Photo <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
        />
        {proofPhoto ? (
          <div className="relative">
            <img
              src={proofPhoto}
              alt="Proof"
              className="w-full h-40 object-cover rounded-xl"
            />
            <button
              onClick={() => setProofPhoto(undefined)}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
          >
            <Upload className="h-8 w-8" />
            <span className="text-sm">Tap to upload photo</span>
          </button>
        )}
      </div>

      {/* Time Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Started at
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ended at
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={handleSubmit}
        >
          Mark Done
        </Button>
      </div>
    </BottomSheet>
  );
}
