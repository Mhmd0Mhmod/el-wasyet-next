import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
