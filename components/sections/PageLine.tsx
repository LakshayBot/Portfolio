"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SvgFollowScroll } from "@/components/ui/svg-follow-scroll";

const PAGE_PATH =
  "M 120 -50 C 300 100, 600 200, 500 400 C 400 600, 800 700, 1000 500 C 1200 300, 1100 600, 900 800 C 700 1000, 400 900, 300 1100 C 200 1300, 600 1300, 800 1500 C 1000 1700, 600 1700, 400 1900 C 200 2100, 500 2200, 700 2400";

const PAGE_VIEWBOX = "0 0 1200 2500";

export function PageLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Fixed-position SVG line that stays in viewport, draws with full-page scroll */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <SvgFollowScroll
          pathD={PAGE_PATH}
          viewBox={PAGE_VIEWBOX}
          scrollYProgress={scrollYProgress}
          strokeColor="var(--color-md-primary-fixed)"
          strokeWidth={1}
          blurAmount={6}
          glowOpacity={0.15}
          className="absolute inset-0 w-full h-full"
          pathLengthRange={[0.02, 1]}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
