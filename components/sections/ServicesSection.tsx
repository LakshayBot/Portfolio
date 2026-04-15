const services = [
  {
    icon: "table_rows_narrow",
    title: "Frontend Development",
    description:
      "Building responsive and intuitive user interfaces using modern frameworks like React and TypeScript with Tailwind CSS.",
  },
  {
    icon: "code",
    title: "Backend Development",
    description:
      "Developing scalable backend systems and integrating APIs to manage event data seamlessly.",
  },
  {
    icon: "tune",
    title: "Performance Optimization",
    description:
      "Optimising performance, ensuring secure user authentication, and refactoring code to improve speed and maintainability.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
