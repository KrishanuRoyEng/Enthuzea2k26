"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_CONFIG } from "@/config/media";

// The image URLs are now pulled directly from MEDIA_CONFIG

// Base bracket (Static)
const StageLightBase = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className}>
    {/* Base Bracket */}
    <rect x="30" y="5" width="60" height="15" rx="4" fill="#1A1F3B" stroke="#31395E" strokeWidth="2" />
    <rect x="40" y="0" width="40" height="10" rx="2" fill="#0B0E2C" />
    {/* Swivel Arms */}
    <path d="M35,20 L25,60 L35,65 Z" fill="#1A1F3B" stroke="#31395E" strokeWidth="1" />
    <path d="M85,20 L95,60 L85,65 Z" fill="#1A1F3B" stroke="#31395E" strokeWidth="1" />
  </svg>
);

// Head and Lens (Animates/Swings)
const StageLightHead = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className}>
    <defs>
      <linearGradient id="can-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#11152B" />
        <stop offset="50%" stopColor="#2A3258" />
        <stop offset="100%" stopColor="#11152B" />
      </linearGradient>
    </defs>
    
    {/* Main Head / Can */}
    <rect x="35" y="30" width="50" height="60" rx="10" fill="url(#can-grad)" stroke="#0B0E2C" strokeWidth="2" />
    
    {/* Ventilation lines */}
    <line x1="45" y1="45" x2="75" y2="45" stroke="#0B0E2C" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="55" x2="75" y2="55" stroke="#0B0E2C" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="65" x2="75" y2="65" stroke="#0B0E2C" strokeWidth="2" strokeLinecap="round" />

    {/* Glowing Lens */}
    <ellipse cx="60" cy="90" rx="18" ry="6" fill="#FFF8E7" opacity="0.9" />
    <ellipse cx="60" cy="90" rx="18" ry="6" fill="none" stroke="#F5A623" strokeWidth="2" />
    <ellipse cx="60" cy="90" rx="12" ry="3" fill="#FFFFFF" />
  </svg>
);

