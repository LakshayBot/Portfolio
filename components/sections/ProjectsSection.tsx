interface Project {
  index: number;
  title: string;
  role: string;
  frontendStack: string;
  backendStack: string;
  description: string[];
}

const projects: Project[] = [
  {
    index: 1,
    title: "Movie Matching\nWeb Application",
    role: "Full Stack Developer",
    frontendStack: "Next.js, TypeScript, Tailwind CSS",
    backendStack: "MongoDB, Open AI API, TMDB API",
    description: [
      "As a full-stack developer on this project, I took ownership of both the frontend and backend development, ensuring a seamless and intuitive user experience.",
      "I built the frontend from scratch using modern frameworks and tools like Next.js, TypeScript, and Tailwind CSS, adhering to industry best practices for structure and scalability.",
      "On the backend, I implemented a secure and efficient system using MongoDB for data management and Google Authentication for user login. Additionally, I integrated the Open AI API to deliver personalised, AI-driven movie recommendations.",
    ],
  },
];

function ProjectIndexTag({ index }: { index: number }) {
  return (
    <span className="font-mono text-xl font-bold mb-6 block" style={{ color: "rgba(255,255,255,0.3)" }}>
      {"< "}
      <span style={{ color: "rgba(255,255,255,0.55)" }}>{index}</span>
      {" >"}
    </span>
  );
}

function DesktopMockup() {
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
          style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", width: "40%" }}
        >
          reel-reveal.app
        </div>
      </div>
      {/* Page content skeleton */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: "rgba(89,238,80,0.3)" }} />
          <div className="h-3 w-32 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        </div>
        <div className="h-28 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(89,238,80,0.08) 0%, rgba(255,255,255,0.03) 100%)" }} />
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    /* Constrain width so it doesn't stretch full column — matches reference */
    <div className="flex justify-start">
      <div
        className="rounded-[2rem] overflow-hidden"
        style={{
          background: "#111418",
          border: "1px solid rgba(255,255,255,0.09)",
          width: "220px",
          aspectRatio: "9 / 19",
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1">
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>9:41</span>
          <div className="w-12 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
          <div className="flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="w-1 rounded-full" style={{ height: `${4 + i * 2}px`, backgroundColor: "rgba(255,255,255,0.35)" }} />
            ))}
          </div>
        </div>
        {/* Screen content */}
        <div className="px-4 pt-4 space-y-3">
          <div className="h-2.5 w-3/4 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <div className="h-2.5 w-1/2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
          <div className="h-32 rounded-2xl mt-2" style={{ background: "linear-gradient(180deg, rgba(89,238,80,0.1) 0%, rgba(255,255,255,0.02) 100%)" }} />
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-10 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
            ))}
          </div>
          <div className="h-8 rounded-full mt-2" style={{ backgroundColor: "rgba(89,238,80,0.2)" }} />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        backgroundColor: "#0c0f10",
        /* full viewport bleed without relying on overflow-x-hidden clipping */
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ── "SELECTED PROJECTS" headline — scales to container width ── */}
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

        {/* ── Project entries ── */}
        <div className="space-y-32">
          {projects.map((project, idx) => (
            <article key={project.index}>
              {/* Top row: left meta + right mockups */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left */}
                <div>
                  <ProjectIndexTag index={project.index} />

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
                </div>

                {/* Right: stacked mockups */}
                <div className="space-y-5">
                  <DesktopMockup />
                  {/* <MobileMockup /> */}
                </div>
              </div>

              {/* Description paragraphs */}
              <div className="mt-14 max-w-2xl space-y-4">
                {project.description.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-[1.8]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(
                          /(Next\.js|TypeScript|Tailwind CSS|MongoDB|Open AI API|Google Authentication)/g,
                          "<strong style=\"color:rgba(255,255,255,0.88);font-weight:600\">$1</strong>"
                        ),
                    }}
                  />
                ))}
              </div>

              {/* Divider between projects */}
              {idx < projects.length - 1 && (
                <div className="mt-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
