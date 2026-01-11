import React from 'react';
import { cn } from '../../lib/utils';
interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}
export function ProgressStepper({
  currentStep,
  totalSteps
}: ProgressStepperProps) {
  return <div className="w-full space-y-2">
      <div className="flex justify-between text-xs font-medium text-gray-500">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(currentStep / totalSteps * 100)}% Complete</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full" style={{
        width: `${currentStep / totalSteps * 100}%`
      }} />
      </div>
    </div>;
}