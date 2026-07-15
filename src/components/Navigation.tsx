"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION COMPONENT
   Mobile: Sleek glassmorphic bottom dock (iOS style)
   Desktop: Floating top pill
   ═══════════════════════════════════════════════════════════════ */

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Gallery",
    path: "/gallery",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    name: "Team",
    path: "/team",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    name: "Location",
    path: "/location",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ─── BRAND LOGOS (Centered on Mobile, Edges on Desktop) ─── */}
      <motion.div
        className="absolute top-4 md:top-6 left-0 right-0 z-50 flex items-center justify-center gap-6 md:justify-between px-4 md:px-8 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* COLLEGE LOGO */}
        <Link href="/" className="pointer-events-auto">
          <img 
            src="/College.svg" 
            alt="SVIST College Logo" 
            className="w-12 sm:w-16 md:w-20 h-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:animate-[spin-y_3s_linear_infinite] active:animate-[spin-y_3s_linear_infinite] border-none outline-none"
            style={{ fetchPriority: 'high' } as React.CSSProperties}
          />
        </Link>

        {/* ENTHUZEA LOGO */}
        <Link href="/" className="pointer-events-auto">
          <img 
            src="/enthuzea-logo-Photoroom.svg" 
            alt="Enthuzea Logo" 
            className="w-14 sm:w-20 md:w-24 h-auto object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.7)] transition-transform duration-300 hover:animate-[spin-y_3s_linear_infinite_reverse] active:animate-[spin-y_3s_linear_infinite_reverse] border-none outline-none"
            style={{ fetchPriority: 'high' } as React.CSSProperties}
          />
        </Link>
      </motion.div>

      {/* ─── DESKTOP NAVIGATION (Top Pill) ─── */}
      <motion.div
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg items-center justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`
            flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-500 border
            ${isScrolled ? "glass border-white/10 shadow-2xl shadow-midnight-deep/50" : "bg-white/5 border-white/5 backdrop-blur-sm shadow-lg"}
          `}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link href={item.path} key={item.name} className="relative px-5 py-2.5 rounded-full overflow-hidden group">
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 bg-marigold/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 font-body text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? "text-marigold font-semibold" : "text-cream/60 group-hover:text-cream"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ─── MOBILE NAVIGATION (Bottom Dock) ─── */}
      <motion.div
        className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass rounded-[2rem] w-full max-w-[340px] px-4 py-2 flex items-center justify-between relative shadow-2xl shadow-black/80 border border-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className="relative flex flex-col items-center justify-center w-12 h-12"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-bubble"
                    className="absolute inset-0 bg-marigold/20 rounded-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <div
                  className={`relative z-10 transition-all duration-300 scale-90 ${
                    isActive ? "text-marigold -translate-y-2" : "text-cream/50"
                  }`}
                >
                  {item.icon}
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-1 text-[9px] font-body text-marigold tracking-wider uppercase font-semibold whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
