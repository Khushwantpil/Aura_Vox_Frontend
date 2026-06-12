import React, { useState, useEffect } from 'react';

const Loader = ({ isExiting }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING CORE AI');

  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 25) setLoadingText('INITIALIZING CORE AI');
      else if (currentProgress < 50) setLoadingText('CALIBRATING VOICE MODEL');
      else if (currentProgress < 80) setLoadingText('ESTABLISHING NEURAL LINK');
      else setLoadingText('FINALIZING SYSTEM BOOT');

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Pre-calculate heights for the waveform
  const waveHeights = Array.from({ length: 44 }).map((_, i) => {
    const centerDist = Math.abs(22 - i);
    const maxHeight = 100 - (centerDist * 3.5) + (Math.random() * 20 - 10);
    return Math.max(15, Math.min(100, maxHeight));
  });

  return (
  <div className={`w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] relative overflow-hidden transition-all duration-[800ms] origin-center ${isExiting ? 'scale-[1.5] opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`} style={{ transitionTimingFunction: isExiting ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'ease-in-out' }}>
    {/* Soft glowing background orbs */}
    <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/30 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
    <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/30 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
    
    {/* Central AI Orb & Rings */}
    <div className="relative z-10 flex items-center justify-center w-40 h-40 mb-16">
      
      {/* Wavefront Expanding Energy Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-24 h-24 rounded-full border border-cyan-600/30"
            style={{
              animation: `ripple 4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
      {/* Outer dashed spinning ring */}
      <div className="absolute inset-[-20px] border-2 border-dashed border-cyan-500/40 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
      {/* Inner solid fast ring */}
      <div className="absolute inset-[-5px] border-2 border-transparent border-t-cyan- border-b-purple-500 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
      {/* Pulse base */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-600 to-purple-400 opacity-20 blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
      
      {/* Core Glowing Orb with slight vibration */}
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#00C2CB] to-[#00D28E] shadow-[0_15px_50px_rgba(168,85,247,0.5)] flex items-center justify-center overflow-hidden animate-[vibrate_0.3s_linear_infinite]">
        {/* Scanning laser effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent w-full h-[200%] animate-[scan_2s_linear_infinite]" />
        
        {/* Modern AI Chip SVG */}
        <svg className="w-10 h-10 text-white opacity-95 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      </div>
    </div>

    {/* Text & Waveform Progress Bar replacing the thin bar */}
    <div className="relative z-20 w-full max-w-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[10px] sm:text-[11px] font-mono text-gray-500 font-bold uppercase tracking-[0.2em]">
          {isExiting ? 'SYSTEMS ONLINE' : loadingText}
        </p>
        <p className="text-[10px] sm:text-[11px] font-mono text-gray-500 font-bold tracking-[0.2em]">
          {isExiting ? '100%' : `${progress}%`}
        </p>
      </div>
      
      {/* Waveform acting as Progress Bar */}
      <div className="flex items-center justify-between h-10 w-full gap-[3px]">
        {waveHeights.map((h, i) => {
           const barProgress = (i / waveHeights.length) * 100;
           const isFilled = isExiting || progress > barProgress;
           return (
             <div 
               key={i}
               className={`flex-1 rounded-full transition-all duration-300 ${isFilled ? 'bg-gradient-to-t from-[#00C2CB] to-[#00D28E]' : 'bg-gray-200'}`}
               style={{
                 height: `${h}%`,
                 opacity: isFilled ? 1 : 0.4,
                 animation: isFilled ? `waveIdle ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate` : 'none',
                 animationDelay: `${Math.random()}s`
               }}
             />
           );
        })}
      </div>
      
      <h2 className="text-2xl font-bold text-[#081028] tracking-tight text-center mt-10">
        Tuning your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-500">assistant</span>
      </h2>
    </div>

    {/* Custom styles */}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes ripple {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(4); opacity: 0; }
      }
      @keyframes vibrate {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-0.5px, 0.5px); }
        50% { transform: translate(0.5px, -0.5px); }
        75% { transform: translate(-0.5px, -0.5px); }
      }
      @keyframes waveIdle {
        0% { transform: scaleY(0.85); opacity: 0.7; }
        100% { transform: scaleY(1.15); opacity: 1; }
      }
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(50%); }
      }
    `}} />
  </div>
  );
};

export default Loader;
