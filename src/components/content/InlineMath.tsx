import { renderKatexToString } from "@/components/content/katexRenderer";

type InlineMathProps = {
  latex: string;
};

export function InlineMath({ latex }: InlineMathProps) {
  const html = renderKatexToString(latex, false);

  return <span className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
}
