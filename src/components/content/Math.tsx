type MathProps = {
  latex: string;
};

export function Math({ latex }: MathProps) {
  return <span className="math-inline">{`\\(${latex}\\)`}</span>;
}
