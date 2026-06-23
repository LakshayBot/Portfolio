export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-md-surface)" }}>
      {/* Navbar skeleton */}
      <div
        className="h-16 w-full"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-md-surface-container-low) 80%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-md-outline-variant) 30%, transparent)",
        }}
      />

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-7xl mx-auto w-full space-y-12 animate-pulse">
          {/* Headline skeleton */}
          <div className="space-y-3">
            <div
              className="h-[4.6cqw] min-h-10 w-3/4 rounded-lg"
              style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
            />
            <div
              className="h-[4.6cqw] min-h-10 w-1/2 rounded-lg"
              style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
            />
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div
                className="h-5 w-48 rounded"
                style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
              />
              <div
                className="h-4 w-full rounded"
                style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
              />
              <div
                className="h-4 w-5/6 rounded"
                style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
              />
              <div className="flex gap-4 pt-4">
                <div
                  className="h-10 w-32 rounded-full"
                  style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
                />
                <div
                  className="h-10 w-32 rounded-full"
                  style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
                />
              </div>
            </div>

            {/* GitHub card skeleton */}
            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "var(--color-md-surface-container-lowest)",
                border: "1px solid var(--color-md-outline-variant)",
              }}
            >
              <div className="flex justify-between items-start mb-5">
                <div
                  className="h-4 w-40 rounded"
                  style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
                />
                <div
                  className="h-6 w-6 rounded"
                  style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
                />
              </div>
              <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(26, 1fr)" }}>
                {Array.from({ length: 26 * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[2px]"
                    style={{ backgroundColor: "var(--color-md-surface-container-high)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
