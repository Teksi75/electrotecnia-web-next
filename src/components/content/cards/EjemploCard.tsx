import { renderContentNodes } from "@/components/content/renderTokens";
import type { ContentBlock } from "@/types";

type EjemploCardProps = {
  block: ContentBlock;
};

export function EjemploCard({ block }: EjemploCardProps) {
  return (
    <section className="rounded-xl border border-violet-200 bg-violet-50/70 p-5 shadow-sm dark:border-violet-900 dark:bg-violet-950/30">
      <h2 className="text-lg font-semibold text-violet-900 dark:text-violet-100">{block.title}</h2>
      <div className="mt-2 space-y-2 [&_.katex-inline]:align-middle [&_.katex-display]:my-3">
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
