"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    // ── Mobile/tablet: skip Lenis entirely — native scroll is smoother ──
    if (touch) {
      // Still normalize scroll so GSAP ScrollTrigger works correctly
      ScrollTrigger.normalizeScroll(true);
      return () => {
        ScrollTrigger.normalizeScroll(false);
      };
    }

    // ── Desktop: Lenis with restrained settings ──
    const lenis = new Lenis({
      duration: 0.8,          // faster = less perceived lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -5 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,     // 1:1 finger tracking — no artificial speed
      infinite: false,
    });

    ScrollTrigger.normalizeScroll(true);

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [touch]);

  return <>{children}</>;
}
