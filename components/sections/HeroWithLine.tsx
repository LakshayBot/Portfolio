"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SvgFollowScroll } from "@/components/ui/svg-follow-scroll";

const HERO_PATH =
  "M -50 200 C 200 140, 500 380, 720 240 C 900 120, 1100 380, 1300 420 C 1450 450, 1350 620, 1050 660 C 750 700, 450 720, 200 680 C 50 650, 0 700, -50 750";

const HERO_VIEWBOX = "0 0 1440 900";

export function HeroWithLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* SVG follow-scroll line behind content */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <SvgFollowScroll
          pathD={HERO_PATH}
          viewBox={HERO_VIEWBOX}
          scrollYProgress={scrollYProgress}
          strokeColor="#59ee50"
          strokeWidth={1.5}
          blurAmount={6}
          glowOpacity={0.25}
          className="absolute inset-0 w-full h-full"
          pathLengthRange={[0.1, 1]}
        />
      </div>

      {children}
    </section>
  );
}
