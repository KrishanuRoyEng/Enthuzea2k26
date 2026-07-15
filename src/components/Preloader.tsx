"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_CONFIG } from "@/config/media";

/* ═══════════════════════════════════════════════════════════════
   SHARD DEFINITIONS — hoisted, never recreated on re-renders
   ═══════════════════════════════════════════════════════════════ */
const SHARDS = [
  // Top-left
  { clip: "polygon(0% 0%, 35% 0%, 20% 50%, 0% 60%)",              y: -700, x: -400, rotate: -55, delay: 0,    duration: 0.75 },
  // Top-center
  { clip: "polygon(35% 0%, 75% 0%, 60% 45%, 20% 50%)",            y: -800, x:   80, rotate:  15, delay: 0.05, duration: 0.8  },
  // Top-right
  { clip: "polygon(75% 0%, 100% 0%, 100% 55%, 85% 65%, 60% 45%)", y: -600, x:  500, rotate:  65, delay: 0.1,  duration: 0.85 },
  // Bottom-left
  { clip: "polygon(0% 60%, 20% 50%, 30% 100%, 0% 100%)",          y:  700, x: -300, rotate: -25, delay: 0.05, duration: 0.8  },
  // Bottom-center
  { clip: "polygon(20% 50%, 60% 45%, 70% 100%, 30% 100%)",        y:  900, x:   30, rotate:   8, delay: 0,    duration: 0.75 },
  // Bottom-right
  { clip: "polygon(60% 45%, 85% 65%, 100% 55%, 100% 100%, 70% 100%)", y: 800, x: 350, rotate: 35, delay: 0.1, duration: 0.85 },
] as const;

/* ═══════════════════════════════════════════════════════════════
   CRACK LINE DATA — hoisted, never recreated
   Each entry: SVG path (100×100 viewBox), strokeWidth, CSS delay, CSS duration.
   Cracks radiate from center (50, 50). Secondary branches appear later.
   ═══════════════════════════════════════════════════════════════ */
const CRACK_LINES = [
  // ── 8 main cracks radiating outward ─────────────────────────
  { d: "M 50,50 L 44,41 L 36,29 L 27,16 L 18,4",                w: 0.7,  delay: 0,   dur: 370 },
  { d: "M 50,50 L 51,38 L 47,25 L 50,8",                         w: 0.5,  delay: 30,  dur: 310 },
  { d: "M 50,50 L 57,43 L 66,32 L 74,19 L 82,5",                 w: 0.7,  delay: 20,  dur: 400 },
  { d: "M 50,50 L 63,50 L 77,48 L 93,52",                        w: 0.6,  delay: 50,  dur: 345 },
  { d: "M 50,50 L 59,59 L 67,68 L 76,80 L 84,94",                w: 0.7,  delay: 10,  dur: 415 },
  { d: "M 50,50 L 49,63 L 53,76 L 50,92",                        w: 0.5,  delay: 40,  dur: 335 },
  { d: "M 50,50 L 41,58 L 33,68 L 23,79 L 14,93",                w: 0.7,  delay: 60,  dur: 390 },
  { d: "M 50,50 L 37,51 L 23,47 L 8,50",                         w: 0.6,  delay: 25,  dur: 360 },
  // ── Secondary branch cracks — slightly delayed ───────────────
  { d: "M 36,29 L 29,27 L 22,22",                                w: 0.3,  delay: 200, dur: 210 },
  { d: "M 66,32 L 70,24 L 76,15",                                w: 0.3,  delay: 220, dur: 200 },
  { d: "M 67,68 L 73,68 L 82,74",                                w: 0.3,  delay: 240, dur: 205 },
  { d: "M 33,68 L 27,73 L 20,80",                                w: 0.3,  delay: 215, dur: 210 },
  { d: "M 44,41 L 38,36 L 32,32",                                w: 0.25, delay: 185, dur: 195 },
  { d: "M 77,48 L 80,42 L 85,35",                                w: 0.25, delay: 235, dur: 195 },
] as const;

/* ═══════════════════════════════════════════════════════════════
   WEB AUDIO SYNTHESIS — 3 layered sounds
   ═══════════════════════════════════════════════════════════════ */

