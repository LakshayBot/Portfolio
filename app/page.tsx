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
import { SkillsGrid } from "@/components/sections/SkillsGrid";
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
          <section
            id="skills"
            className="py-24 px-8"
            style={{
              backgroundColor: "var(--color-bg-dark)",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div style={{ containerType: "inline-size" }}>
                <h2
                  className="font-black leading-[0.9] tracking-tighter uppercase mb-2 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--color-md-on-surface)",
                    fontSize: "4.6cqw",
                  }}
                >
                  <span className="block">What I</span>
                  <span className="block" style={{ color: "var(--color-md-primary-fixed)" }}>
                    Work With.
                  </span>
                </h2>
              </div>
              <SkillsGrid />
            </div>
          </section>

          {/* ── Contact ── */}
          <ContactSection />

          <Footer />
        </main>
      </PageLine>
    </>
  );
}
