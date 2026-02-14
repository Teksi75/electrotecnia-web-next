import type { InlineToken } from "@/lib/mathTokens";

export type NavItem = {
  title: string;
  href: string;
};

export type ParagraphNode = {
  kind: "paragraph";
  tokens: InlineToken[];
  mono?: boolean;
};

export type MathBlockNode = {
  kind: "mathBlock";
  latex: string;
};

export type ContentNode = ParagraphNode | MathBlockNode;

export type ContentBlock = {
  type: "idea" | "explain" | "example" | "ideaClave" | "explicacion" | "ejemplo" | "formulas";
  title: string;
  body?: string;
  bodyTokens?: InlineToken[];
  nodes?: ContentNode[];
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
