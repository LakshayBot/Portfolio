export function KineticTicker() {
  const items = [
    "SELECTED PROJECTS",
    "SELECTED PROJECTS",
    "SELECTED PROJECTS",
    "SELECTED PROJECTS",
    "SELECTED PROJECTS",
    "SELECTED PROJECTS",
  ];

  return (
    <div className="mt-24 overflow-hidden py-10 opacity-5 pointer-events-none select-none">
      <div className="flex gap-20 whitespace-nowrap animate-marquee">
        {items.map((text, i) => (
          <span
            key={i}
            className="font-black uppercase tracking-tighter"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "10rem",
              lineHeight: 1,
              color: "var(--color-md-on-surface)",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
