import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { PhoneInput } from '../../components/auth/PhoneInput';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../design-system/components/Toast';
export function PhoneEntryPage() {
  const navigate = useNavigate();
  const {
    setPhone
  } = useAuth();
  const {
    showToast
  } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSendOTP = async () => {
    if (inputValue.length !== 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPhone(inputValue);
      showToast('OTP sent successfully', 'success');
      navigate('/auth/otp');
    }, 1500);
  };
  return <div className="min-h-screen bg-white px-4 py-6 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      <main className="flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            What's your number?
          </h1>
          <p className="text-gray-600">
            We'll send you a code to verify your account.
          </p>
        </div>

        <div className="space-y-6">
          <PhoneInput value={inputValue} onChange={val => {
          setInputValue(val);
          if (error) setError('');
        }} error={error} autoFocus />

          <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <Lock className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              We never share your phone number with other users. It's only used
              for verification and account security.
            </p>
          </div>
        </div>

        <div className="mt-auto mb-4">
          <Button fullWidth size="lg" onClick={handleSendOTP} disabled={inputValue.length !== 10} isLoading={isLoading}>
            Send OTP
          </Button>
          <p className="text-center text-xs text-gray-400 mt-4">
            Standard message rates may apply.
          </p>
        </div>
      </main>
    </div>;
}