type MathBlockProps = {
  latex: string;
};

export function MathBlock({ latex }: MathBlockProps) {
  return (
    <div className="math-display my-4 overflow-x-auto rounded-md border border-slate-200/70 bg-white/70 px-3 py-2 dark:border-slate-700/70 dark:bg-slate-900/40">
      <div className="min-w-max text-center">{`\\[${latex}\\]`}</div>
    </div>
  );
}
