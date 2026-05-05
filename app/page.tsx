import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FloatingIcons } from "@/components/sections/FloatingIcons";
import { KineticTicker } from "@/components/sections/KineticTicker";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        {/* ── Hero — full viewport height, vertically centered ── */}
        <section
          id="hero"
          style={{
            position: "relative",
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background: floating tech icons — absolute, behind content */}
          <FloatingIcons />

          {/* Foreground: hero content — z-10 so it sits above the icons */}
          <div className="relative z-10 pt-24 pb-8 px-8 max-w-7xl mx-auto w-full">
            <Hero />
          </div>
          <div className="relative z-10">
            <KineticTicker />
          </div>
        </section>

        {/* ── Projects ── */}
        <ProjectsSection />

        {/* ── Services ── */}
        <ServicesSection />

        {/* ── Contact ── */}
        <ContactSection />

        <Footer />
      </main>
    </>
  );
}
