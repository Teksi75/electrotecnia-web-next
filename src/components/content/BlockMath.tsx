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
      <div className="my-4 overflow-x-auto rounded-md bg-slate-100/80 px-3 py-2 font-mono text-sm leading-relaxed dark:bg-slate-800/80">
        {latex}
      </div>
    );
  }

  return (
    <div className="katex-block my-4 overflow-x-auto rounded-md bg-slate-100/80 px-3 py-2 dark:bg-slate-800/80">
      <div className="min-w-max" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
