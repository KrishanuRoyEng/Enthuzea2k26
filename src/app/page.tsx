import HeroSection from "@/components/HeroSection";
import ShowcaseVideo from "@/components/ShowcaseVideo";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* The Parallax Stage Video */}
      <ShowcaseVideo />

      {/* Sponsors Carousel */}
      <Sponsors />
    </>
  );
}
