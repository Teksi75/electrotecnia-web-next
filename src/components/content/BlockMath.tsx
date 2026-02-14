import katex from "katex";

type BlockMathProps = {
  latex: string;
};

export function BlockMath({ latex }: BlockMathProps) {
  return (
    <div className="my-3 overflow-x-auto rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950/60">
      <div
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(latex, {
            displayMode: true,
            throwOnError: false,
            strict: "ignore",
          }),
        }}
      />
    </div>
  );
}
