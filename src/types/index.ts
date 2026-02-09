export type NavItem = {
  title: string;
  href: string;
};

export type ContentBlock = {
  type: "idea" | "explain" | "example" | "formulas";
  title: string;
  body?: string;
  mono?: boolean;
  items?: string[];
};

export type ContentSectionData = {
  id: string;
  title: string;
  blocks: ContentBlock[];
};

export type TopicContent = {
  title: string;
  part: 1 | 2;
  order: number;
  description: string;
  blocks: ContentBlock[];
  sections?: ContentSectionData[];
};
