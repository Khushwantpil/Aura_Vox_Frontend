import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AssistantPreview from '../components/assistantpreview';
import logo from '../assets/auravox-removebg-preview.png';
const STEPS = [
  {
    id: 1,
    title: 'Sign Up',
    desc: 'Create your free account in seconds.',
  },
  {
    id: 2,
    title: 'Customize',
    desc: 'Set your business name, tone, voice and theme that suits your website.',
  },
  {
    id: 3,
    title: 'Train Model',
    desc: 'Connect your knowledge base (PDF, URLs, text).',
  },
  {
    id: 4,
    title: 'Embed',
    desc: 'Add a simple code snippet to your site.',
  },
];

function Home({ user }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The timeline fills as the user scrolls through the container area
      const startThreshold = windowHeight * 0.8;
      const endThreshold = windowHeight * 0.25;
      const height = rect.height;
      const top = rect.top;

      // Calculate absolute scroll limits to handle end of page correctly
      const containerAbsoluteTop = top + window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - windowHeight;
      const minTop = containerAbsoluteTop - maxScrollY;

      // Cap the target top position if the page is too short to scroll further
      const targetEndTop = endThreshold - height;
      const endTop = Math.max(targetEndTop, minTop);

      const totalScrollable = startThreshold - endTop;
      const currentScroll = startThreshold - top;

      let progress = totalScrollable > 0 ? currentScroll / totalScrollable : 0;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-white to-cyan-100" />
        <div className="absolute top-0 left-1/4 w-[320px] h-[320px] bg-purple-300/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-cyan-300/40 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm text-purple-600 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" />
              AI Voice Assistant For Modern Websites
            </span>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <h1 className="max-w-5xl mx-auto text-[42px] leading-[52px] sm:text-6xl sm:leading-[72px] lg:text-7xl lg:leading-[88px] font-black tracking-[-0.04em] text-[#081028]">
              Add a{" "}
              <span className="inline-block px-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  Virtual Assistant
                </span>
              </span>
              <br className="hidden sm:block" />
              to your website
            </h1>
            <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl text-[#64748b] leading-relaxed px-2">
              Create a smart Voice-enabled assistant that talks, answers and helps users navigate instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button 
                onClick={() => navigate('/builder')} 
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(168,85,247,0.25)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                Build Your Assistant
              </button>
            </div>
            <p className="mt-5 text-xs sm:text-sm text-gray-400">
              Free Plan includes up to 300 AI responses per month
            </p>
          </div>
          <AssistantPreview />
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-24 bg-white border-t border-slate-100/80 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-4 lg:mb-0">
              <span className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100/80 text-purple-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Setup Guide
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#081028] tracking-tight leading-tight">
                Get Started <br className="hidden lg:block"/>in minutes
              </h2>
              <p className="text-[#64748b] mt-4 text-base sm:text-lg leading-relaxed">
                Simple setup. No complicated integration. Adding a virtual voice assistant to your site is extremely straightforward.
              </p>
            </div>

            {/* Right Column: Scroll-Linked Timeline */}
            <div ref={containerRef} className="lg:col-span-7 relative pl-8 md:pl-10">
              {/* Vertical line track */}
              <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-slate-100 rounded-full" />
              
              {/* Active line progress */}
              <div 
                className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-cyan-500 rounded-full transition-transform duration-150 ease-out origin-top" 
                style={{ 
                  transform: `scaleY(${scrollProgress})`,
                }}
              />

              <div className="space-y-6">
                {STEPS.map((step, idx) => {
                  const triggerThreshold = (idx + 0.3) / STEPS.length;
                  const isActive = scrollProgress >= triggerThreshold;

                  return (
                    <div key={step.id} className="relative group">
                      {/* Node dot on the timeline track */}
                      <div 
                        className={`absolute left-[-31px] md:left-[-33px] top-6 w-4 h-4 rounded-full border-3 border-white shadow-sm z-10 transition-all duration-500 ${
                          isActive 
                            ? 'bg-purple-600 scale-110 shadow-purple-500/20' 
                            : 'bg-slate-200'
                        }`}
                      />

                      {/* Timeline Step Card */}
                      <div 
                        className={`bg-white border p-6 rounded-[24px] transition-all duration-700 ease-out transform ${
                          isActive 
                            ? 'border-purple-200 shadow-[0_15px_40px_rgba(139,92,246,0.03)] translate-y-0 opacity-100' 
                            : 'border-slate-100/80 shadow-[0_5px_15px_rgba(0,0,0,0.005)] translate-y-3 opacity-40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase ${
                            isActive ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-400'
                          }`}>
                            0{step.id}
                          </span>
                          <h3 className="font-extrabold text-lg text-[#081028]">{step.title}</h3>
                        </div>
                        <p className="text-[#64748b] text-sm mt-2 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    <footer className="bg-[#081028] px-6 py-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div>
          <div onClick={() => navigate('/')} className="flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <h1 className="font-bold text-xl text-gray-100 leading-none">
              Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">Vox</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Voice AI assistant for Websites
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          &copy;{new Date().getFullYear()} AuraVox. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}

export default Home;