import { getContributions, getContributionColor } from "@/lib/github";

const LEGEND = [
  { label: "0",   color: "var(--color-md-surface-container)" },
  { label: "1-2", color: "var(--color-md-primary-fixed-dim)" },
  { label: "3-5", color: "var(--color-md-primary-fixed)" },
  { label: "6-10",color: "var(--color-md-primary)" },
  { label: "10+", color: "var(--color-md-primary-dim)" },
];

export async function GithubCard() {
  let data;
  try {
    data = await getContributions("LakshayBot");
  } catch (err) {
    console.error("GitHub fetch failed:", err);
    data = null;
  }

  const totalContributions = data?.totalContributions ?? 0;
  // Flatten all days across all weeks for the grid
  const allDays = data?.weeks.flatMap((w) => w.contributionDays) ?? [];

  // Keep only last 84 days (12 weeks × 7 days) for a compact display
  const displayDays = allDays.slice(-84);

  return (
    <div
      className="p-8 rounded-xl shadow-xl relative overflow-hidden group"
      style={{ backgroundColor: "var(--color-md-surface-container-lowest)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            terminal
          </span>
          <h3
            className="font-bold text-lg"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            GITHUB contributions
          </h3>
        </div>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          Last 12 weeks
        </span>
      </div>

      {/* Heatmap grid — 12 columns × 7 rows */}
      <div className="grid grid-cols-12 gap-1 mb-6">
        {displayDays.length > 0 ? (
          displayDays.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.contributionCount} contribution${
                day.contributionCount !== 1 ? "s" : ""
              }`}
              className="aspect-square rounded-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: getContributionColor(day.contributionCount) }}
            />
          ))
        ) : (
          // Fallback skeleton when API is unavailable
          Array.from({ length: 84 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{ backgroundColor: "var(--color-md-surface-container)" }}
            />
          ))
        )}
      </div>

      {/* Footer: total count + legend */}
      <div className="flex items-end justify-between">
        <div>
          <span
            className="text-4xl font-black"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            {totalContributions.toLocaleString()}
          </span>
          <p
            className="text-xs uppercase tracking-widest mt-1"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface-variant)",
            }}
          >
            Total contributions
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-1 items-center">
          <span
            className="text-[10px]"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            Less
          </span>
          {LEGEND.map((l) => (
            <div
              key={l.label}
              title={l.label}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: l.color }}
            />
          ))}
          <span
            className="text-[10px]"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            More
          </span>
        </div>
      </div>
    </div>
  );
}
