import type { Metadata } from "next";
import Committees from "@/components/Committees";

export const metadata: Metadata = {
  title: "Team | Enthuzea 2k26",
  description:
    "Meet the organizing committee behind Enthuzea 2k26 — the dedicated faculty and staff of SVIST bringing culture, art, and energy together on 21st & 22nd July 2026.",
};

export default function TeamPage() {
  return <Committees />;
}
