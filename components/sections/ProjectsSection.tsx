"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_ADVANCE_MS = 5000;

interface Project {
  title: string;
  role: string;
  frontendStack: string;
  backendStack: string;
  description: string[];
  url: string;
  accentColor: string; // skeleton highlight colour per project
}

const projects: Project[] = [
  {
    title: "Movie Matching\nWeb Application",
    role: "Full Stack Developer",
    frontendStack: "Next.js, TypeScript, Tailwind CSS",
    backendStack: "MongoDB, Open AI API, TMDB API",
    url: "reel-reveal.app",
    accentColor: "rgba(89,238,80,",
    description: [
      "As a full-stack developer on this project, I took ownership of both the frontend and backend development, ensuring a seamless and intuitive user experience.",
      "I built the frontend from scratch using modern frameworks and tools like Next.js, TypeScript, and Tailwind CSS, adhering to industry best practices for structure and scalability.",
      "On the backend, I implemented a secure and efficient system using MongoDB for data management and Google Authentication for user login. Additionally, I integrated the Open AI API to deliver personalised, AI-driven movie recommendations.",
    ],
  },
  {
    title: "E-Commerce\nDashboard",
    role: "Frontend Developer",
    frontendStack: "React, Redux, Styled Components",
    backendStack: "Node.js, Express, PostgreSQL",
    url: "dashboard.storefront.io",
    accentColor: "rgba(99,179,237,",
    description: [
      "Designed and built a high-performance merchant dashboard handling real-time inventory, order management, and sales analytics for an e-commerce platform.",
      "Leveraged React and Redux for predictable state management across complex data flows, with Styled Components enabling a fully themeable UI system.",
      "The backend REST API was built with Node.js and Express, backed by a PostgreSQL database optimised with indexed queries to support sub-100ms response times at scale.",
    ],
  },
  {
    title: "DevOps Monitoring\nPlatform",
    role: "Full Stack Developer",
    frontendStack: "Next.js, TypeScript, Recharts",
    backendStack: "Docker, Prometheus, Node.js",
    url: "ops.infrawatch.dev",
    accentColor: "rgba(246,173,85,",
    description: [
      "Built an internal DevOps observability platform that aggregates metrics from Prometheus and surfaces them through a real-time dashboard built with Next.js and Recharts.",
      "Containerised the entire stack with Docker Compose, enabling one-command local and production deployments with isolated service boundaries.",
      "Implemented alerting pipelines and threshold-based notification triggers, giving engineering teams instant visibility into infrastructure degradation before it impacts users.",
    ],
  },
];

// ─── Desktop browser mockup ───────────────────────────────────────────
function DesktopMockup({ url, accent }: { url: string; accent: string }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#111418",
        border: "1px solid rgba(255,255,255,0.09)",
        aspectRatio: "16 / 10",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <div
          className="ml-3 rounded px-3 py-0.5 text-[10px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.25)",
            width: "40%",
          }}
        >
          {url}
        </div>
      </div>
      {/* Skeleton */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: `${accent}0.3)` }} />
          <div className="h-3 w-32 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        </div>
        <div
          className="h-28 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${accent}0.1) 0%, rgba(255,255,255,0.03) 100%)`,
          }}
        />
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────
export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % projects.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, activeIndex]); // restart interval on each index change so progress bar syncs

  const project = projects[activeIndex];

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "#0c0f10",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ── Headline ── */}
        <div style={{ containerType: "inline-size" }}>
          <h2
            className="font-black leading-[0.9] tracking-tighter uppercase mb-20 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#ffffff",
              fontSize: "4.6cqw",
            }}
          >
            Selected Projects
          </h2>
        </div>

        {/* ── Animated project content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* ── Left: meta ── */}
              <div>
                {/* Counter + arrows */}
                <div className="flex items-center gap-4 mb-3">
                  <button
                    onClick={goPrev}
                    aria-label="Previous project"
                    className="transition-opacity duration-150 hover:opacity-100"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    ←
                  </button>

                  <span
                    className="font-mono font-bold"
                    style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem" }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>
                      {" / "}
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </span>

                  <button
                    onClick={goNext}
                    aria-label="Next project"
                    className="transition-opacity duration-150 hover:opacity-100"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    →
                  </button>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full rounded-full mb-10 overflow-hidden"
                  style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    key={activeIndex}
                    className={`h-full rounded-full project-progress-bar${isPaused ? " paused" : ""}`}
                    style={{ backgroundColor: "#59ee50" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-black leading-[1.05] tracking-tight mb-10 whitespace-pre-line"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#ffffff",
                    fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
                  }}
                >
                  {project.title}
                </h3>

                {/* Role */}
                <div className="mb-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-1.5 font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    Role
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#59ee50" }}>
                    {project.role}
                  </p>
                </div>

                {/* Frontend stack */}
                <div className="mb-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-1.5 font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    Frontend Stack
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {project.frontendStack}
                  </p>
                </div>

                {/* Backend */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-1.5 font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    Backend
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {project.backendStack}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-10 space-y-4 max-w-lg">
                  {project.description.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-[1.8]"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Right: mockup ── */}
              <div>
                <DesktopMockup url={project.url} accent={project.accentColor} />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Project strip ── */}
        <div
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}
        >
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="text-sm font-semibold tracking-wide transition-all duration-200 pb-0.5 text-left"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: i === activeIndex ? "#59ee50" : "rgba(255,255,255,0.3)",
                borderBottom: i === activeIndex
                  ? "1px solid #59ee50"
                  : "1px solid transparent",
              }}
            >
              {p.title.replace("\n", " ")}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
