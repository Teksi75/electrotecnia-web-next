import katex from "katex";

type BlockMathProps = {
  latex: string;
};

function tryRenderBlockMath(latex: string) {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return null;
  }
}

export function BlockMath({ latex }: BlockMathProps) {
  const html = tryRenderBlockMath(latex);

  if (!html) {
    return (
      <div className="math-display my-5 overflow-x-auto rounded-lg border border-border/70 bg-secondary/80 px-4 py-3 font-mono text-sm leading-relaxed">
        {latex}
      </div>
    );
  }

  return (
    <div className="math-display my-5 overflow-x-auto rounded-lg border border-border/70 bg-secondary/60 px-4 py-3">
      <div className="min-w-max" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
