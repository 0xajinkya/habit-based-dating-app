import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../design-system/components/Button';
import { Sparkles, ShieldCheck, Clock } from 'lucide-react';
export function WelcomePage() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-white flex flex-col px-6 py-8 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <Sparkles className="h-10 w-10 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Let's build your profile
        </h1>

        <p className="text-gray-600 mb-12 leading-relaxed">
          We'll ask a few questions to help you find people who match your
          lifestyle and dedication.
        </p>

        <div className="w-full space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl text-left">
            <Clock className="h-6 w-6 text-indigo-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Quick & Easy
              </h3>
              <p className="text-xs text-gray-500">
                Takes about 2 minutes to complete
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl text-left">
            <ShieldCheck className="h-6 w-6 text-indigo-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Privacy First
              </h3>
              <p className="text-xs text-gray-500">
                You control who sees your data
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button fullWidth size="lg" onClick={() => navigate('/onboarding/basic-info')}>
          Get Started
        </Button>
      </div>
    </div>;
}