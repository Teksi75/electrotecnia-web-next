import { renderKatexToString } from "@/components/content/katexRenderer";

type BlockMathProps = {
  latex: string;
};

export function BlockMath({ latex }: BlockMathProps) {
  const html = renderKatexToString(latex, true);

  return (
    <div className="my-3 overflow-x-auto rounded-md bg-slate-100 px-3 py-2 dark:bg-slate-950/60">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