/** Phase 1 — Deep sub-bass thud, mirrors the shockwave rings */
function synthImpact(ctx: AudioContext): void {
  const now = ctx.currentTime;
  // Sub-bass pitch-dive: 80 → 25 Hz
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(25, now + 0.18);
  oscGain.gain.setValueAtTime(0.85, now);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.5);
  // Low-pass noise punch transient
  const noiseLen = Math.floor(ctx.sampleRate * 0.12);
  const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const noiseData = noiseBuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) noiseData[i] = Math.random() * 2 - 1;
  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = noiseBuf;
  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 200;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.55, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  noiseNode.connect(lpf);
  lpf.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseNode.start(now);
}

/**
 * Phase 2 — Sharp glass crack as crack lines draw in.
 * High-frequency noise burst + resonant ring-down = "crystal ting + crack".
 */
function synthCrack(ctx: AudioContext): void {
  const now = ctx.currentTime;
  // Exponentially-decaying noise burst → highpass → bandpass resonator
  const len = Math.floor(ctx.sampleRate * 0.1);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.15));
  }
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 2500;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 4200;
  bp.Q.value = 6; // high Q = glass resonance
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.75, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(hpf);
  hpf.connect(bp);
  bp.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  // Resonant ring-down oscillator (the "ting" tail)
  const ring = ctx.createOscillator();
  ring.type = "sine";
  ring.frequency.value = 3200;
  const ringGain = ctx.createGain();
  ringGain.gain.setValueAtTime(0.28, now);
  ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  ring.connect(ringGain);
  ringGain.connect(ctx.destination);
  ring.start(now);
  ring.stop(now + 0.3);
}

/**
 * Phase 3 — Full glass shatter as shards fly.
 * Dense high-freq noise + staggered debris micro-bursts.
 */
function synthShatter(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const crackLen = Math.floor(ctx.sampleRate * 0.35);
  const crackBuf = ctx.createBuffer(1, crackLen, ctx.sampleRate);
  const crackData = crackBuf.getChannelData(0);
  for (let i = 0; i < crackLen; i++) crackData[i] = Math.random() * 2 - 1;
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 4000;
  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.6, now);
  crackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  const crackNode = ctx.createBufferSource();
  crackNode.buffer = crackBuf;
  crackNode.connect(hpf);
  hpf.connect(crackGain);
  crackGain.connect(ctx.destination);
  crackNode.start(now);
  // Debris micro-bursts — staggered, pitched progressively higher (tinkling shards)
  const debrisBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.07), ctx.sampleRate);
  const debrisData = debrisBuf.getChannelData(0);
  for (let j = 0; j < debrisData.length; j++) debrisData[j] = Math.random() * 2 - 1;
  for (let i = 0; i < 5; i++) {
    const debrisDelay = 0.03 + i * 0.06;
    const debrisHpf = ctx.createBiquadFilter();
    debrisHpf.type = "highpass";
    debrisHpf.frequency.value = 5000 + i * 1200;
    const debrisGain = ctx.createGain();
    debrisGain.gain.setValueAtTime(0.0001, now);
    debrisGain.gain.setValueAtTime(0.3 - i * 0.04, now + debrisDelay);
    debrisGain.gain.exponentialRampToValueAtTime(0.0001, now + debrisDelay + 0.07);
    const debrisNode = ctx.createBufferSource();
    debrisNode.buffer = debrisBuf;
    debrisNode.connect(debrisHpf);
    debrisHpf.connect(debrisGain);
    debrisGain.connect(ctx.destination);
    debrisNode.start(now + debrisDelay);
  }
}

/* ═══════════════════════════════════════════════════════════════
   CRACK OVERLAY
   Pure SVG with CSS stroke-dashoffset animation.
   stroke-dashoffset is GPU-composited — no layout, no paint.
   Safe on mobile; zero JS per animation frame.
   ═══════════════════════════════════════════════════════════════ */
