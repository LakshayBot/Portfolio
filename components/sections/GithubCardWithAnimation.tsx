"use client";

import { useState, useCallback } from "react";
import { CommitsGrid } from "@/components/ui/commits-grid";
import { siteConfig } from "@/data/site-config";

export function GithubCardWithAnimation({ children }: { children: React.ReactNode }) {
  const [fadingOut, setFadingOut] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => setAnimationDone(true), 600);
  }, []);

  return (
    <div className="relative">
      {/* Original GithubCard (server-rendered, always present) */}
      {children}

      {/* Animated commits-grid overlay (fades out after animation) */}
      {!animationDone && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center p-3 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: fadingOut ? 0 : 1,
            backgroundColor: "var(--color-bg-dark)",
          }}
        >
          <CommitsGrid
            text={siteConfig.githubUsername}
            className="border-0 rounded-none p-0 bg-transparent shadow-none"
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      )}
    </div>
  );
}
