"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Touch / reduced-motion detection ── */

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/* ── Tech illustrations ── */

function FrontendIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="6" width="52" height="38" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="44" height="30" rx="2" fill="currentColor" opacity="0.08" />
      <path d="M10 18h44" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="22" cy="28" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="42" cy="28" r="2" fill="currentColor" opacity="0.6" />
      <rect x="18" y="35" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="34" y="35" width="8" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="8" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="28" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="48" y="48" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

function BackendIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <rect x="16" y="6" width="32" height="52" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="10" width="24" height="44" rx="2" fill="currentColor" opacity="0.06" />
      <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="42" r="3" fill="currentColor" opacity="0.5" />
      <path d="M44 22h8M44 32h8M44 42h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <circle cx="52" cy="22" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="52" cy="32" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="52" cy="42" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M20 52h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path d="M20 56h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

function AIIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="44" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="46" cy="44" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="52" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="29" y1="23" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="35" y1="23" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="22" y1="47" x2="30" y2="49" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="42" y1="47" x2="34" y2="49" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="32" cy="18" r="1.5" fill="currentColor" opacity="0.9" />
      <circle cx="18" cy="44" r="1.5" fill="currentColor" opacity="0.9" />
      <circle cx="46" cy="44" r="1.5" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="52" r="1.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/* ── Card data ── */

const CARDS = [
  {
    title: "Frontend",
    label: "React · Next.js · TypeScript · Tailwind",
    description:
      "Built the CyberGuard AI dashboard and KnowGraph event explorer as performant Next.js frontends with TypeScript-first architecture and Tailwind styling. Each interface handles complex data visualisation, real-time search filtering, and responsive layouts across every device.",
    Illustration: FrontendIllustration,
    accent: "#ed649e",
  },
  {
    title: "Backend & APIs",
    label: ".NET 8 · FastAPI · EF Core · PostgreSQL · Redis",
    description:
      "A .NET 8 API gateway orchestrates five Python FastAPI microservices in CyberGuard — handling vulnerability search, PDF analysis, and agentic RAG routing. KnowGraph uses Clean Architecture with MediatR, CQRS, and FluentValidation for a Neo4j-backed causal graph engine.",
    Illustration: BackendIllustration,
    accent: "#8f89ff",
  },
  {
    title: "AI & Infrastructure",
    label: "LangGraph · Ollama · Docker · OpenSearch · Langfuse",
    description:
      "Agentic RAG pipelines with LangGraph for retrieval routing, document grading, and answer generation — all powered by local LLM inference through Ollama. Docker Compose orchestrates multi-service deployments with OpenSearch hybrid search, Redis caching, and Langfuse observability tracing.",
    Illustration: AIIllustration,
    accent: "#5196fd",
  },
];

/* ── Card content ── */

interface CardContentProps {
  title: string;
  label: string;
  description: string;
  Illustration: React.ComponentType;
  accent: string;
}

function CardContent({ title, label, description, Illustration, accent }: CardContentProps) {
  return (
    <div
      className="flex flex-col min-h-[380px] sm:min-h-[420px] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-md-on-surface) 4%, transparent)",
        border: "1px solid color-mix(in srgb, var(--color-md-on-surface) 8%, transparent)",
      }}
    >
      {/* Left accent strip */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ backgroundColor: accent }}
      />

      {/* Title */}
      <h3
        className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6 pl-3"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-md-on-surface)",
        }}
      >
        {title}
      </h3>

      {/* Body: text left, illustration right */}
      <div className="flex flex-col sm:flex-row gap-6 flex-1 pl-3">
        {/* Left: description + label */}
        <div className="flex-1 flex flex-col justify-center">
          <span
            className="text-sm font-medium tracking-wide mb-3"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-primary-fixed)",
              opacity: 0.8,
            }}
          >
            {label}
          </span>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-hanken-grotesk)",
              color: "var(--color-md-on-surface-variant)",
              opacity: 0.85,
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
              backgroundColor: "color-mix(in srgb, var(--color-acid-lime) 8%, transparent)",
              color: "var(--color-md-primary-fixed)",
            }}
          >
            <Illustration />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Skills Stack Section ── */

