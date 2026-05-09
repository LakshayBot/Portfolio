"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Project {
  title: string;
  role: string;
  tags: string[];
  description: string[];
  url: string;
  accentColor: string;
  accentBg: string;
  mockupUrl: string;
}

const projects: Project[] = [
  {
    title: "CyberGuard AI",
    role: "Full Stack Developer",
    tags: [".NET 8", "FastAPI", "LangGraph", "OpenSearch", "Docker"],
    url: "github.com/lakshaybot/cyberguard-ai",
    accentColor: "#59ee50",
    accentBg: "rgba(89,238,80,",
    mockupUrl: "github.com/lakshaybot/cyberguard-ai",
    description: [
      "An agentic RAG platform for security advisory intelligence — combining a .NET 8 API gateway with five Python FastAPI microservices for vulnerability search, PDF analysis, and operational monitoring.",
      "Built hybrid retrieval over GitHub Security Advisories using OpenSearch BM25 + vector search with Jina AI embeddings, enabling natural-language Q&A and agentic query rewriting via LangGraph workflows.",
      "Orchestrated the full stack with Docker Compose: .NET gateway, LangChain/LangGraph AI services, Hangfire background jobs, Langfuse observability tracing, PostgreSQL, Redis, and OpenSearch — with JWT and OAuth authentication.",
    ],
  },
  {
    title: "Reel Reveal",
    role: "Full Stack Developer",
    tags: ["Next.js", "TypeScript", "MongoDB", "OpenAI API", "TMDB API"],
    url: "reel-reveal.app",
    accentColor: "#63B3ED",
    accentBg: "rgba(99,179,237,",
    mockupUrl: "reel-reveal.app",
    description: [
      "A movie matching web application that delivers personalised film recommendations — built end-to-end with Next.js, TypeScript, and Tailwind CSS on the frontend.",
      "Integrated the OpenAI API to generate AI-driven recommendations tailored to each user's taste, and the TMDB API for rich movie metadata, trailers, and cast information.",
      "Implemented secure user authentication with Google OAuth via NextAuth.js and MongoDB for persistent user profiles, watchlists, and preference history.",
    ],
  },
];

// ─── Browser skeleton mockup ──────────────────────────────────────────
function DesktopMockup({ url, accentBg }: { url: string; accentBg: string }) {
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
      {/* Skeleton body */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: `${accentBg}0.3)` }} />
          <div className="h-3 w-32 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        </div>
        <div
          className="h-28 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${accentBg}0.1) 0%, rgba(255,255,255,0.03) 100%)`,
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

// ─── Arrow icon ───────────────────────────────────────────────────────
function ArrowIcon({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4 16L16 4M16 4H7M16 4V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// ─── Single project row ───────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* ── Collapsed header row ── */}
      <button
        className="w-full text-left"
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6 py-7 group">

          {/* Index number */}
          <span
            className="font-mono font-bold shrink-0 w-8 tabular-nums"
            style={{
              fontSize: "0.8rem",
              color: isOpen ? project.accentColor : "rgba(255,255,255,0.2)",
              transition: "color 0.2s ease",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title + role */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-black tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                color: isOpen || hovered ? "#ffffff" : "rgba(255,255,255,0.75)",
                transition: "color 0.2s ease",
              }}
            >
              {project.title}
            </h3>
            <p
              className="mt-1.5 text-sm font-medium"
              style={{
                color: isOpen ? project.accentColor : "rgba(255,255,255,0.3)",
                fontFamily: "var(--font-space-grotesk)",
                transition: "color 0.2s ease",
              }}
            >
              {project.role}
            </p>
          </div>

          {/* Tags — hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 shrink-0 flex-wrap justify-end max-w-sm">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: isOpen
                    ? `${project.accentBg}0.1)`
                    : "rgba(255,255,255,0.05)",
                  color: isOpen ? project.accentColor : "rgba(255,255,255,0.35)",
                  border: `1px solid ${isOpen ? project.accentColor + "33" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div
            style={{
              color: isOpen ? project.accentColor : "rgba(255,255,255,0.3)",
              transition: "color 0.2s ease, transform 0.3s ease",
              transform: isOpen ? "rotate(0deg)" : "rotate(45deg)",
            }}
          >
            <ArrowIcon visible={hovered || isOpen} />
          </div>
        </div>
      </button>

      {/* ── Expanded detail panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Left: description */}
              <div className="space-y-4">
                {/* Tags on mobile */}
                <div className="flex md:hidden flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${project.accentBg}0.1)`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}33`,
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.description.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-[1.85]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {para}
                  </p>
                ))}

                {/* Visit link */}
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-opacity duration-150 hover:opacity-70"
                  style={{
                    color: project.accentColor,
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  View Project
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 16L16 4M16 4H7M16 4V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* Right: mockup */}
              <DesktopMockup url={project.url} accentBg={project.accentBg} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "#0c0f10",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 w-full">

        {/* Headline */}
        <div style={{ containerType: "inline-size" }}>
          <h2
            className="font-black leading-[0.9] tracking-tighter uppercase mb-16 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#ffffff",
              fontSize: "4.6cqw",
            }}
          >
            Selected Projects
          </h2>
        </div>

        {/* Project rows */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

      </div>
    </section>
  );
}
