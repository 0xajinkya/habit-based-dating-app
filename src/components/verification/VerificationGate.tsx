import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
export function VerificationGate() {
  const navigate = useNavigate();
  return <div className="fixed bottom-20 left-4 right-4 z-40">
      <div className="bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl border border-gray-800 animate-in slide-in-from-bottom-10">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Verify to Match</h3>
            <p className="text-gray-300 text-sm mb-4">
              To ensure trust and consistency, all users must verify their
              identity before matching.
            </p>
            <Button size="sm" fullWidth onClick={() => navigate('/verification/why')} className="bg-white text-gray-900 hover:bg-gray-100">
              Start Verification
            </Button>
          </div>
        </div>
      </div>
    </div>;
}