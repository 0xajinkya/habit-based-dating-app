import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { PhotoUploader } from '../../components/onboarding/PhotoUploader';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useToast } from '../../design-system/components/Toast';
export function PhotosPage() {
  const navigate = useNavigate();
  const {
    data,
    addPhoto,
    removePhoto
  } = useOnboarding();
  const {
    showToast
  } = useToast();
  const handleContinue = () => {
    if (data.photos.length < 2) {
      showToast('Please add at least 2 photos to continue', 'error');
      return;
    }
    navigate('/onboarding/habits');
  };
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="mt-4">
          <ProgressStepper currentStep={2} totalSteps={6} />
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Photos</h1>
        <p className="text-gray-600 mb-8">
          Add at least 2 photos to show your authentic self.
        </p>

        <PhotoUploader photos={data.photos} onAdd={addPhoto} onRemove={removePhoto} />

        <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
          <h3 className="font-medium text-indigo-900 text-sm mb-2">
            Photo Tips:
          </h3>
          <ul className="text-xs text-indigo-700 space-y-1 list-disc pl-4">
            <li>Clear face visibility</li>
            <li>No sunglasses or masks</li>
            <li>Show your hobbies/interests</li>
            <li>Good lighting works wonders</li>
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <Button fullWidth size="lg" onClick={handleContinue} disabled={data.photos.length < 2}>
            Continue ({data.photos.length}/2 required)
          </Button>
        </div>
      </main>
    </div>;
}