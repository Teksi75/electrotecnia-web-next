import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EjemploCard } from "@/components/content/cards/EjemploCard";
import { ExplicacionCard } from "@/components/content/cards/ExplicacionCard";
import { FormulaCard } from "@/components/content/cards/FormulaCard";
import { IdeaClaveCard } from "@/components/content/cards/IdeaClaveCard";
import { PrevNext } from "@/components/layout/PrevNext";
import { getAllTopicSlugs, getTopicContentBySlug } from "@/lib/content";
import { getPrevNextBySlug, getTopicBySlug } from "@/lib/nav";
import { createPageMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicContentBySlug(slug);

  if (!topic) {
    return createPageMetadata({ title: "Tema no encontrado", description: "No se encontró el tema solicitado.", path: `/unidad/electricidad/${slug}` });
  }

  return createPageMetadata({ title: topic.title, description: topic.description, path: `/unidad/electricidad/${slug}` });
}

export default async function ElectricidadTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = await getTopicContentBySlug(slug);

  if (!topic) notFound();

  const currentTopic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextBySlug(slug);

  return (
    <article className="space-y-6">
      <header className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Parte {topic.part}</p>
        <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
        <p className="text-slate-800 dark:text-slate-300">{topic.description}</p>
      </header>

      {topic.blocks.map((block, index) => <BlockCard key={`${block.type}-${index}`} block={block} />)}

      {topic.sections?.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.blocks.map((block, index) => <BlockCard key={`${section.id}-${block.type}-${index}`} block={block} />)}
        </section>
      ))}

      {currentTopic ? <PrevNext prev={prev} next={next} /> : null}
    </article>
  );
}
