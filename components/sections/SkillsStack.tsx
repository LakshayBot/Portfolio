"use client";

import { useRef, useEffect } from "react";
import { useTransform, motion, useMotionValue, type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Tech illustrations ── */

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
      <rect x="28" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <rect x="48" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
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
    color: "#ed649e",
  },
  {
    title: "Backend & APIs",
    tech: ".NET 8 · FastAPI · EF Core · PostgreSQL · Redis",
    description:
      "A .NET 8 API gateway orchestrates five Python FastAPI microservices in CyberGuard — handling vulnerability search, PDF analysis, and agentic RAG routing. KnowGraph uses Clean Architecture with MediatR, CQRS, and FluentValidation for a Neo4j-backed causal graph engine.",
    Illustration: BackendIllustration,
    color: "#8f89ff",
  },
  {
    title: "AI & Infrastructure",
    tech: "LangGraph · Ollama · Docker · OpenSearch · Langfuse",
    description:
      "Agentic RAG pipelines with LangGraph for retrieval routing, document grading, and answer generation — all powered by local LLM inference through Ollama. Docker Compose orchestrates multi-service deployments with OpenSearch hybrid search, Redis caching, and Langfuse observability tracing.",
    Illustration: AIIllustration,
    color: "#5196fd",
  },
];

/* ── Individual card ── */

interface SkillCardProps {
  i: number;
  title: string;
  description: string;
  tech: string;
  Illustration: React.ComponentType;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

function SkillCard({ i, title, description, tech, Illustration, color, progress, range, targetScale, containerRef }: SkillCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(-25% - 5vh + ${i * 50}px)`,
          backgroundColor: color,
        }}
        className="flex flex-col relative w-[90%] sm:w-[75%] md:w-[65%] lg:max-w-[700px] min-h-[380px] sm:min-h-[420px] rounded-2xl p-6 sm:p-10 origin-top shadow-2xl"
      >
        {/* Title — centered at top */}
        <h3
          className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </h3>

        {/* Body: text left, illustration right */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {/* Left: description + tech */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              className="text-sm font-medium tracking-wide mb-3 opacity-90"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#fff",
              }}
            >
              {tech}
            </span>
            <p
              className="text-sm sm:text-base leading-relaxed opacity-90"
              style={{
                fontFamily: "var(--font-hanken-grotesk)",
                color: "#fff",
              }}
            >
              {description}
            </p>
          </div>

          {/* Right: illustration */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              <Illustration />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Skills Stack Section ── */

export function SkillsStack() {
  const firstCardRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const first = firstCardRef.current;
    if (!first) return;

    const trigger = ScrollTrigger.create({
      trigger: first,
      start: "top top",
      end: "bottom+=50% top",
      scrub: true,
      onUpdate: (self) => {
        progress.set(self.progress);
      },
    });

    return () => trigger.kill();
  }, [progress]);

  return (
    <>
      {/* Heading */}
      <section
        id="skills"
        className="pt-16 sm:pt-20 pb-4 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: "var(--color-bg-dark)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          containerType: "inline-size",
        }}
      >
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
      </section>

      {/* Stacking cards — NO wrapper parent so sticky is relative to viewport */}
      {CARDS.map((card, i) => {
        const targetScale = 1 - (CARDS.length - i) * 0.06;
        return (
          <SkillCard
            key={card.title}
            i={i}
            title={card.title}
            description={card.description}
            tech={card.tech}
            Illustration={card.Illustration}
            color={card.color}
            progress={progress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            containerRef={i === 0 ? firstCardRef : undefined}
          />
        );
      })}

      {/* Bottom spacer so last card can scroll out */}
      <div
        className="h-[50vh]"
        style={{
          backgroundColor: "var(--color-bg-dark)",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      />
    </>
  );
}
