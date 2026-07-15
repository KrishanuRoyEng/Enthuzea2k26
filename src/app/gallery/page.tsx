"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIA_CONFIG } from "@/config/media";

// Helper to determine if a URL is a video
const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const mediaList = MEDIA_CONFIG.GALLERY_IMAGES || [];

  // Disable scroll when lightbox is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
      // If it's a video, pause background music
      if (isVideo(mediaList[selectedIdx])) {
        window.dispatchEvent(new Event("pause-audio"));
      }
    } else {
      document.body.style.overflow = "unset";
      // Resume background music when closing lightbox
      window.dispatchEvent(new Event("resume-audio"));
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx, mediaList]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === null ? null : (prev + 1) % mediaList.length));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === null ? null : (prev - 1 + mediaList.length) % mediaList.length));
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 container mx-auto max-w-7xl">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-gold mb-4">
          Moments of Magic
        </h1>
        <p className="text-cream/60 font-body max-w-2xl mx-auto text-sm sm:text-base">
          Relive the extraordinary moments from past celebrations. A glimpse into the heart of Enthuzea.
        </p>
      </motion.div>

      {/* ── Empty State ── */}
      {mediaList.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mx-auto glass rounded-3xl p-10 flex flex-col items-center text-center border border-white/10"
        >
          <img 
            src="/enthuzea-logo-Photoroom.svg" 
            alt="Logo" 
            className="w-24 h-auto opacity-50 mb-6 drop-shadow-[0_0_15px_rgba(245,166,35,0.2)] animate-pulse" 
          />
          <h2 className="text-2xl font-display font-semibold text-cream mb-3">
            The Magic is Being Developed
          </h2>
          <p className="text-cream/60 font-body text-sm">
            Add image/video URLs to the GALLERY_IMAGES array in media config to see them here!
          </p>
        </motion.div>
      )}

      {/* ── Masonry Grid ── */}
      {mediaList.length > 0 && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {mediaList.map((url, i) => {
            const isVid = isVideo(url);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 break-inside-avoid"
                onClick={() => setSelectedIdx(i)}
              >
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 flex items-center justify-center">
                  {isVid && (
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-cream">
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {isVid ? (
                  // Thumbnail preview for video
                  <video
                    src={url}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    preload="metadata"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  // Image
                  <img
                    src={url}
                    alt={`Gallery ${i}`}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(null);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Container */}
            <div 
              className="relative w-full max-w-5xl max-h-[90vh] mx-4 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex justify-center"
                >
                  {isVideo(mediaList[selectedIdx]) ? (
                    <video
                      src={mediaList[selectedIdx]}
                      controls
                      autoPlay
                      playsInline
                      className="max-w-full max-h-[85vh] rounded-lg outline-none"
                    />
                  ) : (
                    <img
                      src={mediaList[selectedIdx]}
                      alt="Enthuzea Gallery"
                      className="max-w-full max-h-[85vh] object-contain rounded-lg select-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev Button */}
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-cream backdrop-blur-md transition-all"
                onClick={handlePrev}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-cream backdrop-blur-md transition-all"
                onClick={handleNext}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Status indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-body tracking-widest text-cream/50 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
              {selectedIdx + 1} / {mediaList.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
