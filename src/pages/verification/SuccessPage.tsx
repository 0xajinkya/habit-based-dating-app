import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
export function SuccessPage() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-white px-6 py-8 flex flex-col items-center justify-center max-w-md mx-auto text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <ShieldCheck className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        You're Verified!
      </h1>

      <p className="text-gray-600 mb-8 text-lg">
        Your profile now has the verified badge. You can start matching with
        others.
      </p>

      <Button fullWidth size="lg" onClick={() => navigate('/home')}>
        Back to Home
      </Button>
    </div>;
}