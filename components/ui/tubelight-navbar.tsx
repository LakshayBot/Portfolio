"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  external?: boolean;
}

interface TubelightNavProps {
  items: NavItem[];
  className?: string;
  /** If set, observes this section ID and clears the active tab when it's in view. */
  homeSectionId?: string;
  onActiveChange?: (name: string) => void;
}

export function TubelightNav({
  items,
  className,
  homeSectionId,
  onActiveChange,
}: TubelightNavProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Build list of section IDs from nav items (only anchor links)
    const sectionIds = items
      .map((item) => (item.url.startsWith("#") ? item.url.slice(1) : null))
      .filter(Boolean) as string[];

    // Also observe the home/hero section if provided
    if (homeSectionId && !sectionIds.includes(homeSectionId)) {
      sectionIds.push(homeSectionId);
    }

    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // If the home/hero section entered the viewport, clear active tab
            if (homeSectionId && entry.target.id === homeSectionId) {
              setActiveTab("");
              onActiveChange?.("");
              return; // hero wins — don't check other entries in this batch
            }

            // Otherwise, find the matching nav item and activate it
            const matchingItem = items.find(
              (item) => item.url === `#${entry.target.id}`
            );
            if (matchingItem) {
              setActiveTab(matchingItem.name);
              onActiveChange?.(matchingItem.name);
            }
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items, homeSectionId, onActiveChange]);

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-background/5 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg",
        className
      )}
      style={{
        borderColor: "color-mix(in srgb, var(--color-md-primary-fixed) 12%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--color-bg-dark) 85%, transparent)",
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;

        return (
          <Link
            key={item.name}
            href={item.url}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onClick={() => {
              setActiveTab(item.name);
              onActiveChange?.(item.name);
            }}
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors select-none",
              isActive
                ? "text-[var(--color-md-on-surface)]"
                : "text-[var(--color-md-on-surface-variant)]/70 hover:text-[var(--color-md-on-surface)]"
            )}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {/* Desktop: show label */}
            <span className="hidden md:inline">{item.name}</span>

            {/* Mobile: show icon */}
            <span className="md:hidden flex items-center justify-center">
              <Icon size={18} strokeWidth={2.5} />
            </span>

            {/* Tube light glow (active tab only) */}
            {isActive && (
              <motion.div
                layoutId="tubelight-lamp"
                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-acid-lime) 8%, transparent)",
                }}
              >
                {/* Tube light bar at top */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                  style={{ backgroundColor: "var(--color-acid-lime)" }}
                >
                  {/* Glow blurs */}
                  <div
                    className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-2"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-acid-lime) 25%, transparent)" }}
                  />
                  <div
                    className="absolute w-8 h-6 rounded-full blur-md -top-1"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-acid-lime) 25%, transparent)" }}
                  />
                  <div
                    className="absolute w-4 h-4 rounded-full blur-sm top-0 left-2"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-acid-lime) 25%, transparent)" }}
                  />
                </div>
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
