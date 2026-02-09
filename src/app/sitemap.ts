import type { MetadataRoute } from "next";

import { getTopicNodes } from "@/lib/nav";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls = getTopicNodes().map((topic) => ({
    url: `${BASE_URL}${topic.href}`,
    lastModified: now,
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: now },
    { url: `${BASE_URL}/unidad/electricidad`, lastModified: now },
    ...urls,
  ];
}
