import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
export function ProcessingPage() {
  const navigate = useNavigate();
  const {
    updateProfile
  } = useUser();
  useEffect(() => {
    // Simulate API verification
    const timer = setTimeout(() => {
      updateProfile({
        isVerified: true
      });
      navigate('/verification/success');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, updateProfile]);
  return <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75" />
        <div className="relative bg-white p-4 rounded-full shadow-lg">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Verifying your identity...
      </h2>
      <p className="text-gray-500">This usually takes less than a minute.</p>
    </div>;
}