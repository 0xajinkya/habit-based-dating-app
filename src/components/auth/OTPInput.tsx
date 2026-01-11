import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';
interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}
export function OTPInput({
  length = 6,
  value,
  onChange,
  error,
  disabled
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;
    // Allow only last character if multiple entered (paste scenario handled separately usually, but simple here)
    const newDigit = val.slice(-1);
    const newValue = value.split('');
    newValue[index] = newDigit;
    const newString = newValue.join('');
    onChange(newString);
    // Auto-advance
    if (newDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move back on backspace if empty
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).replace(/\D/g, '');
    if (pastedData) {
      onChange(pastedData);
      // Focus last filled index
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };
  return <div className="flex gap-2 justify-between">
      {Array.from({
      length
    }).map((_, i) => <input key={i} ref={el => inputRefs.current[i] = el} type="text" inputMode="numeric" maxLength={1} value={value[i] || ''} onChange={e => handleChange(e, i)} onKeyDown={e => handleKeyDown(e, i)} onPaste={handlePaste} disabled={disabled} className={cn('h-12 w-10 sm:h-14 sm:w-12 text-center text-xl font-bold rounded-lg border-2 bg-white transition-all focus:outline-none focus:ring-0', error ? 'border-red-300 text-red-600 focus:border-red-500 bg-red-50' : 'border-gray-200 text-gray-900 focus:border-indigo-500 focus:bg-indigo-50', disabled && 'opacity-50 cursor-not-allowed bg-gray-50')} />)}
    </div>;
}