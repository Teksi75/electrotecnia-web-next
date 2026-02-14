type InlineMathProps = {
  latex: string;
};

export function InlineMath({ latex }: InlineMathProps) {
  return <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.95em] dark:bg-slate-800">{latex}</code>;
}
