"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SvgFollowScroll } from "@/components/ui/svg-follow-scroll";

const CONNECTOR_PATH =
  "M 100 -50 C 300 100, 800 150, 1100 300 C 1300 400, 1100 550, 700 600 C 350 650, 150 800, 300 950 C 450 1100, 1050 1150, 1200 1300 C 1350 1450, 700 1600, 450 1750 C 200 1900, 100 2100, 300 2550";

const CONNECTOR_VIEWBOX = "0 0 1440 2500";

export function SectionConnector({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <SvgFollowScroll
          pathD={CONNECTOR_PATH}
          viewBox={CONNECTOR_VIEWBOX}
          scrollYProgress={scrollYProgress}
          strokeColor="#CCFF00"
          strokeWidth={1}
          blurAmount={5}
          glowOpacity={0.15}
          className="absolute inset-0 w-full h-full"
          pathLengthRange={[0.05, 1]}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
