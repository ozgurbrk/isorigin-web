import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "isorigin-web.vercel.app" }],
        destination: "https://isorigin.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.isorigin.com" }],
        destination: "https://isorigin.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
