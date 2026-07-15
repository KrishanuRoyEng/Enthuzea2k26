"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

// Fest date — July 21, 2026, 00:00:00 IST
const FEST_DATE = new Date("2026-07-21T00:00:00+05:30").getTime();

const FEST_NAME = "Enthuzea 2k26";
const FEST_SUBTITLE = "SVIST Annual Cultural Fest";
const FEST_DATES = "21st & 22nd July 2026";
const FEST_TAGLINE = "Where tradition meets the extraordinary";

import dynamic from "next/dynamic";

const HeroBackground = dynamic(() => import("./HeroBackground"), { ssr: false });

/* ═══════════════════════════════════════════════════════════════
   COUNTDOWN TIMER
   ═══════════════════════════════════════════════════════════════ */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, FEST_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** A single countdown digit with flip animation */
function CountdownUnit({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  const display = String(value).padStart(2, "0");


  return (
    <motion.div
      className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.8 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative glass bg-black/20 rounded-lg sm:rounded-xl md:rounded-2xl w-[3.5rem] sm:w-[5.5rem] md:w-[7.5rem] h-[3.5rem] sm:h-[5.5rem] md:h-[7.5rem] flex items-center justify-center overflow-hidden border border-white/5 animate-pulse-color">
        
        {/* Sleek vertical slide animation for changing digits */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)", scale: 0.9 }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)", scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="countdown-digit text-countdown font-display text-gradient-gold block tabular-nums tracking-widest absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Corner gold accents (subtle) */}
        <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t border-l border-marigold/30 rounded-tl-lg sm:rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-t border-r border-marigold/30 rounded-tr-lg sm:rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-b border-l border-marigold/30 rounded-bl-lg sm:rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b border-r border-marigold/30 rounded-br-lg sm:rounded-br-xl" />
      </div>
      <span className="text-[9px] sm:text-xs md:text-sm font-body uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold-shimmer/60">
        {label}
      </span>
    </motion.div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial value on client only to avoid hydration mismatch
    setTimeLeft(calcTimeLeft());
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { value: number; label: string }[] = timeLeft
    ? [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ]
    : [
        { value: 0, label: "Days" },
        { value: 0, label: "Hours" },
        { value: 0, label: "Min" },
        { value: 0, label: "Sec" },
      ];

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-1.5 sm:gap-3 md:gap-5">
          <CountdownUnit value={unit.value} label={unit.label} index={i} />
          {i < units.length - 1 && (
            <span
              className="text-marigold/40 text-lg sm:text-3xl md:text-5xl font-display self-start mt-2 sm:mt-3 md:mt-5 animate-pulse"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL INDICATOR
   ═══════════════════════════════════════════════════════════════ */

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-shimmer/40 font-body">
        Scroll to explore
      </span>
      <div
        className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-marigold/20 flex items-start justify-center p-1.5 animate-pulse"
      >
        <div
          className="w-1 h-1.5 sm:w-1.5 sm:h-2 rounded-full bg-marigold animate-[scroll-wheel_1.5s_ease-in-out_infinite]"
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [logoTossing, setLogoTossing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Use plain transform (no spring) to avoid per-frame JS cost on mobile
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleLogoToss = () => {
    if (logoTossing) return;
    setLogoTossing(true);
    setTimeout(() => setLogoTossing(false), 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Dynamically loaded heavy background (Lasers, SVGs, Particles) */}
      <HeroBackground />


      {/* ─── Central Content ─── */}
      <motion.div
        className="relative z-20 text-center px-5 sm:px-6 w-full max-w-5xl mx-auto -translate-y-12 sm:-translate-y-4"
        style={{ y: titleY, opacity: titleOpacity }}
      >

        {/* Main title (Stylized SVG) */}
        <motion.div
          className="w-[90vw] sm:w-[80vw] max-w-3xl mx-auto -mb-8 sm:-mb-24 md:-mb-32 lg:-mb-40 pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <img 
            src="/enthuzealogo.svg" 
            alt="Enthuzea 2K26" 
            className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.4)]" 
            fetchPriority="high"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-fluid-subtitle font-display italic text-gold-shimmer/70 mb-1.5 sm:mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {FEST_SUBTITLE}
        </motion.p>

        {/* Official Fest Dates — prominent */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-4 sm:w-8 bg-gradient-to-r from-transparent to-terracotta/40" />
          <span className="text-xs sm:text-sm md:text-base font-body font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-marigold/80 uppercase">
            {FEST_DATES}
          </span>
          <div className="h-px w-4 sm:w-8 bg-gradient-to-l from-transparent to-terracotta/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-[11px] sm:text-sm md:text-base text-cream/40 font-body tracking-wide mb-6 sm:mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {FEST_TAGLINE}
        </motion.p>

        {/* ─── Countdown Timer ─── */}
        <CountdownTimer />

        {/* CTA Button */}
        <motion.div
          className="mt-6 sm:mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => window.dispatchEvent(new Event("open-video"))}
            className="
              group relative inline-flex items-center gap-2 
              px-5 py-2.5 sm:px-8 sm:py-4 
              font-body font-semibold text-sm sm:text-base
              text-midnight-deep 
              bg-gradient-to-r from-marigold via-gold-shimmer to-marigold
              rounded-full
              overflow-hidden
              transition-all duration-500
              hover:shadow-xl hover:shadow-marigold/40
              hover:scale-105
              active:scale-95
            "
          >
            <span className="relative z-10">Begin the Journey</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-deep to-transparent pointer-events-none z-30" />
    </section>
  );
}
