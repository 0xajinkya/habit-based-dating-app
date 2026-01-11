import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { Input } from '../../design-system/components/Input';
import { RadioGroup } from '../../design-system/components/RadioGroup';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { useOnboarding } from '../../contexts/OnboardingContext';
export function BasicInfoPage() {
  const navigate = useNavigate();
  const {
    data,
    updateBasicInfo
  } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.age) newErrors.age = 'Age is required';else if (Number(data.age) < 18) newErrors.age = 'You must be 18+ to join';
    if (!data.gender) newErrors.gender = 'Please select your gender';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleContinue = () => {
    if (validate()) {
      navigate('/onboarding/photos');
    }
  };
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="mt-4">
          <ProgressStepper currentStep={1} totalSteps={6} />
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic Info</h1>
        <p className="text-gray-600 mb-8">Tell us a bit about yourself.</p>

        <div className="space-y-6">
          <Input label="Full Name" placeholder="e.g. Rahul Sharma" value={data.name} onChange={e => updateBasicInfo({
          name: e.target.value
        })} error={errors.name} />

          <Input label="Age" type="number" placeholder="e.g. 24" value={data.age} onChange={e => updateBasicInfo({
          age: e.target.value ? Number(e.target.value) : ''
        })} error={errors.age} hint="You must be 18 or older to use this app." />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <RadioGroup options={[{
            value: 'Male',
            label: 'Male'
          }, {
            value: 'Female',
            label: 'Female'
          }, {
            value: 'Non-binary',
            label: 'Non-binary'
          }]} value={data.gender} onChange={val => updateBasicInfo({
            gender: val
          })} />
            {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
          </div>
        </div>

        <div className="mt-auto pt-8">
          <Button fullWidth size="lg" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </main>
    </div>;
}