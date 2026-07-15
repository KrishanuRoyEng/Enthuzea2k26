import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enthuzea 2k26 — Gallery",
  description: "Relive the moments — explore the Enthuzea 2k26 gallery of performances, art, music, and cultural celebrations.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
