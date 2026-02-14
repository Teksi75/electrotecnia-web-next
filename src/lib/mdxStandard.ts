import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const resolveIfPresent = (id: string) => {
  try {
    require.resolve(id);
    return true;
  } catch {
    return false;
  }
};

export const isStandardMdxPipelineAvailable = resolveIfPresent("@next/mdx") && resolveIfPresent("remark-math") && resolveIfPresent("rehype-katex");
