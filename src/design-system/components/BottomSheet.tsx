import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}
export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  className
}: BottomSheetProps) {
  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose} />

      {/* Sheet Content */}
      <div className={cn('relative w-full max-w-md transform rounded-t-2xl bg-white p-6 shadow-xl transition-all animate-in slide-in-from-bottom-full duration-300 sm:rounded-2xl', className)}>
        {/* Handle for mobile feel */}
        <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200 sm:hidden" />

        <div className="mb-6 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>;
}