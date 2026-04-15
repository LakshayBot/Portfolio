import { getContributions, getContributionColor } from "@/lib/github";

// Derive a short month label like "Jan '24" from a date string "2024-01-15"
function monthLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export async function GithubCard() {
  let data;
  try {
    data = await getContributions("LakshayBot");
  } catch (err) {
    console.error("GitHub fetch failed:", err);
    data = null;
  }

  // Use last 26 weeks for a ~6-month view matching the reference image
  const weeks = (data?.weeks ?? []).slice(-26);

  // Build month label positions: track when the month changes across weeks
  const monthPositions: { label: string; col: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, colIndex) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const d = new Date(firstDay.date);
    const mon = d.toLocaleDateString("en-US", { month: "short" });
    const yr = `'${String(d.getFullYear()).slice(2)}`;
    const label = `${mon} ${yr}`;
    if (label !== lastMonth) {
      monthPositions.push({ label, col: colIndex });
      lastMonth = label;
    }
  });

  // Show only the first and last month label (like the reference image)
  const firstLabel = monthPositions[0];
  const lastLabel = monthPositions[monthPositions.length - 1];

  return (
    <div
      className="p-6 rounded-2xl relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-md-surface-container-lowest)",
        border: "1px solid var(--color-md-outline-variant)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <span
          className="text-sm font-semibold tracking-wide"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-on-surface-variant)",
          }}
        >
          GITHUB contributions
        </span>
        {/* GitHub icon (SVG) */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>

      {/* Heatmap: columns = weeks, rows = days (Sun→Sat) */}
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
      >
        {weeks.map((week, wi) =>
          // Always render 7 rows per week
          Array.from({ length: 7 }).map((_, di) => {
            const day = week.contributionDays[di];
            return (
              <div
                key={`${wi}-${di}`}
                title={
                  day
                    ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`
                    : undefined
                }
                className="aspect-square rounded-[2px] transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: day
                    ? getContributionColor(day.contributionCount)
                    : "var(--color-md-surface-container)",
                  gridColumn: wi + 1,
                  gridRow: di + 1,
                }}
              />
            );
          })
        )}
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-3">
        {firstLabel && (
          <span
            className="text-xs"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            {firstLabel.label}
          </span>
        )}
        {lastLabel && lastLabel.col !== firstLabel?.col && (
          <span
            className="text-xs"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            {lastLabel.label}
          </span>
        )}
      </div>
    </div>
  );
}
