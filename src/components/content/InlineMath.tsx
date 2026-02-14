import katex from "katex";

type InlineMathProps = {
  latex: string;
};

export function InlineMath({ latex }: InlineMathProps) {
  const html = katex.renderToString(latex, {
    displayMode: false,
    throwOnError: false,
    strict: "ignore",
  });

  return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}
