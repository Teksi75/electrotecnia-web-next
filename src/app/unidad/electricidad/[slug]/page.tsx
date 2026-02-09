import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrevNext } from "@/components/layout/PrevNext";
import { getAllDocSlugs, getDocBySlug, renderMdx } from "@/lib/mdx";
import { getPrevNextBySlug, getTopicBySlug } from "@/lib/nav";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return createPageMetadata({
      title: "Tema no encontrado",
      description: "No se encontró el tema solicitado.",
      path: `/unidad/electricidad/${slug}`,
    });
  }

  return createPageMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: `/unidad/electricidad/${slug}`,
  });
}

export default async function ElectricidadTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const content = await renderMdx(doc.source);
  const currentTopic = getTopicBySlug(slug);
  const { prev, next } = getPrevNextBySlug(slug);

  return (
    <article>
      <header className="mb-8 space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Parte {doc.frontmatter.part}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{doc.frontmatter.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{doc.frontmatter.description}</p>
      </header>

      <div className="mdx-content">{content}</div>

      {currentTopic ? <PrevNext prev={prev} next={next} /> : null}
    </article>
  );
}
