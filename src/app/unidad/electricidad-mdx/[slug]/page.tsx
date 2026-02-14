import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMdxBySlug } from "@/lib/mdx";
import { isStandardMdxPipelineAvailable } from "@/lib/mdxStandard";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const loadStandardMdxComponent = async (slug: string) => {
  try {
    const dynamicImporter = new Function("path", "return import(path)") as (path: string) => Promise<{ default: ComponentType }>;
    const mdxModule = await dynamicImporter(`@/content/mdx-demo/${slug}.mdx`);
    return mdxModule.default;
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getMdxBySlug("mdx-demo", slug);

  if (!topic) {
    return createPageMetadata({ title: "Demo MDX no encontrado", description: "No se encontró el contenido MDX de demostración.", path: `/unidad/electricidad-mdx/${slug}` });
  }

  return createPageMetadata({ title: `${topic.frontmatter.title} (MDX)`, description: topic.frontmatter.description, path: `/unidad/electricidad-mdx/${slug}` });
}

export default async function ElectricidadMdxTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = await getMdxBySlug("mdx-demo", slug);

  if (!topic) notFound();

  const StandardMdxComponent = isStandardMdxPipelineAvailable ? await loadStandardMdxComponent(slug) : null;

  return (
    <article className="space-y-6">
      <header className="space-y-2 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Demo de pipeline MDX estándar</p>
        <h1 className="text-3xl font-bold tracking-tight">{topic.frontmatter.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{topic.frontmatter.description}</p>
      </header>

      {StandardMdxComponent ? (
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <StandardMdxComponent />
        </div>
      ) : (
        <section className="space-y-4 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <h2 className="text-lg font-semibold">Pipeline MDX estándar no disponible en este entorno</h2>
          <p>
            No se pudieron cargar <code>@next/mdx</code>, <code>remark-math</code> o <code>rehype-katex</code>. Se mantiene el flujo actual sin romper build.
          </p>
          <p className="text-sm">
            Podés seguir usando el contenido clásico en <Link className="underline" href="/unidad/electricidad/ley-de-ohm">/unidad/electricidad/[slug]</Link>.
          </p>
        </section>
      )}
    </article>
  );
}
