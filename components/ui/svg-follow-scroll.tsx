"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export interface SvgFollowScrollProps {
  pathD: string;
  viewBox: string;
  scrollYProgress: MotionValue<number>;
  strokeColor?: string;
  strokeWidth?: number;
  blurAmount?: number;
  glowOpacity?: number;
  className?: string;
  pathLengthRange?: [number, number];
}

export function SvgFollowScroll({
  pathD,
  viewBox,
  scrollYProgress,
  strokeColor = "#59ee50",
  strokeWidth = 2,
  blurAmount = 8,
  glowOpacity = 0.3,
  className = "",
  pathLengthRange = [0, 1],
}: SvgFollowScrollProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    setTouch(isTouchDevice());
    return () => mq.removeEventListener("change", update);
  }, []);

  // On touch devices, render the path fully drawn (no scroll-driven animation)
  // to avoid the per-frame useTransform overhead
  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion || touch ? [1, 1] : pathLengthRange,
  );

  const filterId = `svg-blur-${blurAmount}-${strokeColor.replace("#", "")}`;
  const showGlow = !reducedMotion && !touch;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {showGlow && (
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} />
          </filter>
        </defs>
      )}

      {/* Glow background path — skipped on touch devices */}
      {showGlow && (
        <motion.path
          d={pathD}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 3}
          fill="none"
          opacity={glowOpacity}
          filter={`url(#${filterId})`}
          style={{ pathLength }}
        />
      )}

      {/* Foreground path */}
      <motion.path
        d={pathD}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  );
}

export default SvgFollowScroll;
