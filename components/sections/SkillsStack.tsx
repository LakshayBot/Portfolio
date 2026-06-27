"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

/* ── Tech illustrations (inline SVGs) ── */

function FrontendIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="6" width="52" height="38" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="44" height="30" rx="2" fill="currentColor" opacity="0.06" />
      <path d="M10 18h44" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="22" cy="28" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="28" r="2" fill="currentColor" opacity="0.5" />
      <rect x="18" y="35" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="34" y="35" width="8" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="8" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M16 52v12M8 56h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <rect x="28" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M36 52v12M28 56h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <rect x="48" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M56 52v12M48 56h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function BackendIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="16" y="6" width="32" height="52" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="10" width="24" height="44" rx="2" fill="currentColor" opacity="0.04" />
      <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="32" cy="42" r="3" fill="currentColor" opacity="0.4" />
      <path d="M44 22h8M44 32h8M44 42h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="52" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="52" cy="32" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="52" cy="42" r="1.5" fill="currentColor" opacity="0.4" />
      <path d="M20 52h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M20 56h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function AIIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="44" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="46" cy="44" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="52" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="29" y1="23" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="35" y1="23" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="22" y1="47" x2="30" y2="49" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="42" y1="47" x2="34" y2="49" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="18" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="18" cy="44" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="46" cy="44" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="32" cy="52" r="1.5" fill="currentColor" opacity="0.8" />
      <rect x="26" y="10" width="12" height="15" rx="3" fill="currentColor" opacity="0.04" />
      <path d="M28 12h4M28 15h6M28 18h3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

/* ── Card data ── */

const CARDS = [
  {
    title: "Frontend",
    tech: "React · Next.js · TypeScript · Tailwind",
    description:
      "Built the CyberGuard AI dashboard and KnowGraph event explorer as performant Next.js frontends with TypeScript-first architecture and Tailwind styling. Each interface handles complex data visualisation, real-time search filtering, and responsive layouts across every device.",
    Illustration: FrontendIllustration,
  },
  {
    title: "Backend & APIs",
    tech: ".NET 8 · FastAPI · EF Core · PostgreSQL · Redis",
    description:
      "A .NET 8 API gateway orchestrates five Python FastAPI microservices in CyberGuard — handling vulnerability search, PDF analysis, and agentic RAG routing. KnowGraph uses Clean Architecture with MediatR, CQRS, and FluentValidation for a Neo4j-backed causal graph engine.",
    Illustration: BackendIllustration,
  },
  {
    title: "AI & Infrastructure",
    tech: "LangGraph · Ollama · Docker · OpenSearch · Langfuse",
    description:
      "Agentic RAG pipelines with LangGraph for retrieval routing, document grading, and answer generation — all powered by local LLM inference through Ollama. Docker Compose orchestrates multi-service deployments with OpenSearch hybrid search, Redis caching, and Langfuse observability tracing.",
    Illustration: AIIllustration,
  },
];

/* ── Skills Stack Section ── */

export function SkillsStack() {
  return (
    <section
      id="skills"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        paddingTop: "5rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 sm:mb-16" style={{ containerType: "inline-size" }}>
          <h2
            className="font-black leading-[0.9] tracking-tighter uppercase whitespace-nowrap"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
              fontSize: "clamp(2rem, 4.6cqw, 6rem)",
            }}
          >
            <span className="block">What I</span>
            <span className="block" style={{ color: "var(--color-md-primary-fixed)" }}>
              Work With.
            </span>
          </h2>
        </div>

        {/* Stacking cards */}
        <ContainerScroll className="min-h-[220vh] sm:min-h-[240vh]">
          {CARDS.map((card, i) => (
            <CardSticky
              key={card.title}
              index={i}
              incrementY={20}
              incrementZ={6}
              className="rounded-2xl mx-auto w-[calc(100%-1rem)] sm:w-[88%] md:w-[85%] lg:max-w-2xl"
            >
              <div
                className="p-5 sm:p-7 md:p-8 rounded-2xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(195,244,0,0.06)",
                  boxShadow: "0 20px 50px -15px rgba(0,0,0,0.5)",
                }}
              >
                {/* Illustration + title row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
                  {/* Illustration */}
                  <div
                    className="shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(195,244,0,0.04)",
                      color: "var(--color-md-primary-fixed)",
                      border: "1px solid rgba(195,244,0,0.08)",
                    }}
                  >
                    <card.Illustration />
                  </div>

                  {/* Title + tech badge */}
                  <div className="min-w-0">
                    <h3
                      className="text-xl sm:text-2xl font-bold tracking-tight mb-2"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color: "var(--color-bone-white)",
                      }}
                    >
                      {card.title}
                    </h3>
                    <span
                      className="text-xs sm:text-sm font-medium tracking-wide"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color: "var(--color-md-primary-fixed)",
                        opacity: 0.8,
                      }}
                    >
                      {card.tech}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--font-hanken-grotesk)",
                    color: "var(--color-md-on-surface-variant)",
                    opacity: 0.85,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
