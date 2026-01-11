import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer } from 'lucide-react';
import { Button } from '../../design-system/components/Button';
import { OTPInput } from '../../components/auth/OTPInput';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../design-system/components/Toast';
export function OTPEntryPage() {
  const navigate = useNavigate();
  const {
    phone,
    login,
    onboardingCompleted
  } = useAuth();
  const {
    showToast
  } = useToast();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState(false);
  // Redirect if no phone number (e.g. direct access)
  useEffect(() => {
    if (!phone) {
      navigate('/auth/phone');
    }
  }, [phone, navigate]);
  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    setError(false);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // Mock validation: fail if OTP is "000000"
      if (otp === '000000') {
        setError(true);
        showToast('Invalid code. Please try again.', 'error');
        setOtp('');
        return;
      }
      login();
      showToast('Verified successfully!', 'success');
      // Route based on onboarding status
      if (onboardingCompleted) {
        navigate('/home');
      } else {
        navigate('/onboarding/welcome');
      }
    }, 1500);
  };
  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(60);
    showToast('New code sent!', 'success');
  };
  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);
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
            Enter the code
          </h1>
          <p className="text-gray-600">
            Sent to{' '}
            <span className="font-semibold text-gray-900">+91 {phone}</span>
          </p>
          <button onClick={() => navigate('/auth/phone')} className="text-indigo-600 text-sm font-medium mt-1 hover:underline">
            Wrong number?
          </button>
        </div>

        <div className="space-y-8">
          <OTPInput value={otp} onChange={val => {
          setOtp(val);
          if (error) setError(false);
        }} error={error} disabled={isLoading} />

          <div className="flex flex-col items-center gap-4">
            {timeLeft > 0 ? <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                <Timer className="h-4 w-4" />
                <span>Resend code in {timeLeft}s</span>
              </div> : <Button variant="tertiary" size="sm" onClick={handleResend}>
                Resend Code
              </Button>}
          </div>
        </div>

        <div className="mt-auto mb-4">
          <Button fullWidth size="lg" onClick={handleVerify} disabled={otp.length !== 6} isLoading={isLoading}>
            Verify
          </Button>
        </div>
      </main>
    </div>;
}