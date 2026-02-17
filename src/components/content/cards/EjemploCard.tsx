import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type EjemploCardProps = {
  block: ContentBlock;
};

export function EjemploCard({ block }: EjemploCardProps) {
  return (
    <section className="surface-panel rounded-2xl border-l-4 border-l-orange-700 p-5 dark:border-l-orange-400">
      <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-100">{block.title}</h2>
      <div className="mt-2 space-y-2 [&_.math-inline]:align-middle [&_.katex-inline]:align-middle [&_.katex-display]:my-3">
        {renderContentNodes(block.nodes ?? [], block.body, true, {
          renderParagraphLines: true,
          linesContainerClassName: "space-y-2",
          lineClassName: "leading-[1.8]",
          fallbackParagraphClassName: "mt-0 leading-[1.8]",
          preserveEmptyLines: true,
        })}
      </div>
    </section>
  );
}
