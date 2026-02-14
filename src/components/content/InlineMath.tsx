import katex from "katex";

type InlineMathProps = {
  latex: string;
};

function tryRenderInlineMath(latex: string) {
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return null;
  }
}

export function InlineMath({ latex }: InlineMathProps) {
  const html = tryRenderInlineMath(latex);

  if (!html) {
    return <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">{latex}</code>;
  }

  return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}
