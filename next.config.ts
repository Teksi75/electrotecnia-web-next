import { createRequire } from "node:module";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);

const baseConfig: NextConfig = {};

const enableStandardMdx = process.env.ENABLE_STANDARD_MDX === "true";

let nextConfig: NextConfig = baseConfig;

if (enableStandardMdx) {
  try {
    const withMDX = require("@next/mdx")({
      options: {
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
      },
    });

    nextConfig = withMDX({
      ...baseConfig,
      pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    });
  } catch {
    nextConfig = baseConfig;
  }
}

export default nextConfig;
