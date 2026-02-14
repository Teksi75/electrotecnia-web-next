import { cache } from "react";

import { getAllMdxSlugs, getMdxBySlug } from "@/lib/mdx";
import { parseMdxSections } from "@/lib/mdxSections";
import type { TopicContent } from "@/types";

export const getAllTopicSlugs = cache(async () => getAllMdxSlugs("electricidad"));

async function readTopicContentBySlug(slug: string): Promise<TopicContent | null> {
  const mdxTopic = await getMdxBySlug("electricidad", slug);

  if (!mdxTopic) {
    return null;
  }

  return {
    title: mdxTopic.frontmatter.title,
    description: mdxTopic.frontmatter.description,
    part: mdxTopic.frontmatter.part,
    order: mdxTopic.frontmatter.order,
    ...parseMdxSections(mdxTopic.content),
  };
}

export const getTopicContentBySlug = cache(async (slug: string): Promise<TopicContent | null> => readTopicContentBySlug(slug));

