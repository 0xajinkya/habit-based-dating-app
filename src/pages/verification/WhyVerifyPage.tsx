import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Lock } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
export function WhyVerifyPage() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-white px-6 py-8 flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-8">
          <Shield className="h-10 w-10 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Why Verify?</h1>

        <p className="text-gray-600 mb-12 leading-relaxed">
          We're building a community of real, consistent people. Verification
          ensures everyone you match with is genuine.
        </p>

        <div className="w-full space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl text-left">
            <Users className="h-6 w-6 text-indigo-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                No Catfishing
              </h3>
              <p className="text-xs text-gray-500">
                Real photos, real people only.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl text-left">
            <Lock className="h-6 w-6 text-indigo-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Secure & Private
              </h3>
              <p className="text-xs text-gray-500">
                Your verification data is encrypted and never shared.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button fullWidth size="lg" onClick={() => navigate('/verification/camera')}>
          Start Verification
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/home')}>
          Maybe Later
        </Button>
      </div>
    </div>;
}