const CARD_SCROLL_PX = 400; // scroll distance allocated per card

export function SkillsStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touch, setTouch] = useState(false);

  // Calculate explicit pixel height on mount and resize
  useEffect(() => {
    setTouch(isTouchDevice());
    const calc = () => {
      setSectionHeight(window.innerHeight + CARDS.length * CARD_SCROLL_PX);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    update();
    return () => mq.removeEventListener("change", update);
  }, []);

  // GSAP scrubbed timeline — no pin, CSS sticky handles the pinning
  useGSAP(
    () => {
      if (touch || reducedMotion || !sectionRef.current || !stickyRef.current || sectionHeight === 0) return;

      const cards = stickyRef.current.querySelectorAll<HTMLElement>("[data-card]");
      if (cards.length === 0) return;

      // Initialize all cards: absolute, centered, hidden below viewport
      gsap.set(cards, {
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        y: "100vh",
        scale: 0.88,
        opacity: 0,
      });

      // Card 0 starts visible at center
      gsap.set(cards[0], { y: 0, scale: 1, opacity: 1 });

      // ── Scrubbed timeline keyed to the outer section ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power1.inOut" },
      });

      const gap = 24; // px each previous card peeks out
      const seg = 1 / CARDS.length; // ~0.333 per card

      // Segment 1 (0 → seg): Card 1 slides up, Card 0 peeks up
      tl.to(cards[0], { y: -gap, scale: 0.94, duration: seg * 0.85 }, seg * 0.05);
      tl.to(cards[1], { y: 0, scale: 1, opacity: 1, duration: seg * 0.85 }, seg * 0.05);

      // Segment 2 (seg → seg*2): Card 2 slides up, older cards peek further
      if (cards.length > 2) {
        tl.to(cards[0], { y: -gap * 2, scale: 0.88, duration: seg * 0.85 }, seg + seg * 0.05);
        tl.to(cards[1], { y: -gap, scale: 0.94, duration: seg * 0.85 }, seg + seg * 0.05);
        tl.to(cards[2], { y: 0, scale: 1, opacity: 1, duration: seg * 0.85 }, seg + seg * 0.05);
      }

      // Fade cards out right before the section ends
      tl.to(cards, { opacity: 0, duration: 0.02 }, 0.98);

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [touch, reducedMotion, sectionHeight] },
  );

  const fullWidthBg = {
    backgroundColor: "var(--color-bg-dark)",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  };

  return (
    <>
      {/* ── Heading — scrolls normally ── */}
      <section
        id="skills"
        className="pt-16 sm:pt-20 pb-4 px-4 sm:px-6 lg:px-8"
        style={{
          ...fullWidthBg,
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

      {/* ── Touch / reduced-motion fallback ── */}
      {touch || reducedMotion ? (
        <div style={fullWidthBg} className="pb-12 sm:pb-20">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="px-4 sm:px-6 lg:px-8 py-6"
            >
              <div
                className="mx-auto w-full lg:max-w-[700px] animate-[fade-up_0.5s_ease-out_both]"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <CardContent
                  title={card.title}
                  label={card.label}
                  description={card.description}
                  Illustration={card.Illustration}
                  accent={card.accent}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Desktop: explicit pixel height + CSS sticky + overflow hidden ── */
        <section
          ref={sectionRef}
          className="relative"
          style={{
            height: sectionHeight > 0 ? `${sectionHeight}px` : "auto",
            ...fullWidthBg,
          }}
        >
          <div
            ref={stickyRef}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              zIndex: 10,
            }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                data-card={i}
                className="will-change-transform pointer-events-auto"
                style={{
                  zIndex: i,
                  width: "90%",
                  maxWidth: "700px",
                }}
              >
                <CardContent
                  title={card.title}
                  label={card.label}
                  description={card.description}
                  Illustration={card.Illustration}
                  accent={card.accent}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
