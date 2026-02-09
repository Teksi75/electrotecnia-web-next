import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrevNext } from "@/components/layout/PrevNext";
import { Card } from "@/components/ui/Card";
import { getTopicBySlug as getTopicDoc, getAllTopicSlugs } from "@/lib/content";
import { getPrevNextBySlug, getTopicBySlug } from "@/lib/nav";
import { createPageMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "formulas") {
    return (
      <Card>
        <h2 className="text-lg font-semibold">{block.title}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-200">
          {(block.items ?? []).map((item) => (
            <li key={item} className="font-mono text-sm">{item}</li>
          ))}
        </ul>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold">{block.title}</h2>
      <p className={block.mono ? "mt-3 whitespace-pre-line font-mono text-sm" : "mt-3 whitespace-pre-line"}>
        {block.body}
      </p>
    </Card>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getTopicDoc(slug);

  if (!doc) {
    return createPageMetadata({
      title: "Tema no encontrado",
      description: "No se encontró el tema solicitado.",
      path: `/unidad/electricidad/${slug}`,
    });
  }

  return createPageMetadata({
    title: doc.title,
    description: doc.description,
    path: `/unidad/electricidad/${slug}`,
  });
}

export default async function ElectricidadTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getTopicDoc(slug);
  if (!doc) notFound();

  const currentTopic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextBySlug(slug);

  return (
    <article className="space-y-6">
      <header className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Parte {doc.part}</p>
        <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{doc.description}</p>
      </header>

      <section className="space-y-4">
        {doc.blocks.map((block) => (
          <BlockRenderer key={`${block.type}-${block.title}`} block={block} />
        ))}
      </section>

      {doc.sections?.length ? (
        <section className="space-y-5">
          {doc.sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24 space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="space-y-4">
                {section.blocks.map((block) => (
                  <BlockRenderer key={`${section.id}-${block.type}`} block={block} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {currentTopic ? <PrevNext prev={prev} next={next} /> : null}
    </article>
  );
}
