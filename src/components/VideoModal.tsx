"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MEDIA_CONFIG } from "@/config/media";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stallRetryRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isOpenRef = useRef(false);

  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  const stopStallMonitor = useCallback(() => {
    if (stallRetryRef.current) {
      clearInterval(stallRetryRef.current);
      stallRetryRef.current = null;
    }
  }, []);

  const startStallMonitor = useCallback(() => {
    stopStallMonitor();
    let lastTime = -1;
    let stalledCount = 0;
    stallRetryRef.current = setInterval(() => {
      const video = videoRef.current;
      if (!video || !isOpenRef.current || video.paused || video.ended) return;
      if (video.currentTime === lastTime) {
        stalledCount++;
        if (stalledCount >= 2) {
          video.play().catch(() => {});
          stalledCount = 0;
        }
      } else {
        stalledCount = 0;
      }
      lastTime = video.currentTime;
    }, 1000);
  }, [stopStallMonitor]);

  // ── OPEN: called synchronously inside the user-gesture stack ──
  const openModal = useCallback(() => {
    window.dispatchEvent(new Event("pause-audio"));

    const video = videoRef.current;
    if (video) {
      // KEY FIX: Set src + load() + play() all inside the user gesture.
      // This bypasses Chrome Android's "hidden video buffer flush" bug.
      // Chrome allows src assignment + play() in the same gesture stack,
      // even if it requires a fresh network load.
      if (video.src !== MEDIA_CONFIG.MODAL_VIDEO_URL) {
        video.src = MEDIA_CONFIG.MODAL_VIDEO_URL;
      }
      video.currentTime = 0;
      video.load();
      const p = video.play();
      if (p) p.catch(() => {});
    }

    setIsOpen(true);
    startStallMonitor();
  }, [startStallMonitor]);

  useEffect(() => {
    window.addEventListener("open-video", openModal);
    return () => window.removeEventListener("open-video", openModal);
  }, [openModal]);

  const handleClose = useCallback(() => {
    stopStallMonitor();
    setIsOpen(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Remove src so Chrome doesn't keep a decode session alive when hidden
      video.removeAttribute("src");
      video.load();
    }
    window.dispatchEvent(new Event("resume-audio"));
  }, [stopStallMonitor]);

  const handleVideoEnded = useCallback(() => {
    stopStallMonitor();
    setIsOpen(false);
    const video = videoRef.current;
    if (video) {
      video.removeAttribute("src");
      video.load();
    }
    window.dispatchEvent(new Event("resume-audio"));
    setTimeout(() => {
      document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }, [stopStallMonitor]);

  const handleStall = useCallback(() => {
    const video = videoRef.current;
    if (video && isOpenRef.current && !video.ended) {
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => () => stopStallMonitor(), [stopStallMonitor]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-[110] p-2 text-cream/60 hover:text-white transition-colors"
        aria-label="Close video"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container */}
      <div
        className={`relative w-full max-w-6xl aspect-video mx-4 sm:mx-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,166,35,0.15)] ring-1 ring-white/10 transition-transform duration-500 delay-100 ${isOpen ? "scale-100" : "scale-90"}`}
      >
        {/*
          Video element is always mounted for instant DOM access,
          but src is only set at play time to prevent Chrome's
          hidden-element buffer flush behavior.
        */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover bg-black"
          controls={false}
          playsInline
          onEnded={handleVideoEnded}
          onStalled={handleStall}
          onWaiting={handleStall}
          onSuspend={handleStall}
        />
      </div>
    </div>
  );
}
