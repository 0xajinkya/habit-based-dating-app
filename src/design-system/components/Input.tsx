import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  id,
  ...props
}, ref) => {
  const inputId = id || useId();
  return <div className="w-full space-y-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
            {label}
          </label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>}
          <input id={inputId} className={cn('flex h-12 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200', leftIcon && 'pl-10', rightIcon && 'pr-10', error && 'border-red-500 focus-visible:ring-red-500', className)} ref={ref} {...props} />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>}
        </div>
        {error && <div className="flex items-center gap-x-1 text-sm text-red-600 animate-in slide-in-from-top-1 fade-in-0">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      </div>;
});
Input.displayName = 'Input';