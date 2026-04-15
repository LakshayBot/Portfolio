"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render toggle after mount
  useEffect(() => setMounted(true), []);

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-xl"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-md-surface-container-low) 80%, transparent)",
        borderBottom: "1px solid color-mix(in srgb, var(--color-md-outline-variant) 30%, transparent)",
      }}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        {/* Brand */}
        <div
          className="text-xl font-bold tracking-tighter"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-on-surface)",
          }}
        >
          ARCHITECT.DEV
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Projects", "Services", "GitHub", "CV"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-colors duration-200 hover:text-[#CCFF00]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--color-md-on-surface-variant)",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side: Dark mode toggle + Hire Me */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
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

          {/* Hire Me */}
          <button
            className="font-bold px-6 py-2 rounded-lg scale-95 active:scale-90 transition-transform text-sm"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              backgroundColor: "var(--color-md-primary)",
              color: "var(--color-md-on-primary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-md-surface-container-high)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-md-primary)")
            }
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
