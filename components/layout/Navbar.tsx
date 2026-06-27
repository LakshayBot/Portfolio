"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, FolderGit2, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSyncExternalStore } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import { TubelightNav } from "@/components/ui/tubelight-navbar";
import { siteConfig } from "@/data/site-config";

/* ── lucide icon for GitHub (not in lucide-react bundled set, inline SVG) ── */
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const NAV_ITEMS = [
  { name: "Projects", url: "#projects", icon: FolderGit2 },
  { name: "Services", url: "#services", icon: Briefcase },
  { name: "GitHub", url: siteConfig.socials.github, icon: GithubIcon as typeof FolderGit2, external: true },
  { name: "CV", url: "/cv", icon: FileText, external: true },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  );
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-bg-dark) 70%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-md-primary-fixed) 8%, transparent)",
        }}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 py-3 max-w-full mx-auto gap-3">
          {/* ── Brand (left) ── */}
          <div
            className="text-lg md:text-xl font-bold tracking-tighter shrink-0"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--color-md-on-surface)",
            }}
          >
            {mounted ? (
              <TextScramble
                as="span"
                duration={1.2}
                speed={0.04}
                trigger={true}
                characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"
              >
                LAKSHAY.DEV
              </TextScramble>
            ) : (
              <span>LAKSHAY.DEV</span>
            )}
          </div>

          {/* ── Desktop: tubelight nav (center) ── */}
          <div className="hidden sm:block">
            <TubelightNav items={NAV_ITEMS} homeSectionId="hero" />
          </div>

          {/* ── Right: theme toggle (desktop) / CTA button (mobile) ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile CTA */}
            <a
              href="#contact"
              className="sm:hidden inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-full border transition-all duration-200"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-bg-dark)",
                backgroundColor: "var(--color-md-primary-fixed)",
                borderColor: "var(--color-md-primary-fixed)",
              }}
            >
              Hire Me
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>

            {/* Theme toggle (always visible) */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" style={{ color: "var(--color-md-on-surface-variant)" }} />
                ) : (
                  <Moon className="h-5 w-5" style={{ color: "var(--color-md-on-surface-variant)" }} />
                )}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Mobile: bottom pill nav (outside <nav> so backdrop-filter doesn't break fixed positioning) ── */}
      <div className="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[200]">
        <TubelightNav items={NAV_ITEMS} homeSectionId="hero" className="shadow-xl shadow-black/40" />
      </div>
    </>
  );
}
