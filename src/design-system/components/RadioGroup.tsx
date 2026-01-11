import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}
interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
export function RadioGroup({
  options,
  value,
  onChange,
  className
}: RadioGroupProps) {
  return <div className={cn('space-y-3', className)}>
      {options.map(option => {
      const isSelected = value === option.value;
      return <div key={option.value} onClick={() => onChange(option.value)} className={cn('relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200', isSelected ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 bg-white hover:border-gray-300')}>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={cn('font-medium', isSelected ? 'text-indigo-900' : 'text-gray-900')}>
                  {option.label}
                </span>
                {isSelected && <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>}
                {!isSelected && <div className="h-5 w-5 rounded-full border border-gray-300" />}
              </div>
              {option.description && <p className={cn('mt-1 text-sm', isSelected ? 'text-indigo-700' : 'text-gray-500')}>
                  {option.description}
                </p>}
            </div>
          </div>;
    })}
    </div>;
}