import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
interface ProfilePhotosProps {
  photos: string[];
  name: string;
}
export function ProfilePhotos({
  photos,
  name
}: ProfilePhotosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  return <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
      <img src={photos[currentIndex]} alt={`${name} ${currentIndex + 1}`} className="w-full h-full object-cover" />

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full" onClick={prevPhoto} />
        <div className="w-1/2 h-full" onClick={nextPhoto} />
      </div>

      {/* Indicators */}
      <div className="absolute top-2 left-2 right-2 flex gap-1">
        {photos.map((_, idx) => <div key={idx} className={cn('h-1 flex-1 rounded-full transition-all', idx === currentIndex ? 'bg-white' : 'bg-white/30')} />)}
      </div>
    </div>;
}