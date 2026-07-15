"use client";

import { motion } from "framer-motion";

export default function LocationPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-gold mb-4">
          Find Your Way
        </h1>
        <p className="text-cream/60 font-body max-w-2xl mx-auto">
          Join us at the Jai Hind Auditorium. Here is everything you need to know to reach the venue.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] gap-6 w-full items-stretch justify-center">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[400px] lg:h-auto min-h-[400px] glass rounded-3xl overflow-hidden border border-white/10 group"
        >
          <div className="absolute inset-0 bg-midnight-light flex items-center justify-center bg-transparent">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.3772239241343!2d88.3903393!3d22.452454499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027191980537cf%3A0xfe81e9f2a4a9e486!2sJai%20Hind%20Auditorium!5e0!3m2!1sen!2sin!4v1784109774833!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(0.8)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://maps.app.goo.gl/UV2GcsEWjphKEUqUA"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 bg-marigold text-midnight-deep font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 pointer-events-auto"
          >
            Open in Maps
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>

        {/* Info Stack */}
        <div className="w-full flex flex-col gap-6">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-display font-semibold text-marigold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Event Dates
            </h2>
            <p className="text-cream/80 font-body text-lg leading-relaxed mb-1">
              21st & 22nd July, 2026
            </p>
            <p className="text-cream/60 font-body text-sm leading-relaxed">
              Mark your calendars for two unforgettable days of culture, art, and celebration.
            </p>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-display font-semibold text-marigold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Venue Address
            </h2>
            <p className="text-cream/80 font-body leading-relaxed mb-2">
              Jai Hind Auditorium
            </p>
            <p className="text-cream/60 font-body text-sm leading-relaxed">
              322, Garia Main Road, Narendrapally,<br />
              Mahamaya Tala, Garia, Rajpur Sonarpur,<br />
              Kolkata, West Bengal 700084, India
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-display font-semibold text-marigold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              How to Reach
            </h2>
            <ul className="space-y-4 text-cream/70 font-body text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-marigold/10 rounded-full">
                  <svg className="w-4 h-4 text-marigold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-cream mb-1">By Bus</strong>
                  Take any bus heading towards Garia or Baruipur. Alight at Mahamaya Tala or Garia stoppage. The auditorium is on Garia Main Road.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-marigold/10 rounded-full">
                  <svg className="w-4 h-4 text-marigold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-cream mb-1">By Train & Metro</strong>
                  Nearest railway station is Sonarpur Junction. Nearest metro is Kavi Nazrul (Garia Bazar). From the station, auto-rickshaws are readily available to Mahamaya Tala.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
