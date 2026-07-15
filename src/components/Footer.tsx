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

          {/* Contact Details */}
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
          </div>

          {/* Social Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-marigold/80 font-body">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-marigold hover:border-marigold/40 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-marigold hover:border-marigold/40 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
