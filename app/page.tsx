import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { KineticTicker } from "@/components/sections/KineticTicker";
import { SkillsGrid } from "@/components/sections/SkillsGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-32 px-8 pb-20 max-w-7xl mx-auto w-full">
        <Hero />
        <KineticTicker />
        <SkillsGrid />
      </main>
      <Footer />
    </>
  );
}
