import { GithubCard } from "@/components/sections/GithubCard";
import { ArchitectureCard } from "@/components/sections/ArchitectureCard";

export async function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* ── Left: Branding & Text ── */}
      <div className="lg:col-span-7 space-y-8">
        {/* Available tag */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="w-12 h-[2px]"
              style={{ backgroundColor: "var(--color-md-primary)" }}
            />
            <p
              className="text-sm uppercase tracking-[0.2em] font-bold"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-primary)",
              }}
            >
              Available for hire
            </p>
          </div>

          {/* Headline */}
          <h1
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            Full Stack <br />
            Developer <br />
            <span style={{ color: "var(--color-md-primary-dim)" }}>
              Thomas Jackson
            </span>
          </h1>
        </div>

        {/* Tech stack badge */}
        <div
          className="p-3 rounded inline-block font-mono text-sm tracking-wider"
          style={{
            backgroundColor: "var(--color-md-surface-container-low)",
            color: "var(--color-md-on-surface-variant)",
          }}
        >
          &lt;React.js Next.js Redux.js Node.js TypeScript&gt;
        </div>

        {/* Description */}
        <p
          className="text-xl max-w-xl leading-relaxed"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          A full stack developer with experience in both team projects and
          individual work, I focus on building scalable, efficient solutions.
          With a background in engineering, I bring a structured,
          problem-solving mindset to development.
        </p>

        {/* CTAs — pure CSS hover via Tailwind + custom props */}
        <div className="pt-4 flex flex-wrap gap-4">
          <button className="hero-btn-primary px-10 py-4 rounded-full text-lg font-black shadow-sm transition-all duration-200">
            Download CV
          </button>
          <button className="hero-btn-secondary px-10 py-4 text-lg font-black transition-all duration-200 border-b-2">
            View Projects
          </button>
        </div>
      </div>

      {/* ── Right: Cards ── */}
      <div className="lg:col-span-5 relative space-y-6">
        {/* GitHub heatmap — async RSC */}
        <GithubCard />
        {/* Architecture grade card */}
        <ArchitectureCard />
      </div>
    </section>
  );
}
