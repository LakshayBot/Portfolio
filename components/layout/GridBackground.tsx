"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

const GRID_SIZE = 40;
const SPEED = 0.3;

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

function GridPattern({
  offsetX,
  offsetY,
  animate,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
  animate: boolean;
}) {
  if (!animate) {
    // Static pattern — no motion values, no RAF overhead
    return (
      <svg className="w-full h-full" aria-hidden="true">
        <defs>
          <pattern
            id="grid-bg-pattern-static"
            width={GRID_SIZE}
            height={GRID_SIZE}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg-pattern-static)" />
      </svg>
    );
  }

  return (
    <svg className="w-full h-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id="grid-bg-pattern"
          width={GRID_SIZE}
          height={GRID_SIZE}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-bg-pattern)" />
    </svg>
  );
}

export function GridBackground() {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  // Track global mouse position via window event (desktop only)
  useEffect(() => {
    if (touch) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onLeave = () => {
      mouseX.set(-999);
      mouseY.set(-999);
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, touch]);

  // Animate the grid scrolling (desktop only; skipped on touch devices)
  useAnimationFrame(() => {
    if (touch) return;
    gridOffsetX.set((gridOffsetX.get() + SPEED) % GRID_SIZE);
    gridOffsetY.set((gridOffsetY.get() + SPEED) % GRID_SIZE);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Base grid — always visible, very faint */}
      <div
        className="absolute inset-0"
        style={{ color: "var(--color-md-on-surface)", opacity: touch ? 0.02 : 0.04 }}
      >
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          animate={!touch}
        />
      </div>

      {/* Flashlight grid — revealed on cursor hover, green-tinted (desktop only) */}
      {!touch && (
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            color: "var(--color-md-primary)",
            opacity: 0.22,
          }}
        >
          <GridPattern
            offsetX={gridOffsetX}
            offsetY={gridOffsetY}
            animate
          />
        </motion.div>
      )}
    </div>
  );
}
