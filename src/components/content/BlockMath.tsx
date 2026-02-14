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
      <div className="my-3 overflow-x-auto rounded-md border border-slate-200 px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-700 dark:text-slate-100">
        {latex}
      </div>
    );
  }

  return (
    <div className="my-3 overflow-x-auto rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700">
      <div className="min-w-max" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
