import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
export function CameraPermissionPage() {
  const navigate = useNavigate();
  const handleEnable = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true
      });
      navigate('/verification/capture');
    } catch (err) {
      alert('Please enable camera access in your browser settings to continue.');
    }
  };
  return <div className="min-h-screen bg-white px-6 py-8 flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <Camera className="h-10 w-10 text-gray-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Enable Camera</h1>

        <p className="text-gray-600 mb-8">
          We need access to your camera to verify your identity. This will only
          be used for the verification process.
        </p>
      </div>

      <div className="mt-8">
        <Button fullWidth size="lg" onClick={handleEnable}>
          Enable Camera
        </Button>
      </div>
    </div>;
}