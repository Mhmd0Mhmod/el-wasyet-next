import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root for Turbopack to avoid the multiple lockfile warning
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STORAGE_BASE_URL?.replace(
          /^https?:\/\//,
          "",
        ) as string,
      },
    ],
  },
};

export default nextConfig;
