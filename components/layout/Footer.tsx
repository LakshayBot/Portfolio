const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Source Code", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "var(--color-md-surface-container-lowest)",
        borderTop: "1px solid color-mix(in srgb, var(--color-md-outline-variant) 20%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full gap-6">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div
            className="text-lg font-black uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            ARCHITECT.DEV
          </div>
          <p
            className="text-sm tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface-variant)",
            }}
          >
            © 2024 Kinetic Architect. Built with precision.
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-widest uppercase opacity-80 hover:opacity-100 transition-all duration-200 hover:text-[#CCFF00]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-on-surface-variant)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
