export function ArchitectureCard() {
  return (
    <div
      className="p-8 rounded-xl shadow-lg flex justify-between items-center overflow-hidden relative"
      style={{ backgroundColor: "var(--color-md-on-surface)" }}
    >
      {/* Background icon watermark */}
      <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
        <span
          className="material-symbols-outlined select-none"
          style={{ fontSize: "8rem", color: "var(--color-md-surface)" }}
        >
          architecture
        </span>
      </div>

      {/* Left: label */}
      <div>
        <h4
          className="font-bold text-lg mb-1"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-surface)",
          }}
        >
          Architecture Grade
        </h4>
        <p style={{ color: "var(--color-md-surface-variant)", fontSize: "0.875rem" }}>
          System Scalability Index
        </p>
      </div>

      {/* Right: grade */}
      <div className="text-right">
        <span
          className="text-5xl font-black"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-primary-fixed)",
          }}
        >
          A+
        </span>
      </div>
    </div>
  );
}
