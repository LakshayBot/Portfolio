"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { siteConfig } from "@/data/site-config";

const springReveal = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 18 },
    },
  },
};

export function HeroHeadline() {
  return (
    <h1
      className="font-black leading-[0.9] tracking-tighter uppercase w-full"
      style={{
        fontFamily: "var(--font-space-grotesk)",
        color: "var(--color-md-on-surface)",
        fontSize: "4.6cqw",
      }}
    >
      {/* Line 1 — characters spring up with 0s delay */}
      <TextEffect
        as="span"
        per="char"
        variants={springReveal}
        delay={0}
        className="block whitespace-nowrap"
      >
        {siteConfig.title}
      </TextEffect>

      {/* Line 2 — characters spring up 0.4s after line 1 starts */}
      <TextEffect
        as="span"
        per="char"
        variants={springReveal}
        delay={0.4}
        className="block whitespace-nowrap"
      >
        {siteConfig.name}
      </TextEffect>
    </h1>
  );
}
