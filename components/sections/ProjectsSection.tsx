"use client";

import { useState, useEffect } from "react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { projects, type Project } from "@/data/projects";

function LivePreview({ url, accentBg }: { url: string; accentBg: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "failed" : prev));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "var(--color-deep-obsidian)",
        border: "1px solid color-mix(in srgb, var(--color-md-on-surface) 9%, transparent)",
        aspectRatio: "16 / 10",
        borderRadius: "0px",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{
          borderBottom: "1px solid color-mix(in srgb, var(--color-md-on-surface) 6%, transparent)",
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <div
          className="ml-3 rounded px-3 py-0.5 text-[10px] truncate"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-md-on-surface) 5%, transparent)",
            color: "color-mix(in srgb, var(--color-md-on-surface) 25%, transparent)",
          }}
        >
          {url}
        </div>
      </div>

      <div className="relative w-full" style={{ height: "calc(100% - 41px)" }}>
        <iframe
          src={`https://${url}`}
          title={`${url} preview`}
          className="w-full h-full border-0"
          style={{ display: status === "loaded" ? "block" : "none" }}
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />

        {(status === "loading" || status === "failed") && (
          <div className="absolute inset-0 flex flex-col justify-center p-5 space-y-3">
            <div className="flex justify-between items-center mb-4">
              <div
                className="h-3 w-24"
                style={{ backgroundColor: `${accentBg}0.3)` }}
              />
              <div
                className="h-3 w-32"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-md-on-surface) 6%, transparent)",
                }}
              />
            </div>
            <div
              className="h-28"
              style={{
                background: `linear-gradient(135deg, ${accentBg}0.1) 0%, color-mix(in srgb, var(--color-md-on-surface) 3%, transparent) 100%)`,
              }}
            />
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-md-on-surface) 4%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  return (
    <FlowSection
      aria-label={project.title}
      style={{
        backgroundColor: "var(--color-bg-dark)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center flex-1 max-w-7xl mx-auto w-full">
        <div className="space-y-5">
          <span
            className="font-mono font-bold tabular-nums"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "color-mix(in srgb, var(--color-md-on-surface) 6%, transparent)",
              fontFamily: "var(--font-space-grotesk)",
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3
            className="font-black tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--color-md-on-surface)",
            }}
          >
            {project.title}
          </h3>

          <p
            className="text-base font-semibold"
            style={{
              color: project.accentColor,
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {project.role}
          </p>

          <div className="flex flex-wrap gap-2">
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

          <div className="space-y-3">
            {project.description.map((para, i) => (
              <p
                key={i}
                className="text-sm leading-[1.85]"
                style={{ color: "var(--color-md-on-surface-variant)" }}
              >
                {para}
              </p>
            ))}
          </div>

          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-150 hover:opacity-70"
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

        <div className="hidden lg:block">
          <LivePreview url={project.url} accentBg={project.accentBg} />
        </div>
      </div>
    </FlowSection>
  );
}

export function ProjectsSection() {
  return (
    <div
      id="projects"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div
        style={{
          containerType: "inline-size",
          paddingLeft: "4vw",
          paddingRight: "4vw",
          paddingTop: "clamp(2rem,8vw,4vw)",
        }}
      >
        <h2
          className="font-black leading-[0.9] tracking-tighter uppercase whitespace-nowrap"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-on-surface)",
            fontSize: "4.6cqw",
          }}
        >
          Selected Projects
        </h2>
      </div>

      <FlowArt aria-label="Projects story scroll">
        {projects.map((project, i) => (
          <ProjectSlide key={project.title} project={project} index={i} />
        ))}
      </FlowArt>
    </div>
  );
}
