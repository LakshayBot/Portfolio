import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Initialises the Cloudflare context during `next dev` so that
// getCloudflareContext() and env bindings (including secrets set in the
// Cloudflare dashboard) are available locally as well as in production.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // ── Production optimisations ──────────────────────────────────────────
  // Strip the x-powered-by header so we don't leak framework info.
  poweredByHeader: false,

  // Gzip / Brotli compression is on by default, but be explicit.
  compress: true,

  // Disable source maps in production to avoid shipping 2-3× the JS bytes.
  productionBrowserSourceMaps: false,

  // Next.js 16 defaults to Chrome 111+ / Safari 16.4+ — no legacy polyfills
  // needed. The browserslist in package.json (if present) can tighten this
  // further, but the default already avoids Array.prototype.at / flat / etc.
  // polyfills for modern traffic.
};

export default nextConfig;
