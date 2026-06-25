"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--color-md-surface)",
          margin: 0,
          fontFamily: "var(--font-hanken-grotesk), sans-serif",
        }}
      >
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <span
              className="material-symbols-outlined block"
              style={{ fontSize: "3rem", color: "var(--color-md-error)" }}
            >
              warning
            </span>
            <h2
              className="text-2xl font-black uppercase tracking-tighter"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-on-surface)",
              }}
            >
              Critical Error
            </h2>
            <p style={{ color: "var(--color-md-on-surface-variant)" }}>
              The application encountered a critical error and cannot continue.
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-full text-base font-black transition-all duration-200"
              style={{
                backgroundColor: "var(--color-md-primary)",
                color: "var(--color-md-on-primary)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
