import { electricidadNav } from "@/content/nav";
import type { ContentNode } from "@/types";

function walkNodes(nodes: ContentNode[], includeAnchors: boolean): ContentNode[] {
  const results: ContentNode[] = [];

  for (const node of nodes) {
    if (node.isPage || includeAnchors) {
      results.push(node);
    }

    if (node.children?.length) {
      results.push(...walkNodes(node.children, includeAnchors));
    }
  }

  return results;
}

export function getSectionNodes() {
  return electricidadNav;
}

export function getTopicNodes() {
  return electricidadNav.flatMap((section) => walkNodes(section.children, false));
}

export function getPageNodes() {
  return getTopicNodes().filter((node) => node.isPage);
}

export function getTopicBySlug(slug: string) {
  return getTopicNodes().find((node) => node.slug === slug) ?? null;
}

export function getPartFirstTopic(part: 1 | 2) {
  const section = electricidadNav.find((item) => item.part === part);
  return section?.children.find((node) => node.isPage) ?? null;
}

export function getPrevNextBySlug(slug: string) {
  const topics = getPageNodes();
  const index = topics.findIndex((node) => node.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: topics[index - 1] ?? null,
    next: topics[index + 1] ?? null,
  };
}
