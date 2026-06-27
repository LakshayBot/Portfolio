"use client";

import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getContributionColor } from "@/lib/github";
import type { CSSProperties } from "react";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface AnimatedHeatmapProps {
  weeks: ContributionWeek[];
}

interface CellMeta {
  flash: boolean;
  delay: string;
  highlightColor: string;
  realBg: string;
  tooltip: string | undefined;
}

// Deterministic placeholders used during SSR — replaced on the client
const PLACEHOLDER_CELL: CellMeta = {
  flash: false,
  delay: "0s",
  highlightColor: "var(--color-md-primary-fixed)",
  realBg: "rgba(255,255,255,0.04)",
  tooltip: undefined,
};

const GREENS = [
  "#48d55d",
  "#016d32",
  "#0d4429",
  "var(--color-md-primary-fixed)",
  "var(--color-md-primary-fixed-dim)",
];

function generateCell(day: ContributionDay | undefined): CellMeta {
  return {
    flash: Math.random() < 0.25,
    delay: `${(Math.random() * 0.6).toFixed(2)}s`,
    highlightColor: GREENS[Math.floor(Math.random() * GREENS.length)],
    realBg: day
      ? getContributionColor(day.contributionCount)
      : "rgba(255,255,255,0.04)",
    tooltip: day
      ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`
      : undefined,
  };
}

export function AnimatedHeatmap({ weeks }: AnimatedHeatmapProps) {
  // Start with deterministic placeholders so SSR output matches.
  // After mount, generate the real random data on the client only.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const cellData = useMemo(() => {
    return weeks.map((week) =>
      Array.from({ length: 7 }).map((_, di) => {
        const day = week.contributionDays[di];
        return hydrated ? generateCell(day) : PLACEHOLDER_CELL;
      })
    );
  }, [weeks, hydrated]);

  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
    >
      {weeks.map((week, wi) =>
        Array.from({ length: 7 }).map((_, di) => {
          const cell = cellData[wi][di];

          return (
            <div
              key={`${wi}-${di}`}
              title={cell.tooltip}
              className={cn(
                "aspect-square rounded-[2px] hover:opacity-70",
                cell.flash ? "animate-flash" : "animate-highlight"
              )}
              style={
                {
                  gridColumnStart: wi + 1,
                  gridColumnEnd: "auto",
                  gridRowStart: di + 1,
                  gridRowEnd: "auto",
                  animationDelay: cell.delay,
                  "--highlight": cell.highlightColor,
                  "--real-bg": cell.realBg,
                } as CSSProperties
              }
            />
          );
        })
      )}
    </div>
  );
}
