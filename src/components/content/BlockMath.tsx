type BlockMathProps = {
  latex: string;
};

function tryRenderBlockMath(latex: string) {
  try {
    const katexModuleName = "katex";
    const katex = (Function("moduleName", "return require(moduleName);") as (moduleName: string) => {
      renderToString: (input: string, options: Record<string, unknown>) => string;
    })(katexModuleName);

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
      <div className="my-4 overflow-x-auto rounded-md border border-slate-200/80 bg-slate-50 px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900/60">
        {latex}
      </div>
    );
  }

  return (
    <div className="my-4 overflow-x-auto rounded-md border border-slate-200/80 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/40">
      <div className="flex justify-center text-slate-900 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
