# Story Scroll Projects Section — Implementation Plan

## Summary
Replace the click-to-expand accordion in `ProjectsSection.tsx` with a scroll-driven "story" layout: each project occupies a full viewport, scrolling reveals the next with a GSAP-powered rotation unfold animation.

## Files to create/modify

### 1. Already done: `npm install gsap @gsap/react`

### 2. NEW: `components/ui/story-scroll.tsx`
Port from 21st.dev — GSAP ScrollTrigger primitives:
- `FlowArt` — wraps all sections, sets up ScrollTrigger pinning + rotation per section
- `FlowSection` — each full-viewport story slide
- Handles `prefers-reduced-motion` (disables animation)
- Exports typed `FlowSectionProps` and `FlowArtProps`

### 3. EDIT: `components/layout/SmoothScroll.tsx`
Add `ScrollTrigger.normalizeScroll(true)` for Lenis ⇄ ScrollTrigger compatibility.
Change:
```ts
import { useEffect, useRef } from "react";
import Lenis from "lenis";
```
To:
```ts
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```
And inside the useEffect, after `const lenis = new Lenis({...})`, add:
```ts
ScrollTrigger.normalizeScroll(true);
```

### 4. REWRITE: `components/sections/ProjectsSection.tsx`
Full rewrite — from accordion to story scroll.

**Layout per project slide (FlowSection):**
- Dark background inherited from section (#0c0f10)
- Two-column grid (left: content, right: live preview)
- **Left column:**
  - Project number (01, 02) — large, semi-transparent
  - Title — bold, white, large font
  - Role — accent-colored subtitle
  - Tag pills — small rounded pills with accent border
  - Description paragraphs
  - "View Project" link with arrow
- **Right column:**
  - Live iframe preview — attempts to load the project URL in an iframe inside a browser chrome skeleton (dots, URL bar)
  - Falls back to skeleton mockup if iframe fails to load
- **Scroll indicator:** Pagination dots (clickable) to show which slide is active

**Key behavior:**
- Each project is a `FlowSection` inside a `FlowArt` wrapper
- GSAP handles the rotation unfold animation as user scrolls
- Section background transitions to use project's accent color subtly
- Responsive: stacks on mobile (content only, no iframe)

### 5. NO CHANGE: `data/projects.ts`
The existing `Project` interface already has everything needed.

## GSAP + Lenis compatibility
Using `ScrollTrigger.normalizeScroll(true)` (single line in SmoothScroll.tsx).
This tells ScrollTrigger to use normalized scroll values compatible with Lenis's smooth scrolling wrapper.

## Live preview approach
Each project slide will render an `<iframe>` inside a browser-chrome skeleton. The iframe src is `https://${project.url}`. If the iframe fails to load (most sites block iframing via `X-Frame-Options`), an `onError` handler or `sandbox` fallback shows the existing skeleton mockup.

## Verification
1. `npm run dev` — confirm no build errors
2. Playwright: navigate to `http://localhost:3000`, scroll through projects section, capture screenshots