export default function ShowcaseVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Tabs: 1 = DAY 1, 0 = INVITATION, 2 = DAY 2
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  // Intersection Observer for scroll-in fade animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { 
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="showcase"
      ref={containerRef}
      className="relative w-full min-h-screen pt-12 pb-24 sm:py-24 flex flex-col items-center justify-center overflow-hidden bg-midnight-deep alpona-overlay grain"
      style={{ contain: "layout" }}
    >
      {/* ─── SMOOTH SECTION TRANSITION ─── */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-midnight-deep pointer-events-none z-0" />

      {/* ─── STAGE LIGHTS & BEAMS ─── */}
      
      {/* Left Light System */}
      <div className="absolute top-2 sm:top-10 left-2 sm:left-20 z-50 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none">
        <StageLightBase className="absolute inset-0 w-full h-full z-10" />
        <div className="absolute inset-0 w-full h-full origin-center will-change-transform transform-gpu animate-stage-swing-left">
          <StageLightHead className="absolute inset-0 w-full h-full z-20" />
          <div 
            className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[200px] h-[150vh] origin-top pointer-events-none will-change-transform transform-gpu opacity-0 animate-stage-color-fade"
            style={{
              background: "linear-gradient(to bottom, rgba(245,166,35,0.45) 0%, rgba(245,166,35,0.05) 50%, transparent 100%)",
              clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)"
            }}
          />
          <div 
            className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[120px] h-[150vh] origin-top pointer-events-none will-change-transform transform-gpu opacity-0 animate-stage-white-flash"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)",
              clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0 100%)"
            }}
          />
        </div>
      </div>

      {/* Right Light System */}
      <div className="absolute top-2 sm:top-10 right-2 sm:right-20 z-50 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none">
        <StageLightBase className="absolute inset-0 w-full h-full z-10 scale-x-[-1]" />
        <div className="absolute inset-0 w-full h-full origin-center will-change-transform transform-gpu animate-stage-swing-right">
          <StageLightHead className="absolute inset-0 w-full h-full z-20 scale-x-[-1]" />
          <div 
            className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[200px] h-[150vh] origin-top pointer-events-none will-change-transform transform-gpu opacity-0 animate-stage-color-fade"
            style={{
              background: "linear-gradient(to bottom, rgba(232,80,122,0.45) 0%, rgba(232,80,122,0.05) 50%, transparent 100%)",
              clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)"
            }}
          />
          <div 
            className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[120px] h-[150vh] origin-top pointer-events-none will-change-transform transform-gpu opacity-0 animate-stage-white-flash"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)",
              clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0 100%)"
            }}
          />
        </div>
      </div>

      {/* Giant ambient glow behind the stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div 
        className={`relative z-30 w-[calc(100%-1.5rem)] sm:w-[calc(100%-4rem)] max-w-5xl flex flex-col items-center transition-all duration-700 ease-out will-change-[opacity,transform] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ─── THE 3-WAY STAGE TOGGLE ─── */}
        <motion.div 
          className="relative flex items-center justify-between w-full max-w-[340px] sm:max-w-[420px] bg-black/40 p-1.5 sm:p-2 rounded-full border border-white/10 mb-8 sm:mb-12 glass shadow-[0_0_30px_rgba(0,0,0,0.5)] z-40"
        >
          {/* Background Pill */}
          <div className="absolute top-1.5 bottom-1.5 left-1.5 right-1.5 flex pointer-events-none">
            <motion.div
              className="w-1/3 h-full bg-gradient-to-r from-marigold to-gold-shimmer rounded-full shadow-[0_0_15px_rgba(245,166,35,0.4)]"
              animate={{ 
                x: activeTab === 1 ? "0%" : activeTab === 0 ? "100%" : "200%" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>

          <button 
            onClick={() => setActiveTab(1)}
            className={`relative z-20 w-1/3 py-2.5 sm:py-3 text-[11px] sm:text-sm font-display font-semibold transition-colors duration-300 outline-none ${
              activeTab === 1 ? "text-midnight-deep drop-shadow-md" : "text-cream/70 hover:text-gold-shimmer"
            }`}
          >
            DAY 1
          </button>
          <button 
            onClick={() => setActiveTab(0)}
            className={`relative z-20 w-1/3 py-2.5 sm:py-3 text-[11px] sm:text-sm font-display font-semibold transition-colors duration-300 outline-none ${
              activeTab === 0 ? "text-midnight-deep drop-shadow-md" : "text-cream/70 hover:text-gold-shimmer"
            }`}
          >
            STAGE
          </button>
          <button 
            onClick={() => setActiveTab(2)}
            className={`relative z-20 w-1/3 py-2.5 sm:py-3 text-[11px] sm:text-sm font-display font-semibold transition-colors duration-300 outline-none ${
              activeTab === 2 ? "text-midnight-deep drop-shadow-md" : "text-cream/70 hover:text-gold-shimmer"
            }`}
          >
            DAY 2
          </button>
        </motion.div>

        
        {/* ─── MAIN STAGE SCREEN ─── */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(245,166,35,0.25)] ring-4 ring-white/10 z-20 bg-black group">
          
          {/* Cyberpunk/Tech Frame Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-marigold z-30 opacity-70 pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-marigold z-30 opacity-70 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-marigold z-30 opacity-70 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-marigold z-30 opacity-70 pointer-events-none" />

          {/* Cinematic Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          
          {/* PERMANENT INVITATION CARD (Always mounted, replaces the old video) */}
          <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-700 z-10 overflow-hidden ${activeTab === 0 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[5px] scale-105 pointer-events-none"}`}>
            {MEDIA_CONFIG.INVITATION_IMAGE_URL ? (
              <div className="absolute inset-0 w-full h-full p-4 sm:p-8 flex items-center justify-center pointer-events-none">
                {/* Pulsating Glow Behind the Image */}
                <motion.div
                  className="absolute w-3/4 h-3/4 bg-marigold/20 rounded-full blur-[80px]"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* The Floating Image */}
                <motion.img 
                  src={MEDIA_CONFIG.INVITATION_IMAGE_URL} 
                  alt="Enthuzea Invitation"
                  className="relative w-full h-full object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.3)] z-10"
                  animate={{
                    y: ["-1.5%", "1.5%", "-1.5%"],
                    scale: [0.98, 1, 0.98],
                    rotateZ: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/90 to-[#1A1F3B] flex flex-col items-center justify-center p-6 sm:p-10">
                <p className="text-[10px] sm:text-xs text-marigold font-body uppercase tracking-[0.4em] mb-4 bg-marigold/10 px-4 py-1.5 rounded-full border border-marigold/20 shadow-inner">
                  You Are Invited
                </p>
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gold-shimmer to-terracotta drop-shadow-lg tracking-widest uppercase text-center w-full leading-tight">
                  Grand Invitation
                </h3>
                <p className="text-sm sm:text-base text-cream/70 mt-6 max-w-md text-center font-body">
                  Join us for the most spectacular cultural fest of the year. Add the image URL to config to replace this text.
                </p>
              </div>
            )}
          </div>
          
          <AnimatePresence mode="wait">
            
            {/* ─── TAB 1: DAY 1 ─── */}
            {activeTab === 1 && (
              <motion.div
                key="day1"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/90 to-[#1A1F3B] flex flex-col items-center justify-center p-6 sm:p-10"
              >
                {MEDIA_CONFIG.DAY_1_IMAGE_URL ? (
                  <img 
                    src={MEDIA_CONFIG.DAY_1_IMAGE_URL} 
                    alt="Day 1 Live Band" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <>
                    <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
                      <p className="text-[10px] sm:text-xs text-marigold font-body uppercase tracking-[0.4em] mb-2 sm:mb-4 bg-marigold/10 px-4 py-1.5 rounded-full border border-marigold/20 shadow-inner">
                        Live Band
                      </p>
                      {/* Scaled down font sizes and tracking to ensure the text never exceeds the parent container's overflow-hidden boundary */}
                      <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gold-shimmer to-terracotta drop-shadow-[0_0_15px_rgba(245,166,35,0.5)] tracking-wide sm:tracking-wider uppercase text-center w-full leading-normal py-2 px-2">
                        Meghomollar
                      </h3>
                    </div>
                    
                    {/* Events List */}
                    <div className="w-full max-w-lg mt-auto bg-black/60 border border-marigold/20 rounded-xl p-4 sm:p-5 backdrop-blur-md z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <h4 className="text-marigold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 border-b border-marigold/20 pb-2">Day 1 Events</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-marigold to-terracotta shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
                          <span className="text-sm sm:text-base text-cream font-medium tracking-wide">Mr. & Ms. Fresher's</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* ─── TAB 2: DAY 2 ─── */}
            {activeTab === 2 && (
              <motion.div
                key="day2"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/90 to-[#1A1F3B] flex flex-col items-center justify-center p-6 sm:p-10"
              >
                {MEDIA_CONFIG.DAY_2_IMAGE_URL ? (
                  <img 
                    src={MEDIA_CONFIG.DAY_2_IMAGE_URL} 
                    alt="Day 2 Singer" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <>
                    <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
                      <p className="text-[10px] sm:text-xs text-marigold font-body uppercase tracking-[0.4em] mb-2 sm:mb-4 bg-marigold/10 px-4 py-1.5 rounded-full border border-marigold/20 shadow-inner">
                        Singer
                      </p>
                      {/* Scaled down font sizes and tracking to ensure the text never exceeds the parent container's overflow-hidden boundary */}
                      <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gold-shimmer to-terracotta drop-shadow-[0_0_15px_rgba(245,166,35,0.5)] tracking-wide sm:tracking-wider uppercase text-center w-full leading-normal py-2 px-2">
                        Ami Mishra
                      </h3>
                    </div>
                    
                    {/* Events List */}
                    <div className="w-full max-w-lg mt-auto bg-black/60 border border-marigold/20 rounded-xl p-4 sm:p-5 backdrop-blur-md z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <h4 className="text-marigold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 border-b border-marigold/20 pb-2">Day 2 Events</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-marigold to-terracotta shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
                          <span className="text-sm sm:text-base text-cream font-medium tracking-wide">Cultural Fest</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {/* Internal screen glow and vignette */}
          <div className="absolute inset-0 pointer-events-none ring-inset ring-1 ring-white/20 rounded-xl sm:rounded-2xl z-30 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-marigold/10 to-transparent mix-blend-overlay z-30" />
        </div>

        {/* ─── THE 3D STAGE BENEATH THE VIDEO ─── */}
        <div className="relative w-[110%] max-w-6xl h-16 sm:h-24 mt-[-20px] sm:mt-[-40px] z-10 pointer-events-none">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[90%] h-32 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.3)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-full rounded-[100%] bg-[linear-gradient(180deg,rgba(20,24,56,0.9)_0%,rgba(11,14,44,1)_100%)] border-t-[3px] border-marigold/40 shadow-[0_-5px_30px_rgba(245,166,35,0.3)]" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-[100%] bg-black/50 blur-[2px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[2px] bg-gradient-to-r from-transparent via-gold-shimmer/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
