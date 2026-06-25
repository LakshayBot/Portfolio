"use client";

const skills = [
  {
    title: "Frontend",
    description:
      "React and Next.js interfaces focused on performance, accessibility, and smooth animations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.3" fill="none">
          <ellipse rx="10" ry="3.8" cx="12" cy="12" />
          <ellipse rx="10" ry="3.8" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="3.8" cx="12" cy="12" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    title: "Backend",
    description:
      ".NET 8 and FastAPI APIs, microservice design, EF Core, PostgreSQL, and Redis caching.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "AI & Infra",
    description:
      "RAG pipelines, LangChain workflows, Docker multi-service deployments, and observability.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {skills.map((skill) => (
        <div
          key={skill.title}
          className="skill-card p-8 rounded-lg transition-colors duration-200"
        >
          <div className="mb-6" style={{ color: "var(--color-md-primary-fixed)" }}>
            {skill.icon}
          </div>
          <h3
            className="font-bold text-xl mb-3"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            {skill.title}
          </h3>
          <p
            style={{
              color: "var(--color-md-on-surface-variant)",
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "0.875rem",
              lineHeight: 1.7,
            }}
          >
            {skill.description}
          </p>
        </div>
      ))}
    </div>
  );
}
