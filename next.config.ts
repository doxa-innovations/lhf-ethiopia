import { withDoxaWatch } from "@doxa-innovations/watch/next";
import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
};

// Doxa Watch: source maps for stack traces (browser maps are moved out of the public folder by
// `doxa-watch postbuild`) and the collector kept out of the server bundle.
export default withDoxaWatch(nextConfig);
