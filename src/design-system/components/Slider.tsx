import React from 'react';
import { cn } from '../../lib/utils';
interface SliderProps {
  min: number;
  max: number;
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  step?: number;
  className?: string;
  label?: string;
  formatValue?: (val: number) => string;
}
export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
  label,
  formatValue = v => v.toString()
}: SliderProps) {
  const isRange = Array.isArray(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const newVal = Number(e.target.value);
    if (isRange) {
      const currentRange = value as [number, number];
      const newRange = [...currentRange] as [number, number];
      if (index === 0) {
        newRange[0] = Math.min(newVal, currentRange[1] - step);
      } else {
        newRange[1] = Math.max(newVal, currentRange[0] + step);
      }
      onChange(newRange);
    } else {
      onChange(newVal);
    }
  };
  return <div className={cn('w-full space-y-4', className)}>
      {label && <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className="text-sm text-indigo-600 font-semibold">
            {isRange ? `${formatValue((value as number[])[0])} - ${formatValue((value as number[])[1])}` : formatValue(value as number)}
          </span>
        </div>}

      <div className="relative h-2 w-full rounded-full bg-gray-200">
        {/* Track fill */}
        <div className="absolute h-full rounded-full bg-indigo-600" style={{
        left: isRange ? `${((value as number[])[0] - min) / (max - min) * 100}%` : '0%',
        right: isRange ? `${100 - ((value as number[])[1] - min) / (max - min) * 100}%` : `${100 - ((value as number) - min) / (max - min) * 100}%`
      }} />

        {/* Range Inputs */}
        {isRange ? <>
            <input type="range" min={min} max={max} step={step} value={(value as number[])[0]} onChange={e => handleChange(e, 0)} className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
            <input type="range" min={min} max={max} step={step} value={(value as number[])[1]} onChange={e => handleChange(e, 1)} className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />

            {/* Thumbs (Visual only) */}
            <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-indigo-600 bg-white shadow-md pointer-events-none" style={{
          left: `${((value as number[])[0] - min) / (max - min) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }} />
            <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-indigo-600 bg-white shadow-md pointer-events-none" style={{
          left: `${((value as number[])[1] - min) / (max - min) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }} />
          </> : <>
            <input type="range" min={min} max={max} step={step} value={value as number} onChange={handleChange} className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
            <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-indigo-600 bg-white shadow-md pointer-events-none" style={{
          left: `${((value as number) - min) / (max - min) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }} />
          </>}
      </div>
    </div>;
}