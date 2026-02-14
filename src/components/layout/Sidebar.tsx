"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getSectionNodes } from "@/lib/nav";
import type { ContentNode } from "@/content/nav";

import { Collapsible } from "@/components/ui/Collapsible";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

function isNodeActive(pathname: string, href: string) {
  const baseHref = href.split("#")[0];
  return pathname === baseHref;
}

function NodeItem({
  node,
  pathname,
  depth,
  onNavigate,
}: {
  node: ContentNode;
  pathname: string;
  depth: number;
  onNavigate?: () => void;
}) {
  const active = isNodeActive(pathname, node.href);

  return (
    <li>
      <Link
        href={node.href}
        onClick={onNavigate}
        className={cn(
          "block rounded-md px-2 py-1.5 text-sm transition-colors",
          depth > 0 && "ml-3",
          node.isPage && "font-medium",
          active
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
        )}
      >
        {node.title}
      </Link>
      {node.children?.length ? (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => (
            <NodeItem
              key={child.href}
              node={child}
              pathname={pathname}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const sections = getSectionNodes();

  return (
    <aside className={cn("space-y-4", className)} aria-label="Indice de temas">
      {sections.map((section) => (
        <Collapsible key={section.slug} title={section.title} defaultOpen>
          <ul className="mt-2 space-y-1">
            {section.children.map((node) => (
              <NodeItem
                key={node.href}
                node={node}
                pathname={pathname}
                depth={0}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </Collapsible>
      ))}
    </aside>
  );
}
