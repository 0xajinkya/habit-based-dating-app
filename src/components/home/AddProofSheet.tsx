import React, { useEffect, useState, useRef, createElement } from 'react';
import { Camera, X } from 'lucide-react';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button } from '../../design-system/components/Button';
interface AddProofSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (photo: string) => void;
}
export function AddProofSheet({
  isOpen,
  onClose,
  onCapture
}: AddProofSheetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera error:', err);
    }
  };
  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCameraActive(false);
  };
  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const photo = canvas.toDataURL('image/jpeg');
    onCapture(photo);
    stopCamera();
    onClose();
  };
  // Start camera when sheet opens
  useEffect(() => {
    if (isOpen) startCamera();else stopCamera();
  }, [isOpen]);
  return <BottomSheet isOpen={isOpen} onClose={onClose} title="Add Photo Proof">
      <div className="space-y-4">
        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <button onClick={handleCapture} className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white" />
            </button>
          </div>
        </div>

        <Button variant="ghost" fullWidth onClick={onClose}>
          Cancel
        </Button>
      </div>
    </BottomSheet>;
}