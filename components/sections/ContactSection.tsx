const EMAIL = "lakshay@lakshay.dev";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/LakshayBot",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lakshaymalhotra",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/lakshaybot",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
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
      <div className="max-w-7xl mx-auto px-8">

        {/* ── "LET'S WORK TOGETHER" headline ── */}
        <div style={{ containerType: "inline-size" }}>
          <h2
            className="font-black leading-[0.88] tracking-tighter uppercase mb-16 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#ffffff",
              /* Two-line: first line fills container, second line is shorter */
              fontSize: "4.6cqw",
            }}
          >
            <span className="block">Let&apos;s work</span>
            <span className="block" style={{ color: "#59ee50" }}>together.</span>
          </h2>
        </div>

        {/* ── 2-col: left description + email, right socials ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="space-y-8">
            <p
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Whether you have a project in mind, a role to fill, or just want
              to connect — my inbox is open.
            </p>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 transition-colors duration-200"
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#59ee50", fontSize: "22px" }}
              >
                mail
              </span>
              <span
                className="text-xl font-bold tracking-tight group-hover:text-[#59ee50] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "#ffffff",
                }}
              >
                {EMAIL}
              </span>
            </a>

            {/* Hire Me CTA */}
            <div className="pt-2">
              <a
                href={`mailto:${EMAIL}?subject=Let's%20work%20together`}
                className="hero-btn-primary px-10 py-4 rounded-full text-base font-black transition-all duration-200 inline-block"
              >
                Send a message
              </a>
            </div>
          </div>

          {/* Right: social links */}
          <div className="space-y-4">
            <p
              className="text-xs uppercase tracking-[0.18em] mb-6 font-medium"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Find me on
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {/* Icon box */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[rgba(89,238,80,0.15)]"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{s.icon}</span>
                </div>
                <span
                  className="text-base font-semibold group-hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.label}
                </span>
                {/* Arrow */}
                <span
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#59ee50]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
