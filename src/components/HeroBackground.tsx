"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CONCERT THEME SVGs (Neon/Cyberpunk/Electronic)
   ═══════════════════════════════════════════════════════════════ */

const SynthesizerSVG = () => (
  <svg viewBox="0 0 160 100" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="synth-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C4532A" />
        <stop offset="100%" stopColor="#9A3D1E" />
      </linearGradient>
    </defs>
    <rect x="10" y="20" width="140" height="60" rx="4" fill="url(#synth-grad)" opacity="0.8" />
    <rect x="15" y="45" width="130" height="30" rx="2" fill="#0B0E2C" opacity="0.9" />
    
    {/* Keys */}
    {[...Array(11)].map((_, i) => (
      <rect key={i} x={18 + i * 11.5} y="45" width="8" height="28" rx="1" fill="#FFF8E7" opacity="0.8" />
    ))}
    {[...Array(10)].map((_, i) => {
      if (i === 2 || i === 6 || i === 9) return null; // Skip some black keys
      return <rect key={`b-${i}`} x={23 + i * 11.5} y="45" width="5" height="16" rx="0.5" fill="#060819" />
    })}
    
    {/* Dials & Mod wheels */}
    <rect x="15" y="25" width="10" height="15" rx="2" fill="#D4A841" opacity="0.8" />
    <rect x="30" y="25" width="10" height="15" rx="2" fill="#D4A841" opacity="0.8" />
    <circle cx="55" cy="32" r="5" fill="#F5A623" opacity="0.7" />
    <circle cx="70" cy="32" r="5" fill="#F5A623" opacity="0.7" />
    <circle cx="85" cy="32" r="5" fill="#F5A623" opacity="0.7" />
    <line x1="100" y1="32" x2="140" y2="32" stroke="#FFD15C" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <circle cx="120" cy="32" r="4" fill="#FFF8E7" />
  </svg>
);

const TurntableSVG = () => (
  <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="turn-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#141838" />
        <stop offset="100%" stopColor="#0B0E2C" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="120" height="120" rx="8" fill="url(#turn-grad)" stroke="#D4A841" strokeWidth="1" opacity="0.9" />
    
    {/* Platter */}
    <circle cx="60" cy="70" r="45" fill="#060819" stroke="#C4532A" strokeWidth="2" opacity="0.9" />
    <circle cx="60" cy="70" r="35" fill="none" stroke="#F5A623" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
    <circle cx="60" cy="70" r="15" fill="#C4532A" opacity="0.8" />
    <circle cx="60" cy="70" r="3" fill="#FFF8E7" />
    
    {/* Tonearm */}
    <circle cx="115" cy="30" r="8" fill="#9A3D1E" />
    <path d="M115 30 Q120 70 95 90 L85 80" stroke="#FFD15C" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
    <rect x="80" y="75" width="8" height="12" fill="#D4A841" transform="rotate(-45 80 75)" />
    
    {/* Controls */}
    <circle cx="20" cy="115" r="5" fill="#F5A623" opacity="0.7" />
    <circle cx="35" cy="115" r="5" fill="#F5A623" opacity="0.7" />
    <rect x="110" y="90" width="10" height="30" rx="2" fill="#141838" stroke="#D4A841" strokeWidth="1" />
    <rect x="112" y="105" width="6" height="5" fill="#F5A623" />
  </svg>
);

const InstrumentSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-80">
    <defs>
      <linearGradient id="inst-grad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#C4532A" />
        <stop offset="50%" stopColor="#F5A623" />
        <stop offset="100%" stopColor="#FFD15C" />
      </linearGradient>
    </defs>
    
    {/* Drum body background */}
    <path d="M15 45 L15 75 A35 15 0 0 0 85 75 L85 45 Z" fill="rgba(245,166,35,0.05)" />
    
    {/* Top rim */}
    <ellipse cx="50" cy="45" rx="35" ry="15" stroke="url(#inst-grad)" strokeWidth="4" fill="rgba(20,24,56,0.6)" />
    
    {/* Bottom rim */}
    <path d="M15 45 L15 75 A35 15 0 0 0 85 75 L85 45" stroke="url(#inst-grad)" strokeWidth="4" />
    
    {/* Tension rods */}
    <path d="M25 55 L25 70" stroke="url(#inst-grad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 59 L40 74" stroke="url(#inst-grad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 59 L60 74" stroke="url(#inst-grad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M75 55 L75 70" stroke="url(#inst-grad)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Left drumstick */}
    <path d="M22 15 L43 38" stroke="#FFD15C" strokeWidth="3" strokeLinecap="round" />
    <circle cx="44" cy="39" r="3" fill="#FFD15C" />
    
    {/* Right drumstick */}
    <path d="M78 15 L57 38" stroke="#FFD15C" strokeWidth="3" strokeLinecap="round" />
    <circle cx="56" cy="39" r="3" fill="#FFD15C" />
    
    {/* Floating musical note */}
    <path d="M75 25 V15 L85 13 V20" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="73" cy="25" r="2" fill="#F5A623" />
    <circle cx="83" cy="20" r="2" fill="#F5A623" />
  </svg>
);

const NeonGeometricSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    <polygon points="60,10 110,35 110,85 60,110 10,85 10,35" stroke="#F5A623" strokeWidth="2" fill="none" opacity="0.6" />
    <polygon points="60,20 100,40 100,80 60,100 20,80 20,40" stroke="#C4532A" strokeWidth="1" fill="none" opacity="0.4" />
    <circle cx="60" cy="60" r="15" fill="none" stroke="#D4A841" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
    <circle cx="60" cy="60" r="4" fill="#FFD15C" opacity="0.8" />
    <line x1="10" y1="35" x2="60" y2="60" stroke="#D4A841" strokeWidth="0.5" opacity="0.3" />
    <line x1="110" y1="35" x2="60" y2="60" stroke="#D4A841" strokeWidth="0.5" opacity="0.3" />
    <line x1="60" y1="110" x2="60" y2="60" stroke="#D4A841" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const MusicNoteSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-60">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" fill="#F5A623" />
    <circle cx="18" cy="16" r="3" fill="#F5A623" />
  </svg>
);

const SparkleIconSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#D4A841" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-60">
    <path d="M12 3v18M21 12H3M18.364 5.636l-12.728 12.728M18.364 18.364L5.636 5.636" opacity="0.5" />
    <circle cx="12" cy="12" r="3" fill="#FFD15C" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   LASER GRID / SOUNDWAVE BACKGROUND
   ═══════════════════════════════════════════════════════════════ */

function LaserGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Horizontal glowing lines moving down */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(245,166,35,0.15)_100%)] bg-[length:100%_40px] animate-[slide-down_5s_linear_infinite]" />
      
      {/* Perspective grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5A623" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C4532A" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[...Array(21)].map((_, i) => (
          <line 
            key={`v-${i}`}
            x1={500} y1={200} 
            x2={i * 100 - 500} y2={1000} 
            stroke="url(#grid-fade)" 
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPARKLE / PARTICLE FIELD
   ═══════════════════════════════════════════════════════════════ */

function SparkleField() {
  // HeroBackground is ssr: false, so Math.random is safe here without useEffect
  const particles = React.useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })),
  []);

  // Respect the user's motion preference — skip painting particles entirely
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-marigold-light animate-sparkle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING ELEMENT WRAPPER
   ═══════════════════════════════════════════════════════════════ */

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  scrollProgress: MotionValue<number>;
  parallaxRange: [number, number];
  floatDelay?: number;
  rotateRange?: [number, number];
}

function FloatingElement({
  children,
  className = "",
  scrollProgress,
  parallaxRange,
  floatDelay = 0,
  rotateRange = [-3, 3],
}: FloatingElementProps) {
  const y = useTransform(scrollProgress, [0, 1], parallaxRange);
  const rotate = useTransform(scrollProgress, [0, 1], rotateRange);

  return (
    <motion.div
      className={`absolute gpu will-change-transform pointer-events-none ${className}`}
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.5 + floatDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="animate-float" style={{ animationDelay: `${floatDelay}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN BACKGROUND COMPONENT EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function HeroBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <LaserGridBackground />
      <SparkleField />
      
      {/* Turntable — top-left */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -60]}
        floatDelay={0}
        rotateRange={[-5, 5]}
        className="z-0 md:z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 top-[5%] left-[2%] sm:top-[10%] sm:left-[5%] md:left-[8%] opacity-30 sm:opacity-50 md:opacity-70"
      >
        <TurntableSVG />
      </FloatingElement>

      {/* Synthesizer — bottom-right */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -50]}
        floatDelay={0.4}
        rotateRange={[-3, 8]}
        className="z-0 md:z-10 w-16 h-10 sm:w-24 sm:h-16 md:w-40 md:h-24 bottom-[8%] right-[2%] sm:bottom-[15%] sm:right-[5%] md:right-[8%] opacity-25 sm:opacity-45 md:opacity-60"
      >
        <SynthesizerSVG />
      </FloatingElement>

      {/* Instrument — bottom-left */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -30]}
        floatDelay={1.2}
        rotateRange={[-2, 2]}
        className="z-0 md:z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28 bottom-[5%] left-[0%] sm:top-[55%] sm:left-[3%] md:left-[5%] opacity-15 sm:opacity-30 md:opacity-40"
      >
        <InstrumentSVG />
      </FloatingElement>

      {/* Neon Geometric — top-right */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -40]}
        floatDelay={0.8}
        rotateRange={[-8, 4]}
        className="z-0 md:z-10 w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 top-[3%] right-[3%] sm:top-[6%] sm:right-[6%] md:right-[10%] opacity-25 sm:opacity-45 md:opacity-60"
      >
        <NeonGeometricSVG />
      </FloatingElement>

      {/* Second Neon Geometric — desktop only mid-left */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -25]}
        floatDelay={1.6}
        rotateRange={[-10, 5]}
        className="z-0 md:z-10 hidden sm:block w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bottom-[25%] left-[3%] sm:left-[8%] md:left-[12%] opacity-25 sm:opacity-40 md:opacity-50"
      >
        <NeonGeometricSVG />
      </FloatingElement>

      {/* ─── Mobile Extra SVGs ─── */}
      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -20]}
        floatDelay={0.5}
        rotateRange={[-15, 15]}
        className="block sm:hidden w-8 h-8 top-[15%] right-[10%] opacity-40 z-0"
      >
        <MusicNoteSVG />
      </FloatingElement>

      <FloatingElement
        scrollProgress={scrollYProgress}
        parallaxRange={[0, -35]}
        floatDelay={1.1}
        rotateRange={[0, 45]}
        className="block sm:hidden w-6 h-6 bottom-[30%] left-[8%] opacity-40 z-0"
      >
        <SparkleIconSVG />
      </FloatingElement>
    </>
  );
}
