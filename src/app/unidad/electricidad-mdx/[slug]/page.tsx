import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@/lib/seo";
import { getAllMdxSlugs, getMdxBySlug } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function renderMdx(source: string): Promise<ReactNode> {
  try {
    const runtimeImport = new Function("moduleName", "return import(moduleName)") as (moduleName: string) => Promise<unknown>;
    const [{ compileMDX }, remarkGfmModule, remarkMathModule, rehypeKatexModule] = await Promise.all([
      runtimeImport("next-mdx-remote/rsc") as Promise<{ compileMDX: (input: { source: string; options: { parseFrontmatter: boolean; mdxOptions: { remarkPlugins: unknown[]; rehypePlugins: unknown[] } } }) => Promise<{ content: ReactNode }> }>,
      runtimeImport("remark-gfm") as Promise<{ default: unknown }>,
      runtimeImport("remark-math") as Promise<{ default: unknown }>,
      runtimeImport("rehype-katex") as Promise<{ default: unknown }>,
    ]);

    const compiled = await compileMDX({
      source,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfmModule.default, remarkMathModule.default],
          rehypePlugins: [rehypeKatexModule.default],
        },
      },
    });

    return compiled.content;
  } catch {
    return <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">{source}</pre>;
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMdxSlugs("electricidad");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getMdxBySlug("electricidad", slug);

  if (!topic) {
    return createPageMetadata({ title: "Tema no encontrado", description: "No se encontró el tema solicitado.", path: `/unidad/electricidad-mdx/${slug}` });
  }

  return createPageMetadata({
    title: topic.frontmatter.title,
    description: topic.frontmatter.description,
    path: `/unidad/electricidad-mdx/${slug}`,
  });
}

export default async function ElectricidadMdxTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = await getMdxBySlug("electricidad", slug);

  if (!topic) notFound();

  const content = await renderMdx(topic.source);

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Parte {topic.frontmatter.part}</p>
        <h1 className="text-3xl font-bold tracking-tight">{topic.frontmatter.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{topic.frontmatter.description}</p>
      </header>
      <section className="prose prose-slate max-w-none dark:prose-invert [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">{content}</section>
    </article>
  );
}
