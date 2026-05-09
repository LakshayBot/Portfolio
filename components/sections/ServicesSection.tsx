const services = [
  {
    icon: "layers",
    title: "Full Stack Development",
    description:
      "End-to-end application delivery — from Next.js and React frontends to .NET 8 API gateways and Python backends, with TypeScript throughout.",
  },
  {
    icon: "psychology",
    title: "AI & RAG Systems",
    description:
      "Agentic RAG pipelines, LangChain and LangGraph workflows, local LLM integration via Ollama, and semantic search with vector embeddings.",
  },
  {
    icon: "hub",
    title: "Backend & API Architecture",
    description:
      "Microservice design, REST API gateways, JWT and OAuth authentication, Hangfire background jobs, PostgreSQL with EF Core, and Redis caching.",
  },
  {
    icon: "deployed_code",
    title: "DevOps & Infrastructure",
    description:
      "Docker Compose multi-service deployments, OpenSearch hybrid retrieval, and observability pipelines with Langfuse tracing and ClickHouse.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundColor: "var(--color-md-background)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ── "SERVICES" headline — left-aligned, same size as other headings ── */}
        <div style={{ containerType: "inline-size" }}>
          <h2
            className="font-black leading-[0.9] tracking-tighter uppercase mb-16 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
              fontSize: "4.6cqw",
            }}
          >
            Services
          </h2>
        </div>

        {/* ── Flat 3-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: "var(--color-md-surface-container-lowest)",
                boxShadow: "0 1px 12px rgba(0,0,0,0.07), 0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              {/* Green icon box */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "var(--color-md-primary-container)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "20px",
                    color: "var(--color-md-on-primary-container)",
                  }}
                >
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-bold text-base mb-3 leading-snug"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "var(--color-md-on-surface)",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-md-on-surface-variant)" }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
