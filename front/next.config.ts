import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  allowedDevOrigins: ["http://172.17.1.204:3000"],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
