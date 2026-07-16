import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 pb-28 md:pb-10 pt-16 overflow-hidden">
      {/* Top subtle border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-3xl h-px bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-marigold/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">

          {/* Brand & Tagline */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <img
              src="/enthuzea-logo-Photoroom.svg"
              alt="Enthuzea Logo"
              className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.4)]"
              loading="lazy"
            />
            <p className="text-sm text-cream/50 font-body max-w-xs text-center md:text-left mt-0">
              The grandest celebration of art, music, dance, and Bengali culture at SVIST. Where tradition meets the extraordinary.
            </p>
          </div>

          {/* Contact Details
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-marigold/80 font-body">Contact Us</h3>
            <div className="space-y-2 text-sm text-cream/60 font-body">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:cultural@svist.org" className="hover:text-marigold transition-colors">cultural@svist.org</a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919876543210" className="hover:text-marigold transition-colors">+91 98765 43210</a>
              </p>
            </div>
          </div> */}

          {/* Social Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-marigold/80 font-body">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/Enthuzea2K18/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-marigold hover:border-marigold/40 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-center space-y-2">
          <p className="text-xs text-cream/40 font-body">
            &copy; {new Date().getFullYear()} Swami Vivekananda Institute of Science and Technology. All rights reserved.
          </p>
          <p className="text-[10px] text-cream/30 font-body tracking-wider uppercase">
            Crafted with passion for Enthuzea
          </p>
        </div>
      </div>
    </footer>
  );
}
