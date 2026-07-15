import type { Metadata, Viewport } from "next";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import Preloader from "@/components/Preloader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Enthuzea 2k26",
  description:
    "Enthuzea 2k26 — The grandest annual cultural fest of SVIST. Experience an unforgettable celebration of art, music, dance, and Bengali culture on 21st & 22nd July 2026.",
  keywords: [
    "enthuzea",
    "enthuzea 2k26",
    "SVIST",
    "cultural fest",
    "bengali culture",
    "college fest",
    "annual fest",
    "music",
    "dance",
    "art",
  ],
  openGraph: {
    title: "Enthuzea 2k26 — SVIST Annual Cultural Fest",
    description:
      "Enthuzea 2k26 — The grandest celebration of art, music, dance, and Bengali culture. 21st & 22nd July 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E2C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden">
      <body className="bg-midnight text-cream grain min-h-dvh flex flex-col relative overflow-x-hidden max-w-[100vw]">
        {/* Ambient background glow orbs */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Top-left marigold glow */}
          <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-marigold/[0.07] blur-[100px] animate-glow" />
          {/* Bottom-right terracotta glow */}
          <div className="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-terracotta/[0.06] blur-[80px] animate-glow [animation-delay:2s]" />
          {/* Center gold accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-gold/[0.04] blur-[120px] animate-glow [animation-delay:4s]" />
          
          {/* Subtle Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-overlay opacity-[0.03] select-none">
            <span className="font-display font-black text-[15vw] leading-none text-cream whitespace-nowrap">Enthuzea&apos;26</span>
          </div>

          {/* Color Filter Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-marigold/10 to-terracotta/5 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Global Navigation */}
        <Navigation />

        {/* Global Preloader - Renders on top of everything before user enters */}
        <Preloader />

        {/* Main content */}
        <main className="relative z-10 flex-1 overflow-x-hidden pt-12 md:pt-0">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Global audio player */}
        <AudioPlayer />
        
        {/* Global video popup */}
        <VideoModal />

        {/* Developer signature */}
        <div className="fixed bottom-1.5 left-1/2 -translate-x-1/2 z-[200] pointer-events-none select-none mix-blend-overlay opacity-20">
          <span className="font-display font-black text-[11px] tracking-[0.5em] uppercase text-cream">
            ✦ krish
          </span>
        </div>

        {/* Vercel Web Analytics */}
        <Analytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
