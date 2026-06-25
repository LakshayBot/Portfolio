"use client";

import { useEffect, useState } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        flexShrink: 0,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
      }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const services = [
  {
    number: 1,
    title: "Full Stack Development",
    description:
      "Next.js and React frontends, .NET 8 API gateways, and Python backends with TypeScript end to end.",
  },
  {
    number: 2,
    title: "AI & RAG Systems",
    description:
      "Agentic RAG pipelines, LangChain and LangGraph workflows, local LLM inference via Ollama, and semantic vector search.",
  },
  {
    number: 3,
    title: "Backend & API Architecture",
    description:
      "Microservice design, REST API gateways, JWT and OAuth auth, Hangfire background jobs, PostgreSQL with EF Core, and Redis caching.",
  },
  {
    number: 4,
    title: "DevOps & Infrastructure",
    description:
      "Docker Compose multi-service deployments, OpenSearch hybrid retrieval, and observability with Langfuse tracing and ClickHouse.",
  },
];

export function ServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  return (
    <section
      id="services"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundColor: "var(--color-bg-dark)",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* ── Left Side: Headline + Accordion ── */}
          <div className="w-full md:w-1/2 flex flex-col space-y-10">
            {/* Headline group */}
            <div className="space-y-5">
              <h2
                className="font-black leading-[0.9] tracking-tighter uppercase"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "var(--color-md-on-surface)",
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                }}
              >
                What I Can Do
                <span style={{ color: "var(--color-md-primary-fixed)" }}>.</span>
              </h2>
              <p
                className="text-lg md:text-xl max-w-md leading-relaxed"
                style={{
                  color: "var(--color-md-on-surface-variant)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                I build systems end to end, from the interface down to the
                database and everything in between.
              </p>
            </div>

            {/* ── Accordion list ── */}
            <div
              className="space-y-0"
              style={{
                borderTop: `1px solid var(--color-md-surface-container-highest)`,
              }}
            >
              {services.map((service) => {
                const isOpen = expanded === service.number;
                const isHovered = hovered === service.number;
                return (
                  <div
                    key={service.number}
                    className="cursor-pointer transition-colors duration-300"
                    style={{
                      borderBottom: `1px solid var(--color-md-surface-container-highest)`,
                      backgroundColor: isHovered
                        ? "var(--color-md-surface-container-low)"
                        : "transparent",
                    }}
                    onClick={() =>
                      setExpanded(isOpen ? null : service.number)
                    }
                    onMouseEnter={() => setHovered(service.number)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Header row */}
                    <div className="flex justify-between items-center py-5 px-4">
                      <h3
                        className="font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          color: isOpen
                            ? "var(--color-md-primary-fixed)"
                            : "var(--color-md-on-surface)",
                        }}
                      >
                        {service.number}. {service.title}
                      </h3>
                      <div
                        style={{
                          color: isOpen
                            ? "var(--color-md-primary-fixed)"
                            : "var(--color-md-on-surface-variant)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        <ChevronIcon open={isOpen} />
                      </div>
                    </div>

                    {/* Expandable description */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? "120px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p
                        className="px-4 pb-5 text-sm leading-relaxed"
                        style={{
                          color: "var(--color-md-on-surface-variant)",
                          fontFamily: "var(--font-space-grotesk)",
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Side: Terminal window ── */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[500px] md:h-[600px]">
            {/* Ambient backdrop glow */}
            <div
              className="absolute inset-0 blur-3xl rounded-full opacity-20"
              style={{
                backgroundColor: "var(--color-md-primary-container)",
                transform: "translate(-20%, 20%) scale(1.4)",
              }}
            />

            {/* Terminal card */}
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden"
              style={{
                transform: touch ? "rotate(2deg)" : "rotate(5deg)",
                backgroundColor: "var(--color-bg-dark)",
                border: "1px solid rgba(195,244,0,0.1)",
                boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4)",
                transition: touch ? "none" : "transform 700ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (touch) return;
                e.currentTarget.style.transform = "rotate(2deg)";
              }}
              onMouseLeave={(e) => {
                if (touch) return;
                e.currentTarget.style.transform = "rotate(5deg)";
              }}
            >
              <div className="w-full h-full flex flex-col p-5">
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                  <span
                    className="ml-2 text-[10px] font-mono"
                    style={{ color: "color-mix(in srgb, var(--color-md-on-surface) 25%, transparent)" }}
                  >
                    lakshay@dev: ~
                  </span>
                </div>

                {/* Terminal output */}
                <div className="flex-1 space-y-2.5 overflow-hidden">
                  {[
                    { prompt: "$", text: "whoami --skills", accent: true },
                    { text: "full stack developer", indent: true, muted: true },
                    { text: "", spacer: true },
                    { prompt: "$", text: "cat stack.json", accent: true },
                    { text: "frontend:  Next.js, React, Tailwind", indent: true, muted: true },
                    { text: "backend:   .NET 8, FastAPI, EF Core", indent: true, muted: true },
                    { text: "ai:        LangChain, Ollama, RAG", indent: true, muted: true },
                    { text: "infra:     Docker, Redis, Postgres", indent: true, muted: true },
                    { text: "", spacer: true },
                    { prompt: "$", text: "build --ship --repeat", accent: true },
                    { text: "status: ready", indent: true, green: true },
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {line.prompt && (
                        <span
                          className="text-xs font-mono mt-0.5 shrink-0"
                          style={{ color: "var(--color-md-primary-fixed)" }}
                        >
                          {line.prompt}
                        </span>
                      )}
                      {line.spacer ? (
                        <span className="text-xs" style={{ lineHeight: "0.5" }}>&nbsp;</span>
                      ) : (
                        <span
                          className="text-xs font-mono leading-relaxed"
                          style={{
                            color: line.accent
                              ? "var(--color-md-primary-fixed)"
                              : line.green
                                ? "#28c840"
                                : "color-mix(in srgb, var(--color-md-on-surface) 40%, transparent)",
                            paddingLeft: line.indent ? "0.5rem" : 0,
                          }}
                        >
                          {line.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className="text-sm font-mono"
                    style={{ color: "var(--color-md-primary-fixed)" }}
                  >
                    $
                  </span>
                  <span
                    className="inline-block w-2 h-4"
                    style={{
                      backgroundColor: "var(--color-md-primary-fixed)",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Marquee watermark overlay — skipped on touch devices */}
            {!touch && (
              <div className="absolute bottom-0 right-0 overflow-hidden whitespace-nowrap pointer-events-none w-full mix-blend-overlay opacity-[0.07]">
                <div
                  className="inline-block font-black text-7xl md:text-8xl tracking-tighter animate-marquee"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--color-md-on-surface)",
                  }}
                >
                  BUILD. SHIP. REPEAT.&nbsp;&nbsp;
                  BUILD. SHIP. REPEAT.&nbsp;&nbsp;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
