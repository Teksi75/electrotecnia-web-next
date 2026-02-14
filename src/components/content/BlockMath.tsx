import katex from "katex";

type BlockMathProps = {
  latex: string;
};

export function BlockMath({ latex }: BlockMathProps) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
    strict: "ignore",
  });

  return (
    <div className="my-3 overflow-x-auto rounded-md bg-slate-100/80 px-3 py-2 dark:bg-slate-800/80">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
