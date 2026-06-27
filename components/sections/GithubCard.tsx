"use client";

import { useState, useMemo, useCallback } from "react";
import { CommitsGrid } from "@/components/ui/commits-grid";
import { getContributionColor, type ContributionWeek } from "@/lib/github";

interface GithubCardProps {
  weeks: ContributionWeek[];
  username: string;
}

export function GithubCard({ weeks, username }: GithubCardProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => setAnimationDone(true), 500);
  }, []);

  // Build month label positions
  const monthLabels = useMemo(() => {
    const positions: { label: string; col: number }[] = [];
    let lastMonth = "";
    weeks.forEach((week, colIndex) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return;
      const d = new Date(firstDay.date);
      const mon = d.toLocaleDateString("en-US", { month: "short" });
      const yr = `'${String(d.getFullYear()).slice(2)}`;
      const label = `${mon} ${yr}`;
      if (label !== lastMonth) {
        positions.push({ label, col: colIndex });
        lastMonth = label;
      }
    });
    return positions;
  }, [weeks]);

  const firstLabel = monthLabels[0];
  const lastLabel = monthLabels[monthLabels.length - 1];

  return (
    <div className="relative">
      {/* Animated commits grid overlay */}
      {!animationDone && (
        <div
          className="p-6 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: fadingOut ? 0 : 1,
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-md-on-surface-variant)" }}
            >
              GITHUB contributions
            </span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: "var(--color-md-on-surface-variant)" }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <CommitsGrid
            text={username}
            className="border-0 rounded-none p-0 bg-transparent"
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      )}

      {/* Real contribution data (fades in after animation) */}
      <div
        className="p-6 rounded-2xl relative overflow-hidden transition-opacity duration-700"
        style={{
          opacity: animationDone ? 1 : 0,
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          position: animationDone ? "relative" : "absolute",
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: animationDone ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-md-on-surface-variant)" }}
          >
            GITHUB contributions
          </span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: "var(--color-md-on-surface-variant)" }}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>

        {/* Heatmap: columns = weeks, rows = days (Sun→Sat) */}
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
        >
          {weeks.map((week, wi) =>
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
                      : "rgba(255,255,255,0.04)",
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
            <span className="text-xs" style={{ color: "var(--color-md-on-surface-variant)" }}>
              {firstLabel.label}
            </span>
          )}
          {lastLabel && lastLabel.col !== firstLabel?.col && (
            <span className="text-xs" style={{ color: "var(--color-md-on-surface-variant)" }}>
              {lastLabel.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
