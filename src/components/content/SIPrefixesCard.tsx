"use client";

import { useState } from "react";

import { InlineMath } from "@/components/content/InlineMath";
import { cn } from "@/lib/utils";

type SIPrefix = {
  name: string;
  symbol: string;
  exponentLatex: string;
};

const siPrefixes: SIPrefix[] = [
  { name: "Yotta", symbol: "Y", exponentLatex: "10^{24}" },
  { name: "Zetta", symbol: "Z", exponentLatex: "10^{21}" },
  { name: "Exa", symbol: "E", exponentLatex: "10^{18}" },
  { name: "Peta", symbol: "P", exponentLatex: "10^{15}" },
  { name: "Tera", symbol: "T", exponentLatex: "10^{12}" },
  { name: "Giga", symbol: "G", exponentLatex: "10^{9}" },
  { name: "Mega", symbol: "M", exponentLatex: "10^{6}" },
  { name: "kilo", symbol: "k", exponentLatex: "10^{3}" },
  { name: "hecto", symbol: "h", exponentLatex: "10^{2}" },
  { name: "deca", symbol: "da", exponentLatex: "10^{1}" },
  { name: "deci", symbol: "d", exponentLatex: "10^{-1}" },
  { name: "centi", symbol: "c", exponentLatex: "10^{-2}" },
  { name: "mili", symbol: "m", exponentLatex: "10^{-3}" },
  { name: "micro", symbol: "µ", exponentLatex: "10^{-6}" },
  { name: "nano", symbol: "n", exponentLatex: "10^{-9}" },
  { name: "pico", symbol: "p", exponentLatex: "10^{-12}" },
  { name: "femto", symbol: "f", exponentLatex: "10^{-15}" },
  { name: "atto", symbol: "a", exponentLatex: "10^{-18}" },
  { name: "zepto", symbol: "z", exponentLatex: "10^{-21}" },
  { name: "yocto", symbol: "y", exponentLatex: "10^{-24}" },
];

const chipBaseClassName =
  "rounded-xl border border-border/80 bg-card/80 px-3 py-1 font-mono text-sm text-foreground transition hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SIPrefixesCard() {
  const [selectedPrefix, setSelectedPrefix] = useState<SIPrefix>(siPrefixes[7]);

  return (
    <section className="surface-panel rounded-2xl p-5">
      <h2 className="text-2xl font-semibold">Múltiplos y submúltiplos (SI)</h2>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Prefijos SI comunes">
        {siPrefixes.map((prefix) => {
          const isSelected = selectedPrefix.symbol === prefix.symbol;

          return (
            <li key={prefix.symbol}>
              <button
                type="button"
                className={cn(
                  chipBaseClassName,
                  isSelected && "border-[var(--highlight)] bg-accent text-foreground",
                )}
                onClick={() => setSelectedPrefix(prefix)}
                aria-pressed={isSelected}
              >
                {prefix.name} ({prefix.symbol})
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {selectedPrefix.name} — {selectedPrefix.symbol} — <InlineMath latex={selectedPrefix.exponentLatex} />
      </p>
    </section>
  );
}
