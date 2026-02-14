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
      <div className="my-3 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm text-muted-foreground">
        {latex}
      </div>
    );
  }

  return (
    <div className="my-3 overflow-x-auto rounded-md bg-muted px-3 py-2">
      <div className="min-w-max" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
