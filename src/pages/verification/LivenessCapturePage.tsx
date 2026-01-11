import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PosePrompt } from '../../components/verification/PosePrompt';
export function LivenessCapturePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pose, setPose] = useState<'center' | 'smile' | 'blink'>('center');
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user'
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    };
    startCamera();
    // Simulate pose detection sequence
    const timer1 = setTimeout(() => setPose('smile'), 2000);
    const timer2 = setTimeout(() => setPose('blink'), 4000);
    const timer3 = setTimeout(() => {
      // Stop camera
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      navigate('/verification/processing');
    }, 6000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);
  return <div className="fixed inset-0 bg-black">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

      {/* Oval Mask */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <mask id="oval-mask">
              <rect width="100" height="100" fill="white" />
              <ellipse cx="50" cy="45" rx="35" ry="45" fill="black" />
            </mask>
          </defs>
          <rect width="100" height="100" fill="rgba(0,0,0,0.5)" mask="url(#oval-mask)" />
        </svg>

        {/* Border for oval */}
        <div className="absolute top-[5%] left-[15%] right-[15%] bottom-[15%] border-4 border-white/30 rounded-[50%] pointer-events-none" />
      </div>

      <PosePrompt pose={pose} />
    </div>;
}