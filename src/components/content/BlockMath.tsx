type BlockMathProps = {
  latex: string;
};

export function BlockMath({ latex }: BlockMathProps) {
  return (
    <pre className="my-3 overflow-x-auto rounded-md bg-slate-100/80 px-3 py-2 font-mono text-sm dark:bg-slate-800/80">
      {latex}
    </pre>
  );
}
