import React, { useRef } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface PhotoUploaderProps {
  photos: string[];
  onAdd: (photo: string) => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}
export function PhotoUploader({
  photos,
  onAdd,
  onRemove,
  maxPhotos = 6
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAdd(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className="grid grid-cols-3 gap-3">
      {/* Existing Photos */}
      {photos.map((photo, index) => <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden group bg-gray-100">
          <img src={photo} alt={`Profile ${index + 1}`} className="w-full h-full object-cover" />
          <button onClick={() => onRemove(index)} className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors">
            <X className="h-4 w-4" />
          </button>
          {index === 0 && <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] py-1 text-center font-medium">
              Main Photo
            </div>}
        </div>)}

      {/* Add Button */}
      {photos.length < maxPhotos && <button onClick={() => fileInputRef.current?.click()} className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 transition-all">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium">Add Photo</span>
        </button>}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>;
}