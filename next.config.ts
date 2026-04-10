import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "littlestardusthk.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "scontent-lax3-1.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-lax3-2.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-lax7-1.cdninstagram.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
    ],
  },
};

export default nextConfig;
