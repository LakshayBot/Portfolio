"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CYCLE_INTERVAL = 4000; // ms between flips

/* ── SVG icons reused across card faces ── */

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Card face data ── */

interface CardFace {
  title: string;
  subtitle: string;
  label: string;
  href: string;
  external?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}

const CARDS: CardFace[] = [
  {
    title: "LakshayBot",
    subtitle: "Open source contributor. Building tools, APIs & AI systems.",
    label: "GitHub",
    href: "https://github.com/LakshayBot",
    external: true,
    Icon: GitHubIcon,
  },
  {
    title: "Let's Connect",
    subtitle: "Full Stack Developer — .NET, Next.js, Python & TypeScript.",
    label: "LinkedIn",
    href: "https://linkedin.com/in/lakshaymalhotra",
    external: true,
    Icon: LinkedInIcon,
  },
  {
    title: "lakshay@lakshay.dev",
    subtitle: "Open for freelance projects & full-time opportunities.",
    label: "Say Hello",
    href: "mailto:lakshay@lakshay.dev",
    external: false,
    Icon: MailIcon,
  },
];

/* ── 3D Flip Card ── */

function KineticFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      if (next) {
        // About to show back face → advance back idx
        setBackIdx((i) => (i + 2) % CARDS.length);
      } else {
        // About to show front face → advance front idx
        setFrontIdx((i) => (i + 2) % CARDS.length);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, CYCLE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, advance]);

  const front = CARDS[frontIdx];
  const back = CARDS[backIdx];

  const CardFaceContent = ({
    face,
    isBack,
  }: {
    face: CardFace;
    isBack: boolean;
  }) => (
    <a
      href={face.href}
      target={face.external ? "_blank" : undefined}
      rel={face.external ? "noopener noreferrer" : undefined}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 p-6 group/card cursor-pointer select-none"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
        backgroundColor: "var(--color-bg-dark)",
        border: "1px solid rgba(195,244,0,0.08)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/card:scale-110 group-hover/card:shadow-lg"
        style={{
          backgroundColor: "rgba(195,244,0,0.06)",
          color: "var(--color-md-primary-fixed)",
          boxShadow: "0 0 0 1px rgba(195,244,0,0.1)",
        }}
      >
        <face.Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      {/* Title */}
      <h3
        className="text-base md:text-lg font-bold tracking-tight text-center transition-all duration-300"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-bone-white)",
        }}
      >
        {face.title}
      </h3>

      {/* Subtitle */}
      <p
        className="text-xs text-center leading-relaxed max-w-[200px]"
        style={{
          fontFamily: "var(--font-hanken-grotesk)",
          color: "var(--color-md-on-surface-variant)",
          opacity: 0.7,
        }}
      >
        {face.subtitle}
      </p>

      {/* Label + arrow */}
      <div
        className="flex items-center gap-1.5 mt-1 transition-all duration-300 group-hover/card:gap-2.5"
        style={{ color: "var(--color-md-primary-fixed)" }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {face.label}
        </span>
        <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
      </div>
    </a>
  );

  return (
    <div
      className="perspective-container shrink-0 w-40 h-56 md:w-56 md:h-72 lg:w-72 lg:h-[24rem] mx-2 md:mx-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="w-full h-full"
        style={{
          transform: "rotateX(25deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative w-full h-full transition-transform duration-[800ms]"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <CardFaceContent face={front} isBack={false} />
          <CardFaceContent face={back} isBack />
        </div>
      </div>
    </div>
  );
}

/* ── Contact Section ── */

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* ── "get in / touch" split with flip card ── */}
        <div className="flex items-center justify-center gap-2 md:gap-8 lg:gap-12 w-full">
          {/* Left: "get in" */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none shrink-0 select-none"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-bone-white)",
              letterSpacing: "-0.05em",
            }}
          >
            get in
          </h1>

          {/* Center: 3D flip card */}
          <KineticFlipCard />

          {/* Right: "touch" */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none shrink-0 select-none"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-bone-white)",
              letterSpacing: "-0.05em",
            }}
          >
            touch
          </h1>
        </div>
      </div>
    </section>
  );
}
