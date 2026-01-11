import React from 'react';
import { Input } from '../../design-system/components/Input';
interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
export function PhoneInput({
  value,
  onChange,
  error,
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (rawValue.length <= 10) {
      onChange(rawValue);
    }
  };
  return <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 border-r border-gray-200 pr-2">
        <span className="text-xl">🇮🇳</span>
        <span className="text-sm font-medium text-gray-600">+91</span>
      </div>
      <Input type="tel" inputMode="numeric" placeholder="999 999 9999" value={value} onChange={handleChange} className="pl-[5.5rem] tracking-widest font-medium text-lg" maxLength={10} error={error} {...props} />
    </div>;
}