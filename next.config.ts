import { createRequire } from "node:module";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);

const resolveIfPresent = (id: string) => {
  try {
    require.resolve(id);
    return true;
  } catch {
    return false;
  }
};

const baseConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const hasMdxDeps = resolveIfPresent("@next/mdx") && resolveIfPresent("remark-math") && resolveIfPresent("rehype-katex");

let nextConfig: NextConfig | (() => Promise<NextConfig>) = baseConfig;

if (hasMdxDeps) {
  nextConfig = async () => {
    const [{ default: createMDX }, { default: remarkMath }, { default: rehypeKatex }] = await Promise.all([
      import("@next/mdx"),
      import("remark-math"),
      import("rehype-katex"),
    ]);

    const withMDX = createMDX({
      options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    });

    return withMDX(baseConfig);
  };
}

export default nextConfig;
