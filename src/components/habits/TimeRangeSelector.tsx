import React from 'react';
import { cn } from '../../lib/utils';
interface TimeRangeSelectorProps {
  selected: 'week' | 'month' | 'quarter';
  onChange: (range: 'week' | 'month' | 'quarter') => void;
  className?: string;
}
export function TimeRangeSelector({
  selected,
  onChange,
  className
}: TimeRangeSelectorProps) {
  const options = [{
    value: 'week' as const,
    label: 'Week'
  }, {
    value: 'month' as const,
    label: 'Month'
  }, {
    value: 'quarter' as const,
    label: 'Quarter'
  }];
  return <div className={cn('inline-flex rounded-lg bg-gray-100 p-1', className)}>
      {options.map(option => <button key={option.value} onClick={() => onChange(option.value)} className={cn('px-4 py-1.5 text-sm font-medium rounded-md transition-all', selected === option.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900')}>
          {option.label}
        </button>)}
    </div>;
}