const CrackOverlay = memo(({ fading }: { fading: boolean }) => (
  <motion.div
    className="absolute inset-0 z-[45] pointer-events-none"
    initial={{ opacity: 1 }}
    animate={{ opacity: fading ? 0 : 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle golden glow filter — applied once, shared by all paths */}
        <filter id="crack-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {CRACK_LINES.map((crack, i) => (
        <path
          key={i}
          d={crack.d}
          stroke={i < 8 ? "rgba(245,166,35,0.95)" : "rgba(212,168,65,0.7)"}
          strokeWidth={crack.w}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={i < 8 ? "url(#crack-glow)" : undefined}
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: `crack-draw ${crack.dur}ms ease-out ${crack.delay}ms forwards`,
          }}
        />
      ))}
    </svg>
  </motion.div>
));
CrackOverlay.displayName = "CrackOverlay";

/* ═══════════════════════════════════════════════════════════════
   SHARED CONTENT RENDERER — memo'd, 6 shard clones + main pane
   ═══════════════════════════════════════════════════════════════ */
const PreloaderContent = memo(({ isInteractive, onEnter }: { isInteractive?: boolean; onEnter?: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    {/* Glowing Logo */}
    <div
      className={`mb-12 md:mb-16 w-[80vw] max-w-xl mx-auto flex justify-center items-center drop-shadow-[0_0_15px_rgba(245,166,35,0.3)] ${
        isInteractive ? "animate-text-pulse" : ""
      }`}
      style={!isInteractive ? { filter: "drop-shadow(0px 0px 20px rgba(245,166,35,0.5))" } : {}}
    >
      <img src="/enthuzealogo.svg" alt="Enthuzea 2K26" className="w-full h-auto object-contain" />
    </div>

    {/* Enter Button */}
    <button
      onClick={isInteractive ? onEnter : undefined}
      className={`group relative px-8 py-4 md:px-12 md:py-5 bg-transparent overflow-hidden rounded-sm outline-none ${
        isInteractive ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 border border-marigold/30 group-hover:border-marigold transition-colors duration-300" />
      <div className="absolute inset-0 bg-marigold/5 group-hover:bg-marigold/20 transition-colors duration-300 blur-sm" />
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-marigold opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-marigold opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-marigold opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-marigold opacity-50 group-hover:opacity-100 transition-opacity" />
      <span className="relative font-display font-bold text-sm md:text-lg text-marigold tracking-widest uppercase z-10 drop-shadow-md">
        Unleash The Energy
      </span>
    </button>
  </div>
));
PreloaderContent.displayName = "PreloaderContent";

/* ═══════════════════════════════════════════════════════════════
   PRELOADER — 3-phase animation state machine
   ─────────────────────────────────────────────────────────────
   idle → [click] → shaking
        → [+700ms] → cracking  (SVG lines draw in + glass crack sound)
        → [+450ms] → shattering (shards fly + shatter sound + cracks fade)
        → [+2150ms] → unmounted
   ═══════════════════════════════════════════════════════════════ */
export default function Preloader() {
  const [show, setShow]           = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isCracking, setIsCracking] = useState(false); // crack lines visible
  const [isShattering, setIsShattering] = useState(false); // shards flying

  const bgAudioRef      = useRef<HTMLAudioElement>(null);
  const audioCtxRef     = useRef<AudioContext | null>(null);
  // Pre-decoded buffers for zero-latency playback — decoded independently
  const impactBufferRef  = useRef<AudioBuffer | null>(null); // t=0
  const shatterBufferRef = useRef<AudioBuffer | null>(null); // t=1150ms

  /* ── Pre-decode both optional file SFXs on mount ───────────── */
  useEffect(() => {
    const impactUrl  = MEDIA_CONFIG.PRELOADER_IMPACT_SFX_URL;
    const shatterUrl = MEDIA_CONFIG.PRELOADER_SHATTER_SFX_URL;
    if (!impactUrl && !shatterUrl) return;

    // Create one shared AudioContext for both decodes
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = ctx;

    if (impactUrl) {
      fetch(impactUrl)
        .then(r => r.arrayBuffer())
        .then(buf => ctx.decodeAudioData(buf))
        .then(decoded => { impactBufferRef.current = decoded; })
        .catch(() => { /* fall back to synthImpact */ });
    }
    if (shatterUrl) {
      fetch(shatterUrl)
        .then(r => r.arrayBuffer())
        .then(buf => ctx.decodeAudioData(buf))
        .then(decoded => { shatterBufferRef.current = decoded; })
        .catch(() => { /* fall back to synthShatter */ });
    }
  }, []);

  /* ── Background music + scroll lock ────────────────────────── */
  useEffect(() => {
    if (!show) return;
    const audio = bgAudioRef.current;
    if (audio) { audio.volume = 0.05; audio.play().catch(() => {}); }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [show]);

  /* ── Lazy AudioContext getter ───────────────────────────────── */
  const getCtx = useCallback((): AudioContext => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  /* ── Main enter handler ─────────────────────────────────────── */
  const handleEnter = useCallback(() => {
    // ① Instant shake — paint before any audio work (↓ INP)
    setIsShaking(true);

    // ② Defer audio to next tick so shake paints first
    setTimeout(() => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime = 0;
      }
      window.dispatchEvent(new Event("play-audio"));
      // Impact — file if provided, otherwise synthesis
      try {
        const ctx = getCtx();
        if (impactBufferRef.current) {
          const src = ctx.createBufferSource();
          src.buffer = impactBufferRef.current;
          src.connect(ctx.destination);
          src.start();
        } else {
          synthImpact(ctx);
        }
      } catch { /* silent fail */ }
    }, 10);

    // ③ Crack lines appear (t=700ms) + "crystal crack" sound
    setTimeout(() => {
      setIsCracking(true);
      try { synthCrack(getCtx()); } catch { /* silent fail */ }
    }, 700);

    // ④ Shards fly (t=1150ms) — cracks start fading, shatter sound fires
    setTimeout(() => {
      setIsShattering(true);
      // File if provided, otherwise synthesis
      try {
        const ctx = getCtx();
        if (shatterBufferRef.current) {
          const src = ctx.createBufferSource();
          src.buffer = shatterBufferRef.current;
          src.connect(ctx.destination);
          src.start();
        } else {
          synthShatter(ctx);
        }
      } catch { /* silent fail */ }
    }, 1150);

    // ⑤ Unmount (t=3300ms) — all shards gone + audio tail complete
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "unset";
      // Close AudioContext after shatter tail fully plays
      setTimeout(() => {
        audioCtxRef.current?.close().catch(() => {});
        audioCtxRef.current = null;
      }, 800);
    }, 3300);
  }, [getCtx]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">

          {/* Seam hider — black base, vanishes instantly when shards mount */}
          <motion.div
            className="absolute inset-0 bg-black z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: isShattering ? 0 : 1 }}
            transition={{ duration: 0 }}
          />

          {/* ── Shockwave rings ─────────────────────────────────── */}
          <AnimatePresence>
            {isShaking && (
              <motion.div
                className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Primary gold ring */}
                <motion.div
                  className="absolute w-32 h-32 border-[8px] border-marigold/80 rounded-full transform-gpu will-change-transform"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 28, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                {/* Secondary terracotta ring */}
                <motion.div
                  className="absolute w-32 h-32 border-[4px] border-terracotta/60 rounded-full transform-gpu will-change-transform"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 22, opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
                />
                {/* Tertiary white ring */}
                <motion.div
                  className="absolute w-32 h-32 border-[2px] border-white/30 rounded-full transform-gpu will-change-transform"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 18, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Crack lines — CSS-only SVG, zero JS per frame ───── */}
          {isCracking && <CrackOverlay fading={isShattering} />}

          {/* ── Shards ──────────────────────────────────────────── */}
          {isShattering &&
            SHARDS.map((shard, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 z-10 will-change-transform"
                initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                animate={{ y: shard.y, x: shard.x, rotate: shard.rotate, opacity: 0 }}
                transition={{ duration: shard.duration, delay: shard.delay, ease: "easeIn" }}
              >
                <div className="absolute inset-0 bg-black overflow-hidden" style={{ clipPath: shard.clip }}>
                  <PreloaderContent isInteractive={false} />
                </div>
              </motion.div>
            ))}

          <audio ref={bgAudioRef} src={MEDIA_CONFIG.BACKGROUND_AUDIO_URL} loop />

          {/* ── Main UI — hidden once shards take over ──────────── */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none ${isShaking ? "animate-shake" : ""} ${
              isShattering ? "hidden" : ""
            }`}
          >
            <PreloaderContent isInteractive={true} onEnter={handleEnter} />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
