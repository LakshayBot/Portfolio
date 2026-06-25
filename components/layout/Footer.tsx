import { siteConfig } from "@/data/site-config";

const pages = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
];

const socials = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Twitter", href: siteConfig.socials.twitter },
];

export function Footer() {
  return (
    <footer
      className="w-full min-h-[400px] flex flex-col justify-between items-start px-8 md:px-16 py-20 overflow-hidden relative"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-md-on-surface)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      {/* Decorative dot */}
      <div className="absolute top-16 right-16 w-8 h-8 rounded-full hidden lg:block opacity-20 hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: "var(--color-md-surface-container-high)" }} />

      {/* ── Top row: Contact + Navigation ── */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-24 z-10">
        {/* Contact info */}
        <div className="flex flex-col gap-4 text-lg" style={{ fontFamily: "var(--font-hanken-grotesk)" }}>
          <p>
            email:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="footer-link"
              style={{ color: "var(--color-md-on-surface)" }}
            >
              {siteConfig.email}
            </a>
          </p>
          <p>based in: new delhi, india</p>
          <p>available for: freelance projects &amp; full-time</p>
        </div>

        {/* Navigation columns */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Pages */}
          <div className="flex flex-col gap-4">
            <h4
              className="uppercase tracking-widest mb-2 text-sm"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-on-surface-variant)",
                opacity: 0.5,
              }}
            >
              pages
            </h4>
            <ul className="flex flex-col gap-3 text-lg" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {pages.map((page) => (
                <li key={page.label}>
                  <a
                    href={page.href}
                    className="footer-link"
                    style={{ color: "var(--color-md-on-surface)" }}
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4
              className="uppercase tracking-widest mb-2 text-sm"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-on-surface-variant)",
                opacity: 0.5,
              }}
            >
              socials
            </h4>
            <ul className="flex flex-col gap-3 text-lg" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="footer-link"
                    style={{ color: "var(--color-md-on-surface)" }}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Middle row: Name ── */}
      <div className="w-full max-w-7xl mx-auto relative z-0 mb-8 lg:mb-16">
        <h1
          className="footer-watermark font-bold uppercase tracking-tighter leading-none select-none text-center whitespace-nowrap transition-colors duration-700"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            color: "var(--color-md-on-surface)",
            opacity: 0.15,
          }}
        >
          LAKSHAY MALHOTRA
        </h1>
      </div>

      {/* ── Bottom row: Copyright bar ── */}
      <div
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-sm"
        style={{
          fontFamily: "var(--font-hanken-grotesk)",
          borderTop: "1px solid color-mix(in srgb, var(--color-md-outline-variant) 30%, transparent)",
          color: "var(--color-md-on-surface-variant)",
          opacity: 0.6,
        }}
      >
        <p>© {new Date().getFullYear()} {siteConfig.name}. all rights reserved</p>
        <p className="mt-4 md:mt-0 flex items-center gap-2">built with precision</p>
      </div>
    </footer>
  );
}
