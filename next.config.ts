import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
    experimental: {
      serverActions: {
        allowedOrigins: ["books-mall.vercel.app"],
    },
  },
};

export default nextConfig;
