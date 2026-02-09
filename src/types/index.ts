export type NavItem = {
  title: string;
  href: string;
};

export type ContentNode = {
  title: string;
  slug: string;
  part: 1 | 2;
  order: number;
  description: string;
  href: string;
  children?: ContentNode[];
  isPage: boolean;
};

export type ContentSection = {
  title: string;
  slug: string;
  part: 1 | 2;
  order: number;
  description: string;
  href: string;
  isPage: false;
  children: ContentNode[];
};

export type ContentBlock = {
  type: "idea" | "explain" | "example" | "formulas";
  title: string;
  body?: string;
  mono?: boolean;
  items?: string[];
};

export type TopicSection = {
  id: string;
  title: string;
  blocks: ContentBlock[];
};

export type TopicDocument = {
  title: string;
  part: 1 | 2;
  order: number;
  description: string;
  blocks: ContentBlock[];
  sections?: TopicSection[];
};
