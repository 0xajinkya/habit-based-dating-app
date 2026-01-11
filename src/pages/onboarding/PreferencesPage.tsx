import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { Slider } from '../../design-system/components/Slider';
import { RadioGroup } from '../../design-system/components/RadioGroup';
import { useOnboarding } from '../../contexts/OnboardingContext';
export function PreferencesPage() {
  const navigate = useNavigate();
  const {
    data,
    updatePreferences
  } = useOnboarding();
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="mt-4">
          <ProgressStepper currentStep={5} totalSteps={6} />
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Preferences</h1>
        <p className="text-gray-600 mb-8">Who are you looking to match with?</p>

        <div className="space-y-8">
          {/* Age Range */}
          <div>
            <Slider min={18} max={60} value={data.preferences.ageRange} onChange={val => updatePreferences({
            ageRange: val as [number, number]
          })} label="Age Range" className="mb-2" />
            <p className="text-xs text-gray-500">
              We suggest a range of +/- 5 years for best compatibility.
            </p>
          </div>

          {/* Distance */}
          <div>
            <Slider min={1} max={50} value={data.preferences.distance} onChange={val => updatePreferences({
            distance: val as number
          })} label="Maximum Distance" formatValue={v => `${v} km`} className="mb-2" />
            <p className="text-xs text-gray-500">
              Bangalore traffic is real. Keep it close!
            </p>
          </div>

          {/* Gender Preference */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Show me</label>
            <RadioGroup options={[{
            value: 'Male',
            label: 'Men'
          }, {
            value: 'Female',
            label: 'Women'
          }, {
            value: 'any',
            label: 'Everyone'
          }]} value={data.preferences.gender} onChange={val => updatePreferences({
            gender: val
          })} />
          </div>
        </div>

        <div className="mt-auto pt-8">
          <Button fullWidth size="lg" onClick={() => navigate('/onboarding/completion')}>
            Review & Finish
          </Button>
        </div>
      </main>
    </div>;
}