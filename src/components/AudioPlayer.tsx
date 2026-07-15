"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_CONFIG } from "@/config/media";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use refs for values that need to be read in event listeners
  // without causing stale closures or re-registering listeners
  const isPlayingRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const isSuppressedRef = useRef(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fadeAudio = useCallback((targetVol: number, durationMs: number = 500, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVol = audio.volume;
    const steps = 20;
    const stepVol = (targetVol - startVol) / steps;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const nextVol = startVol + stepVol * step;
      audio.volume = Math.max(0, Math.min(1, nextVol));
      if (step >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (onComplete) onComplete();
      }
    }, Math.floor(durationMs / steps));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteractedRef.current) {
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
        hasInteractedRef.current = true;
      }).catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch(() => {});
    }
  }, []); // No deps — reads refs, never stale

  // Event listeners registered ONCE — read from refs, no stale closures
  useEffect(() => {
    const handlePlayAudioEvent = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!isPlayingRef.current) {
        audio.muted = false;
        audio.play().then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          hasInteractedRef.current = true;
        }).catch(() => {});
      }
    };

    const handlePauseAudioEvent = () => {
      isSuppressedRef.current = true;
      if (audioRef.current && isPlayingRef.current) {
        fadeAudio(0, 500, () => {
          if (audioRef.current) audioRef.current.pause();
        });
      }
    };

    const handleResumeAudioEvent = () => {
      isSuppressedRef.current = false;
      const audio = audioRef.current;
      if (audio && hasInteractedRef.current && isPlayingRef.current) {
        audio.play().catch(() => {});
        fadeAudio(0.1, 500); // Fade back up to a reasonable baseline, scroll will take over
      }
    };

    window.addEventListener("play-audio", handlePlayAudioEvent);
    window.addEventListener("pause-audio", handlePauseAudioEvent);
    window.addEventListener("resume-audio", handleResumeAudioEvent);

    return () => {
      window.removeEventListener("play-audio", handlePlayAudioEvent);
      window.removeEventListener("pause-audio", handlePauseAudioEvent);
      window.removeEventListener("resume-audio", handleResumeAudioEvent);
    };
  }, []); // Registered ONCE — no re-registration on state change

  // Scroll-based volume — throttled with scroll event, NOT a rAF loop
  useEffect(() => {
    if (!isPlaying) return;

    const updateVolume = () => {
      if (isSuppressedRef.current) return;
      
      const audio = audioRef.current;
      if (!audio) return;

      const showcase = document.getElementById("showcase");
      if (!showcase) {
        audio.volume = 0.05;
        return;
      }

      const rect = showcase.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight * 1.5;
      let targetVolume = 0.25 - (distance / maxDistance) * (0.25 - 0.02);
      targetVolume = Math.max(0.02, Math.min(0.25, targetVolume));
      audio.volume = targetVolume;
    };

    // Use scroll event (passive) instead of rAF loop — much cheaper on mobile
    window.addEventListener("scroll", updateVolume, { passive: true });
    updateVolume(); // run once immediately
    return () => window.removeEventListener("scroll", updateVolume);
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MEDIA_CONFIG.BACKGROUND_AUDIO_URL}
        preload="auto"
        loop
      />

      {/* Floating glassmorphic toggle — fixed bottom-right */}
      <motion.button
        onClick={toggleAudio}
        className="
          fixed bottom-20 md:bottom-5 right-5 z-50
          w-12 h-12 sm:w-14 sm:h-14
          rounded-full
          glass
          flex items-center justify-center
          cursor-pointer
          transition-all duration-300
          hover:border-marigold/30
          hover:shadow-lg hover:shadow-marigold/10
          active:scale-90
        "
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Pulse ring when paused */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border border-marigold/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.svg
              key="playing"
              className="w-5 h-5 sm:w-6 sm:h-6 text-marigold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </motion.svg>
          ) : (
            <motion.svg
              key="paused"
              className="w-5 h-5 sm:w-6 sm:h-6 text-gold-shimmer/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
