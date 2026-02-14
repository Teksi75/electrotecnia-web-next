import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  env: {
    NEXT_ENABLE_STANDARD_MDX: process.env.NEXT_ENABLE_STANDARD_MDX ?? "0",
  },
};

export default nextConfig;
