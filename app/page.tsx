import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { KineticTicker } from "@/components/sections/KineticTicker";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 overflow-x-hidden">
        {/* Hero */}
        <div id="hero" className="px-8 max-w-7xl mx-auto">
          <Hero />
        </div>

        {/* Kinetic ticker */}
        <KineticTicker />

        {/* Projects */}
        <ProjectsSection />

        {/* Services */}
        <ServicesSection />

        {/* Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
