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
      className="h-9 px-3"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar modo claro/oscuro"
    >
      {isDark ? "Claro" : "Oscuro"}
    </Button>
  );
}
