"use client";

/* ── SVG icons ── */

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Contact links ── */

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/LakshayBot",
    external: true,
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lakshaymalhotra",
    external: true,
    Icon: LinkedInIcon,
  },
  {
    label: "Say Hello",
    href: "mailto:lakshay@lakshay.dev",
    external: false,
    Icon: MailIcon,
  },
];

/* ── Contact Section ── */

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16">
        {/* ── "get in" ── */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none select-none lowercase"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-bone-white)",
            letterSpacing: "-0.06em",
          }}
        >
          get in
        </h1>

        {/* ── Contact links row ── */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300 select-none"
              style={{
                color: "var(--color-md-on-surface-variant)",
              }}
            >
              <link.Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors duration-300 group-hover:text-[var(--color-md-primary-fixed)]" />
              <span
                className="text-sm sm:text-base font-medium transition-colors duration-300 group-hover:text-[var(--color-bone-white)]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {link.label}
              </span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-70 group-hover:translate-y-0 group-hover:translate-x-0 text-[var(--color-md-primary-fixed)]" />
            </a>
          ))}
        </div>

        {/* ── "touch" ── */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none select-none lowercase"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-bone-white)",
            letterSpacing: "-0.06em",
          }}
        >
          touch
        </h1>
      </div>
    </section>
  );
}
