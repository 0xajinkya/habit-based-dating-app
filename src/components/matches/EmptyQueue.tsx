import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
interface EmptyQueueProps {
  onReset: () => void;
}
export function EmptyQueue({
  onReset
}: EmptyQueueProps) {
  return <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <RefreshCw className="h-10 w-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        That's everyone for now!
      </h2>
      <p className="text-gray-500 mb-8">
        You've seen all the profiles in your area. Check back later or adjust
        your preferences.
      </p>
      <Button onClick={onReset} variant="secondary">
        Refresh Queue (Demo)
      </Button>
    </div>;
}