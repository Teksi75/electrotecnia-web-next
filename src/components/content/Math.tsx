import { renderInlineLatex } from "@/components/content/mathRender";

type MathProps = {
  latex: string;
};

export function Math({ latex }: MathProps) {
  const html = renderInlineLatex(latex);

  if (!html) {
    return <span className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm dark:bg-slate-800">{latex}</span>;
  }

  return <span className="align-middle text-[1.02em] text-current" dangerouslySetInnerHTML={{ __html: html }} />;
}
