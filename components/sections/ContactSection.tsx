"use client";

import { useState, useCallback } from "react";
import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

/* ── Contact data ── */

const CONTACT_ITEMS: (CarouselItem & { href: string; external: boolean })[] = [
  {
    id: 1,
    title: "GitHub",
    href: "https://github.com/LakshayBot",
    external: true,
  },
  {
    id: 2,
    title: "LinkedIn",
    href: "https://linkedin.com/in/lakshaymalhotra",
    external: true,
  },
  {
    id: 3,
    title: "Say Hello",
    href: "mailto:lakshay@lakshay.dev",
    external: false,
  },
];

/* ── Contact Section ── */

export function ContactSection() {
  const [activeItem, setActiveItem] = useState(CONTACT_ITEMS[0]);

  const handleActiveChange = useCallback((item: CarouselItem) => {
    const match = CONTACT_ITEMS.find((c) => c.id === item.id);
    if (match) setActiveItem(match);
  }, []);

  return (
    <section
      id="contact"
      className="min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)]"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "clamp(2rem, 8vh, 5rem)",
        paddingBottom: "clamp(2rem, 8vh, 5rem)",
      }}
    >
      {/* ── "get in" ── */}
      <h1
        className="text-[clamp(3rem,10vw,5rem)] sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none select-none lowercase"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-bone-white)",
          letterSpacing: "-0.06em",
        }}
      >
        get in
      </h1>

      {/* ── Ruler Carousel ── */}
      <div className="w-full">
        <RulerCarousel
          originalItems={CONTACT_ITEMS.map(({ id, title }) => ({ id, title }))}
          onActiveChange={handleActiveChange}
        />
      </div>

      {/* ── Active contact link ── */}
      <a
        href={activeItem.href}
        target={activeItem.external ? "_blank" : undefined}
        rel={activeItem.external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 px-6 py-3 transition-all duration-300 select-none"
        style={{
          color: "var(--color-md-on-surface-variant)",
          fontFamily: "var(--font-space-grotesk)",
        }}
      >
        <span className="text-[15px] font-medium transition-colors duration-300 group-hover:text-[var(--color-bone-white)]">
          {activeItem.title}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-70 group-hover:translate-y-0 group-hover:translate-x-0"
          style={{ color: "var(--color-md-primary-fixed)" }}
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>

      {/* ── "touch" ── */}
      <h1
        className="text-[clamp(3rem,10vw,5rem)] sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none select-none lowercase"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-bone-white)",
          letterSpacing: "-0.06em",
        }}
      >
        touch
      </h1>
    </section>
  );
}
