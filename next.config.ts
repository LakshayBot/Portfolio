import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Initialises the Cloudflare context during `next dev` so that
// getCloudflareContext() and env bindings (including secrets set in the
// Cloudflare dashboard) are available locally as well as in production.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
