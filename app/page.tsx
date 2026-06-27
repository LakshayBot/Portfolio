// Force this route to be rendered dynamically at request time (not statically
// at build time) so the Cloudflare Workers env bindings — including
// GITHUB_TOKEN — are available when GithubCard fetches contribution data.
export const dynamic = "force-dynamic";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { KineticTicker } from "@/components/sections/KineticTicker";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsStack } from "@/components/sections/SkillsStack";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageLine } from "@/components/sections/PageLine";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageLine>
        <main className="overflow-x-hidden">
          {/* ── Hero — full viewport height ── */}
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

          {/* ── Skills ── */}
          <SkillsStack />

          {/* ── Contact ── */}
          <ContactSection />

          <Footer />
        </main>
      </PageLine>
    </>
  );
}
