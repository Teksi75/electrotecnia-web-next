import katex from "katex";

type InlineMathProps = {
  latex: string;
};

export function InlineMath({ latex }: InlineMathProps) {
  return (
    <span
      className="katex-inline"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(latex, {
          displayMode: false,
          throwOnError: false,
          strict: "ignore",
        }),
      }}
    />
  );
}
