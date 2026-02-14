import { renderBlockLatex } from "@/components/content/mathRender";

type MathBlockProps = {
  latex: string;
};

export function MathBlock({ latex }: MathBlockProps) {
  const html = renderBlockLatex(latex);

  if (!html) {
    return (
      <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm dark:border-slate-700 dark:bg-slate-900">
        {latex}
      </div>
    );
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200/70 bg-white/70 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/50">
      <div className="mx-auto w-max min-w-full text-center text-[1.08rem] leading-relaxed [&_math]:mx-auto [&_math]:block [&_math]:w-max [&_math]:min-w-full" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
