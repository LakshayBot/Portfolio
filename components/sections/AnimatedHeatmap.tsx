"use client";

import { useMemo } from "react";
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

function getRandomDelay() {
  return `${(Math.random() * 0.6).toFixed(2)}s`;
}

function getRandomFlash() {
  return Math.random() < 0.25;
}

function getRandomGreen() {
  const greens = [
    "#48d55d",
    "#016d32",
    "#0d4429",
    "var(--color-md-primary-fixed)",
    "var(--color-md-primary-fixed-dim)",
  ];
  return greens[Math.floor(Math.random() * greens.length)];
}

export function AnimatedHeatmap({ weeks }: AnimatedHeatmapProps) {
  const cellData = useMemo(() => {
    return weeks.map((week, wi) =>
      Array.from({ length: 7 }).map((_, di) => {
        const day = week.contributionDays[di];
        return {
          flash: getRandomFlash(),
          delay: getRandomDelay(),
          highlightColor: getRandomGreen(),
          realBg: day
            ? getContributionColor(day.contributionCount)
            : "rgba(255,255,255,0.04)",
          tooltip: day
            ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`
            : undefined,
        };
      })
    );
  }, [weeks]);

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
                  gridColumn: wi + 1,
                  gridRow: di + 1,
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
