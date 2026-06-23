"use client";

import { useEffect, useState } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

const services = [
  {
    number: 1,
    title: "Full Stack Development",
    description:
      "End-to-end application delivery — from Next.js and React frontends to .NET 8 API gateways and Python backends, with TypeScript throughout.",
  },
  {
    number: 2,
    title: "AI & RAG Systems",
    description:
      "Agentic RAG pipelines, LangChain and LangGraph workflows, local LLM integration via Ollama, and semantic search with vector embeddings.",
  },
  {
    number: 3,
    title: "Backend & API Architecture",
    description:
      "Microservice design, REST API gateways, JWT and OAuth authentication, Hangfire background jobs, PostgreSQL with EF Core, and Redis caching.",
  },
  {
    number: 4,
    title: "DevOps & Infrastructure",
    description:
      "Docker Compose multi-service deployments, OpenSearch hybrid retrieval, and observability pipelines with Langfuse tracing and ClickHouse.",
  },
];

export function ServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
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
        backgroundColor: "var(--color-md-background)",
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
                What I Can Do For You
                <span style={{ color: "var(--color-md-primary)" }}>.</span>
              </h2>
              <p
                className="text-lg md:text-xl max-w-md leading-relaxed"
                style={{ color: "var(--color-md-on-surface-variant)" }}
              >
                As a kinetic architect, I build systems that connect deeply —
                from pixel-perfect interfaces to distributed backend
                infrastructure.
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
                return (
                  <div
                    key={service.number}
                    className="cursor-pointer transition-colors duration-300"
                    style={{
                      borderBottom: `1px solid var(--color-md-surface-container-highest)`,
                    }}
                    onClick={() =>
                      setExpanded(isOpen ? null : service.number)
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-md-surface-container-low)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {/* Header row */}
                    <div className="flex justify-between items-center py-5 px-4">
                      <h3
                        className="font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          color: isOpen
                            ? "var(--color-md-primary)"
                            : "var(--color-md-on-surface)",
                        }}
                      >
                        {service.number}. {service.title}
                      </h3>
                      <span
                        className="material-symbols-outlined transition-all duration-300"
                        style={{
                          fontSize: "24px",
                          color: isOpen
                            ? "var(--color-md-primary)"
                            : "var(--color-md-on-surface-variant)",
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        expand_more
                      </span>
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

          {/* ── Right Side: Visual element ── */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[500px] md:h-[600px]">
            {/* Ambient backdrop glow */}
            <div
              className="absolute inset-0 blur-3xl rounded-full opacity-20"
              style={{
                backgroundColor: "var(--color-md-primary-container)",
                transform: "translate(-20%, 20%) scale(1.4)",
              }}
            />

            {/* Rotated card */}
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-lg overflow-hidden"
              style={{
                transform: touch ? "rotate(2deg)" : "rotate(6deg)",
                backgroundColor: "var(--color-md-surface-container)",
                boxShadow:
                  "0 20px 60px -15px rgba(0,0,0,0.15)",
                transition: touch ? "none" : "transform 700ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (touch) return;
                e.currentTarget.style.transform = "rotate(3deg)";
              }}
              onMouseLeave={(e) => {
                if (touch) return;
                e.currentTarget.style.transform = "rotate(6deg)";
              }}
            >
              {/* Abstract code-window visual */}
              <div
                className="w-full h-full flex flex-col p-5"
                style={{
                  backgroundColor: "var(--color-md-surface-container-lowest)",
                }}
              >
                {/* Window title bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "var(--color-md-error)",
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "var(--color-md-tertiary-container)",
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "var(--color-md-primary-container)",
                    }}
                  />
                </div>

                {/* Code lines */}
                <div className="flex-1 space-y-3 overflow-hidden">
                  {[
                    "const architect = {",
                    '  stack: ["Next.js", ".NET", "Python"],',
                    '  ai: ["LangChain", "RAG", "Ollama"],',
                    '  infra: ["Docker", "Redis", "K8s"],',
                    "  mission: build(), ship(), repeat()",
                    "};",
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-xs font-mono select-none mt-0.5"
                        style={{
                          color: "var(--color-md-outline-variant)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-sm font-mono leading-relaxed"
                        style={{
                          color:
                            i === 0
                              ? "var(--color-md-primary)"
                              : i === 4
                                ? "var(--color-md-primary)"
                                : "var(--color-md-on-surface-variant)",
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className="text-sm font-mono"
                    style={{ color: "var(--color-md-primary)" }}
                  >
                    ▋
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--color-md-on-surface-variant)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    always learning...
                  </span>
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
                  CREATIVE. TECHNICAL. PRECISION.&nbsp;&nbsp;
                  CREATIVE. TECHNICAL. PRECISION.&nbsp;&nbsp;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
