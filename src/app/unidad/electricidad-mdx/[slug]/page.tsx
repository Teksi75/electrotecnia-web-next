import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

import { EjemploCard } from "@/components/content/cards/EjemploCard";
import { ExplicacionCard } from "@/components/content/cards/ExplicacionCard";
import { FormulaCard } from "@/components/content/cards/FormulaCard";
import { IdeaClaveCard } from "@/components/content/cards/IdeaClaveCard";
import { PrevNext } from "@/components/layout/PrevNext";
import { getTopicContentBySlugUncached } from "@/lib/content";
import { getMdxBySlugUncached } from "@/lib/mdx";
import { getPrevNextBySlug, getTopicBySlug } from "@/lib/nav";
import { getStandardMdxAvailability } from "@/lib/mdxStandard";
import type { ContentBlock } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function BlockCard({ block }: { block: ContentBlock }) {
  if (block.type === "idea") {
    return <IdeaClaveCard block={block} />;
  }

  if (block.type === "explain") {
    return <ExplicacionCard block={block} />;
  }

  if (block.type === "example") {
    return <EjemploCard block={block} />;
  }

  return <FormulaCard block={block} />;
}

export default async function ElectricidadMdxPage({ params }: PageProps) {
  noStore();
  const { slug } = await params;
  const topic = await getTopicContentBySlugUncached(slug);

  if (!topic) notFound();

  const mdxTopic = await getMdxBySlugUncached("electricidad", slug);
  const standardMdx = getStandardMdxAvailability();
  const currentTopic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextBySlug(slug);

  return (
    <article className="space-y-6">
      <header className="space-y-2 border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vista de prueba MDX</p>
        <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
        <p className="text-muted-foreground">{topic.description}</p>
      </header>

      {!standardMdx.enabled && process.env.NODE_ENV !== "production" ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          {standardMdx.reason} Se usa el renderer actual como fallback para no romper el flujo.
        </div>
      ) : null}

      {standardMdx.enabled && mdxTopic ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
          El pipeline estándar está habilitado y las dependencias están disponibles. En esta etapa todavía se mantiene el fallback actual para
          preservar compatibilidad de render.
        </div>
      ) : null}

      {topic.blocks.map((block, index) => <BlockCard key={`${block.type}-${index}`} block={block} />)}

      {topic.sections?.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4 rounded-xl border border-border p-5">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.blocks.map((block, index) => <BlockCard key={`${section.id}-${block.type}-${index}`} block={block} />)}
        </section>
      ))}

      {currentTopic ? <PrevNext prev={prev} next={next} /> : null}
    </article>
  );
}
