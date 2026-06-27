import { GithubCard } from "@/components/sections/GithubCard";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
import { getContributions } from "@/lib/github";
import { siteConfig } from "@/data/site-config";

export async function Hero() {
  let weeks = [] as { contributionDays: { contributionCount: number; date: string }[] }[];
  try {
    const data = await getContributions(siteConfig.githubUsername);
    weeks = (data?.weeks ?? []).slice(-26);
  } catch (err) {
    console.error("GitHub fetch failed:", err);
  }

  return (
    <section className="space-y-8 w-full" style={{ containerType: "inline-size" }}>
      <HeroHeadline />

      {/* ── Below headline: 2-col split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: tech badge + description + CTA */}
        <div className="space-y-6">
          {/* Tech stack badge */}
          <div
            className="inline-block font-mono text-sm font-semibold tracking-wide"
            style={{ color: "var(--color-md-on-surface)" }}
          >
            Next.js &middot; .NET &middot; TypeScript &middot; Python &middot; Docker
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed max-w-md"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            A full stack developer building AI-integrated systems and
            microservice architectures. My work spans Next.js frontends,
            .NET API gateways, agentic RAG pipelines, and containerised
            multi-service deployments with Docker.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/cv"
              className="hero-btn-primary px-8 py-3 rounded-full text-base font-black transition-all duration-200 inline-block"
            >
              View CV
            </a>
            <a
              href="#projects"
              className="hero-btn-secondary px-8 py-3 text-base font-black transition-all duration-200 inline-block"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Right: GitHub contributions card */}
        <div>
          <GithubCard weeks={weeks} username={siteConfig.githubUsername} />
        </div>
      </div>
    </section>
  );
}
