import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Ensures static site generation
  trailingSlash: true,
};

export default nextConfig;
