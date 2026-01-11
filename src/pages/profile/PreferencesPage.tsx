import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../design-system/components/Toast';
import { Slider } from '../../design-system/components/Slider';
import { RadioGroup } from '../../design-system/components/RadioGroup';
import { Button } from '../../design-system/components/Button';

export function PreferencesPage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUser();
  const { showToast } = useToast();

  const [ageRange, setAgeRange] = useState<[number, number]>(
    profile?.preferences.ageRange || [21, 35]
  );
  const [distance, setDistance] = useState(profile?.preferences.distance || 10);
  const [genderPreference, setGenderPreference] = useState(
    profile?.preferences.gender || 'any'
  );

  if (!profile) return null;

  const genderOptions = [
    { value: 'Male', label: 'Men', description: 'Show me men' },
    { value: 'Female', label: 'Women', description: 'Show me women' },
    { value: 'any', label: 'Everyone', description: 'Show me everyone' }
  ];

  const handleSave = () => {
    updateProfile({
      preferences: {
        ageRange,
        distance,
        gender: genderPreference
      }
    });
    showToast('Preferences updated successfully!', 'success');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Preferences</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-8">
        {/* Age Range */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Age Range</h2>
          <p className="text-sm text-gray-500 mb-4">
            Set the age range of people you'd like to meet
          </p>
          <Slider
            min={18}
            max={60}
            value={ageRange}
            onChange={(v) => setAgeRange(v as [number, number])}
            formatValue={(v) => `${v}`}
            label="Age"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>18</span>
            <span>60</span>
          </div>
        </div>

        {/* Distance */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Maximum Distance</h2>
          <p className="text-sm text-gray-500 mb-4">
            Only show people within this distance
          </p>
          <Slider
            min={1}
            max={100}
            value={distance}
            onChange={(v) => setDistance(v as number)}
            formatValue={(v) => `${v} km`}
            label="Distance"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1 km</span>
            <span>100 km</span>
          </div>
        </div>

        {/* Gender Preference */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Show Me</h2>
          <p className="text-sm text-gray-500 mb-4">
            Who would you like to see?
          </p>
          <RadioGroup
            options={genderOptions}
            value={genderPreference}
            onChange={setGenderPreference}
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button fullWidth size="lg" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </main>
    </div>
  );
}
