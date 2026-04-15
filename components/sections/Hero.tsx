import { GithubCard } from "@/components/sections/GithubCard";

export async function Hero() {
  return (
    <section className="space-y-10" style={{ containerType: "inline-size" }}>
      {/*
        ── Full-width headline ──
        Using cqw (container query width units) so font-size is relative to
        this section's width rather than the viewport.
        Space Grotesk Black, uppercase, tracking-tighter (-0.05em).
        "FULL STACK DEVELOPER" char count = 20 (including spaces).
        Empirical: 4.6cqw fills the container for this string at this weight/tracking.
        "LAKSH MALHOTRA" = 14 chars → same cqw → shorter line is fine (matches reference).
      */}
      <h1
        className="font-black leading-[0.9] tracking-tighter uppercase w-full"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-md-on-surface)",
          fontSize: "4.6cqw",
        }}
      >
        <span className="block whitespace-nowrap">Full Stack Developer</span>
        <span className="block whitespace-nowrap">Lakshay Malhotra</span>
      </h1>

      {/* ── Below headline: 2-col split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: tech badge + description + CTA */}
        <div className="space-y-6">
          {/* Tech stack badge */}
          <div
            className="inline-block font-mono text-sm font-semibold tracking-wide"
            style={{ color: "var(--color-md-on-surface)" }}
          >
            &lt;React.js Next.js Redux.js Node.js TypeScript&gt;
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed max-w-md"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            A full stack developer with experience in both team projects and
            individual work, I focus on building scalable, efficient solutions.
            With a background in engineering, I bring a structured,
            problem-solving mindset to development.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary px-8 py-3 rounded-full text-base font-black transition-all duration-200 inline-block"
            >
              Download CV
            </a>
            <a
              href="#projects"
              className="hero-btn-secondary px-8 py-3 text-base font-black transition-all duration-200 border-b-2 inline-block"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Right: GitHub contributions card */}
        <div>
          <GithubCard />
        </div>
      </div>
    </section>
  );
}
