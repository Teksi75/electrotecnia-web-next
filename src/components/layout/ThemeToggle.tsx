"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-9 rounded-full border border-border/80 px-3 text-xs uppercase tracking-[0.12em]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar modo claro/oscuro"
    >
      {isDark ? "Modo Claro" : "Modo Oscuro"}
    </Button>
  );
}
