# SVG Follow Scroll — Hero + Section Connector

## Summary
Add scroll-driven SVG line animations using framer-motion. One line flows through the Hero section, another spans Services → Skills → Architecture → Contact (skipping the GSAP-pinned Projects section). No new dependencies.

## Files

### 1. NEW: `components/ui/svg-follow-scroll.tsx`
Reusable component. Exports `SvgFollowScroll`:
- Props: `pathD`, `viewBox`, `scrollYProgress` (MotionValue), `strokeColor`, `strokeWidth`, `blurAmount`, `className`
- Renders `<motion.path>` with `pathLength` driven by `scrollYProgress`
- Background path with `<feGaussianBlur>` for glow
- Uses `useTransform` to map scroll progress to pathLength
- Respects `prefers-reduced-motion`

### 2. EDIT: `components/sections/Hero.tsx`
- Make Hero a client component (or wrap in a client sub-component)
- Add `useRef` + `useScroll` on the hero section
- Render `<SvgFollowScroll>` behind hero content (absolute, z-0, pointer-events-none)
- Custom SVG path flowing through headline → description → ticker
- Green accent (#59ee50), 2px stroke, 8px blur glow

### 3. EDIT: `app/page.tsx`
- Add a client wrapper `<SectionConnector>` around Services → Skills → Architecture → Contact
- Uses `useScroll` on the wrapper container
- Renders `<SvgFollowScroll>` with a longer path spanning all wrapped sections
- Position: absolute within the wrapper, pointer-events-none, z-0
- Subtle style: 1px stroke, green accent, 6px blur, lower opacity

### 4. NO CHANGE: `package.json`
Uses existing framer-motion dependency.

## SVG Path Design

### Hero path (viewBox="0 0 1440 900")
Flows organically from top-left through the headline text, curves past the 2-col description area, and exits through the kinetic ticker region at bottom.

### Section connector path (viewBox="0 0 1440 3500")
Starts at Services section, zigzags through Skills grid, loops through Architecture card, and ends at Contact form.

## GSAP Conflict Avoidance
- Hero line: above projects, no overlap
- Section connector: wraps only non-GSAP sections (Services, Skills, Architecture, Contact)
- Projects section with GSAP ScrollTrigger pinning is excluded from the connector line
