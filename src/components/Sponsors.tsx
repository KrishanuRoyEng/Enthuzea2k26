"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SPONSORS, Sponsor } from "@/config/sponsorsData";

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.websiteUrl || "#"}
      target={sponsor.websiteUrl ? "_blank" : "_self"}
      rel={sponsor.websiteUrl ? "noopener noreferrer" : ""}
      className="block w-[240px] h-[300px] sm:w-[280px] sm:h-[340px] p-6 glass rounded-2xl border border-white/10 bg-black/60 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-marigold/40 hover:bg-black/80 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      onClick={(e) => {
        if (!sponsor.websiteUrl) e.preventDefault();
      }}
    >
      {sponsor.logoUrl ? (
        <img 
          src={sponsor.logoUrl} 
          alt={sponsor.name} 
          className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-2" 
          loading="lazy"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-marigold/20 to-terracotta/20 flex items-center justify-center border border-marigold/30 text-gradient-gold text-4xl font-display font-bold mb-2 shadow-inner">
          {sponsor.name.charAt(0)}
        </div>
      )}
      <h3 className="text-xl sm:text-2xl font-display font-semibold text-cream line-clamp-2">{sponsor.name}</h3>
      {sponsor.tier && (
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-marigold font-body font-bold bg-marigold/10 px-3 py-1 rounded-full border border-marigold/20">
          {sponsor.tier}
        </span>
      )}
    </a>
  );
}

export default function Sponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (!SPONSORS || SPONSORS.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SPONSORS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!SPONSORS || SPONSORS.length === 0) return null;

  // Touch handlers for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setCurrentIndex((prev) => (prev + 1) % SPONSORS.length);
    } else if (diff < -40) {
      setCurrentIndex((prev) => (prev - 1 + SPONSORS.length) % SPONSORS.length);
    }
    touchStartX.current = null;
  };

  const getCardStyle = (index: number) => {
    const total = SPONSORS.length;
    const diff = (index - currentIndex + total) % total;

    // Mobile specific distances
    const gap1 = isMobile ? 130 : 250;
    const gap2 = isMobile ? 200 : 400;

    if (diff === 0) {
      return { transform: "translateX(0) scale(1) rotateY(0)", opacity: 1, zIndex: 50 };
    } else if (diff === 1 || (diff === total - 1 && total === 2)) {
      return { transform: `translateX(${gap1}px) scale(0.85) rotateY(-15deg)`, opacity: 0.7, zIndex: 40 };
    } else if (diff === 2 && total > 3) {
      return { transform: `translateX(${gap2}px) scale(0.7) rotateY(-25deg)`, opacity: 0.3, zIndex: 30 };
    } else if (diff === total - 1) {
      return { transform: `translateX(-${gap1}px) scale(0.85) rotateY(15deg)`, opacity: 0.7, zIndex: 40 };
    } else if (diff === total - 2 && total > 3) {
      return { transform: `translateX(-${gap2}px) scale(0.7) rotateY(25deg)`, opacity: 0.3, zIndex: 30 };
    } else {
      // Hidden cards behind the scene
      return { transform: "translateX(0) scale(0.5) rotateY(0)", opacity: 0, zIndex: 0 };
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden bg-midnight-deep z-20 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10 px-4"
      >
        <p className="text-[10px] sm:text-xs font-body tracking-[0.3em] uppercase text-gold-shimmer/70 mb-3">
          Powered By
        </p>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-gradient-gold drop-shadow-lg">
          Sponsored By
        </h2>
      </motion.div>

      {SPONSORS.length <= 2 ? (
        // Simple Flex Layout for 1 or 2 sponsors
        <div className="flex flex-wrap justify-center gap-8 px-4 relative z-10 w-full max-w-5xl">
          {SPONSORS.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SponsorCard sponsor={sponsor} />
            </motion.div>
          ))}
        </div>
      ) : (
        // 3D Carousel Layout for 3+ sponsors
        <div 
          className="relative w-full max-w-6xl h-[320px] sm:h-[400px] flex items-center justify-center perspective-[1200px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SPONSORS.map((sponsor, idx) => {
            const style = getCardStyle(idx);
            const isCenter = idx === currentIndex;
            
            return (
              <div
                key={sponsor.id}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                  isCenter ? "cursor-default" : "cursor-pointer"
                }`}
                style={{
                  ...style,
                  transformStyle: "preserve-3d"
                }}
                onClick={() => {
                  if (!isCenter) setCurrentIndex(idx);
                }}
              >
                {/* Pointer events none on non-center cards forces clicks to hit the wrapper div to navigate */}
                <div className={isCenter ? "pointer-events-auto" : "pointer-events-none"}>
                  <SponsorCard sponsor={sponsor} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Navigation Indicators (only if carousel active) */}
      {SPONSORS.length > 2 && (
        <div className="flex items-center gap-2 mt-12 relative z-10">
          {SPONSORS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-marigold" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to sponsor ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
