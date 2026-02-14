import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export type StandardMdxAvailability = {
  enabled: boolean;
  reason?: string;
};

const STANDARD_DEPS = ["@next/mdx", "remark-math", "rehype-katex", "katex"];

export function getStandardMdxAvailability(): StandardMdxAvailability {
  if (process.env.NEXT_ENABLE_STANDARD_MDX !== "1") {
    return {
      enabled: false,
      reason: "Habilitá NEXT_ENABLE_STANDARD_MDX=1 para activar el pipeline estándar de MDX.",
    };
  }

  for (const dep of STANDARD_DEPS) {
    try {
      require.resolve(dep);
    } catch {
      return {
        enabled: false,
        reason: `Falta instalar la dependencia '${dep}' para activar el pipeline estándar.`,
      };
    }
  }

  return { enabled: true };
}
