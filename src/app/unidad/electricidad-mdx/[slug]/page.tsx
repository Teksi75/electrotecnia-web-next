import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@/lib/seo";
import { getAllMdxSlugs, getMdxBySlug } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function extractHeadingId(text: string) {
  const match = text.match(/^(.*)\s+\{#([\w-]+)\}$/);

  if (!match) {
    return { label: text, id: undefined };
  }

  return { label: match[1], id: match[2] };
}

function renderMdxLike(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) return <div key={`spacer-${index}`} className="h-2" />;

    if (trimmed.startsWith("### ")) {
      const { label, id } = extractHeadingId(trimmed.replace(/^###\s+/, ""));
      return (
        <h3 key={`h3-${index}`} id={id} className="scroll-mt-24 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      const { label, id } = extractHeadingId(trimmed.replace(/^##\s+/, ""));
      return (
        <h2 key={`h2-${index}`} id={id} className="scroll-mt-24 mt-4 text-2xl font-semibold tracking-tight">
          {label}
        </h2>
      );
    }

    return (
      <p key={`p-${index}`} className="text-slate-700 dark:text-slate-300">
        {trimmed}
      </p>
    );
  });
}

export async function generateStaticParams() {
  const slugs = await getAllMdxSlugs("electricidad");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getMdxBySlug("electricidad", slug);

  if (!topic) {
    return createPageMetadata({ title: "Tema MDX no encontrado", description: "No se encontró el tema MDX solicitado.", path: `/unidad/electricidad-mdx/${slug}` });
  }

  return createPageMetadata({ title: topic.frontmatter.title, description: topic.frontmatter.description, path: `/unidad/electricidad-mdx/${slug}` });
}

export default async function ElectricidadMdxPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = await getMdxBySlug("electricidad", slug);

  if (!topic) notFound();

  return (
    <article className="mx-auto w-full max-w-4xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Parte {topic.frontmatter.part}</p>
        <h1 className="text-3xl font-bold tracking-tight">{topic.frontmatter.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{topic.frontmatter.description}</p>
      </header>

      <section className="space-y-2">{renderMdxLike(topic.content)}</section>
    </article>
  );
}
