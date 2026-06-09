import React, { useState } from 'react';


const themes = {
  dark: {
    bg: "bg-[#050816]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]",
    orb: "from-cyan-400 via-purple-500 to-pink-500",
    cardBorder: "border border-white/10",
    text: "text-white",
    sub: "text-white/65",
    listening: "text-emerald-400",
    wave: "bg-emerald-400",
    button: "from-purple-500 to-violet-400",
    micGlow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
  },
  light: {
    bg: "bg-gradient-to-br from-white via-[#f8fafc] to-[#eefeff]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(59,130,247,0.14),transparent_45%)]",
    orb: "from-blue-300 via-cyan-300 to-pink-300",
    cardBorder: "border border-[#dbeafe]",
    text: "text-[#081028]",
    sub: "text-[#475569]",
    listening: "text-blue-500",
    wave: "bg-blue-500",
    button: "from-blue-400 to-cyan-400",
    micGlow: "shadow-[0_0_70px_rgba(59,130,247,0.35)]",
  },
  glass: {
    bg: "bg-white/30 backdrop-blur-[24px]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_50%)]",
    orb: "from-purple-400 via-pink-400 to-cyan-400",
    cardBorder: "border border-white/50",
    text: "text-slate-800",
    sub: "text-slate-600/70",
    listening: "text-purple-600",
    wave: "bg-purple-500",
    button: "from-purple-500 to-indigo-500",
    micGlow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]",
  },
  neon: {
    bg: "bg-[#03120d]",
    overlay: "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]",
    orb: "from-emerald-300 via-green-400 to-cyan-400",
    cardBorder: "border border-green-400/30",
    text: "text-emerald-50",
    sub: "text-emerald-100/70",
    listening: "text-emerald-300",
    wave: "bg-emerald-300",
    button: "from-emerald-400 to-green-500",
    micGlow: "shadow-[0_0_70px_rgba(16,185,129,0.45)]",
  },
};

function AssistantPreview() {
  const [theme, setTheme] = useState("dark");
  const current = themes[theme];

  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      {/* Custom Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 28px; }
        }
        .animate-wave1 { animation: wave 1.2s ease-in-out infinite; }
        .animate-wave2 { animation: wave 0.9s ease-in-out infinite 0.2s; }
        .animate-wave3 { animation: wave 1.4s ease-in-out infinite 0.4s; }
        .animate-wave4 { animation: wave 1.0s ease-in-out infinite 0.1s; }
        .animate-wave5 { animation: wave 1.3s ease-in-out infinite 0.3s; }
      `}} />

      <div className={`relative w-[280px] h-[450px] sm:w-[320px] sm:h-[480px] rounded-[36px] overflow-hidden transition-all duration-500 ${current.bg} ${current.cardBorder} shadow-[0_20px_80px_rgba(0,0,0,0.25)] flex flex-col justify-between p-6`}>
        {/* Theme Overlay */}
        <div className={`absolute inset-0 pointer-events-none ${current.overlay}`} />

        {/* Card Header */}
        <div className="relative z-20 flex justify-between items-center w-full">
          <span className={`text-xs font-bold uppercase tracking-wider ${current.text} opacity-60`}>
            Live Preview
          </span>
          {/* Theme Selectors */}
          <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md p-1.5 rounded-full border border-white/5">
            <button 
              onClick={() => setTheme("dark")} 
              className={`w-3.5 h-3.5 rounded-full bg-[#050816] border cursor-pointer transition-all ${theme === 'dark' ? 'border-purple-400 scale-110' : 'border-white/10'}`}
              title="Dark"
            />
            <button 
              onClick={() => setTheme("light")} 
              className={`w-3.5 h-3.5 rounded-full bg-[#f8fafc] border cursor-pointer transition-all ${theme === 'light' ? 'border-blue-400 scale-110' : 'border-black/20'}`}
              title="Light"
            />
            <button 
              onClick={() => setTheme("glass")} 
              className={`w-3.5 h-3.5 rounded-full bg-white/30 border cursor-pointer transition-all ${theme === 'glass' ? 'border-cyan-400 scale-110' : 'border-white/10'}`}
              title="Glass"
            />
            <button 
              onClick={() => setTheme("neon")} 
              className={`w-3.5 h-3.5 rounded-full bg-[#03120d] border cursor-pointer transition-all ${theme === 'neon' ? 'border-emerald-400 scale-110' : 'border-emerald-500/20'}`}
              title="Neon"
            />
          </div>
        </div>

        {/* Orb Section */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center gap-6">
          {/* Glowing Orb */}
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Outer Glow */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${current.orb} opacity-40 blur-xl animate-pulse`} />
            {/* Inner Orb */}
            <div className={`w-28 h-28 rounded-full bg-gradient-to-tr ${current.orb} shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)] flex items-center justify-center animate-spin-slow`} />
          </div>

          {/* Status & Assistant Text */}
          <div className="text-center">
            <h3 className={`text-lg font-bold tracking-tight ${current.text}`}>
              Aura Vox Assistant
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${current.sub} font-medium px-4`}>
              Ask any query about the website
            </p>
            <p className={`text-xs mt-1 font-medium ${current.listening} animate-pulse`}>
              • Listening...
            </p>
          </div>
        </div>

        {/* Card Footer (Mic & Voice Waves) */}
        <div className="relative z-20 flex flex-col items-center gap-4 w-full">
          {/* Voice Wave Visualizer Mock */}
          <div className="flex items-end justify-center gap-1.5 h-8">
            <div className={`w-1.5 h-3 rounded-full ${current.wave} animate-wave1`} />
            <div className={`w-1.5 h-6 rounded-full ${current.wave} animate-wave2`} />
            <div className={`w-1.5 h-4 rounded-full ${current.wave} animate-wave3`} />
            <div className={`w-1.5 h-7 rounded-full ${current.wave} animate-wave4`} />
            <div className={`w-1.5 h-2 rounded-full ${current.wave} animate-wave5`} />
          </div>

          {/* Microphone Activation Button */}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${current.button} ${current.micGlow} flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default AssistantPreview;