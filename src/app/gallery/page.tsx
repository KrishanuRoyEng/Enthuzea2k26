"use client";

import { motion } from "framer-motion";

// Placeholder images for the gallery
const galleryImages = [
  { id: 1, height: "h-64 md:h-80", color: "bg-marigold/20", title: "Cultural Dance" },
  { id: 2, height: "h-48 md:h-64", color: "bg-terracotta/20", title: "Music Performance" },
  { id: 3, height: "h-72 md:h-96", color: "bg-gold/20", title: "Art Exhibition" },
  { id: 4, height: "h-56 md:h-72", color: "bg-maroon/20", title: "Fashion Show" },
  { id: 5, height: "h-80 md:h-[400px]", color: "bg-marigold-deep/20", title: "Drama & Theatre" },
  { id: 6, height: "h-64 md:h-80", color: "bg-terracotta-light/20", title: "Folk Arts" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-gold mb-4">
          Moments of Magic
        </h1>
        <p className="text-cream/60 font-body max-w-2xl mx-auto">
          Relive the extraordinary moments from past celebrations. A glimpse into the heart of Enthuzea.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-3xl mx-auto glass rounded-3xl p-12 flex flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-marigold/5 to-transparent pointer-events-none" />
        
        <img 
          src="/enthuzea-logo-Photoroom.svg" 
          alt="Enthuzea Logo" 
          className="w-32 md:w-40 h-auto object-contain opacity-50 mb-8 filter drop-shadow-[0_0_15px_rgba(245,166,35,0.2)] animate-pulse" 
          loading="lazy" 
        />
        
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-cream mb-4 relative z-10">
          The Magic is Being Developed
        </h2>
        
        <p className="text-cream/60 font-body mb-8 max-w-md relative z-10">
          We are currently gathering all the beautiful memories from Enthuzea. High-quality photos from the celebration will be added here very soon!
        </p>
        
        <div className="flex items-center gap-3 text-marigold relative z-10">
          <span className="w-2 h-2 rounded-full bg-marigold animate-ping" />
          <span className="font-body text-sm font-semibold tracking-wider uppercase">Stay Tuned</span>
        </div>
      </motion.div>
    </div>
  );
}
