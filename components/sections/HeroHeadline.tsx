"use client";

import { TextEffect } from "@/components/ui/text-effect";

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
      {/* Line 1 — words blur in with 0s delay */}
      <TextEffect
        as="span"
        per="word"
        preset="blur"
        delay={0}
        className="block whitespace-nowrap"
      >
        Full Stack Developer
      </TextEffect>

      {/* Line 2 — words blur in 0.3s after line 1 starts */}
      <TextEffect
        as="span"
        per="word"
        preset="blur"
        delay={0.3}
        className="block whitespace-nowrap"
      >
        Lakshay Malhotra
      </TextEffect>
    </h1>
  );
}
