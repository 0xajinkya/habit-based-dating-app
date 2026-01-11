import React from 'react';
import { cn } from '../../lib/utils';
interface PosePromptProps {
  pose: 'center' | 'smile' | 'blink';
  className?: string;
}
export function PosePrompt({
  pose,
  className
}: PosePromptProps) {
  const prompts = {
    center: 'Position your face in the oval',
    smile: 'Smile!',
    blink: 'Blink your eyes'
  };
  return <div className={cn('absolute top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium text-lg whitespace-nowrap animate-in slide-in-from-top-4', className)}>
      {prompts[pose]}
    </div>;
}