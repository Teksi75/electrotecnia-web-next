"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type SIPrefix = {
  name: string;
  symbol: string;
  exponent: string;
};

const siPrefixes: SIPrefix[] = [
  { name: "Yotta", symbol: "Y", exponent: "10^24" },
  { name: "Zetta", symbol: "Z", exponent: "10^21" },
  { name: "Exa", symbol: "E", exponent: "10^18" },
  { name: "Peta", symbol: "P", exponent: "10^15" },
  { name: "Tera", symbol: "T", exponent: "10^12" },
  { name: "Giga", symbol: "G", exponent: "10^9" },
  { name: "Mega", symbol: "M", exponent: "10^6" },
  { name: "kilo", symbol: "k", exponent: "10^3" },
  { name: "hecto", symbol: "h", exponent: "10^2" },
  { name: "deca", symbol: "da", exponent: "10^1" },
  { name: "deci", symbol: "d", exponent: "10^-1" },
  { name: "centi", symbol: "c", exponent: "10^-2" },
  { name: "mili", symbol: "m", exponent: "10^-3" },
  { name: "micro", symbol: "µ", exponent: "10^-6" },
  { name: "nano", symbol: "n", exponent: "10^-9" },
  { name: "pico", symbol: "p", exponent: "10^-12" },
  { name: "femto", symbol: "f", exponent: "10^-15" },
  { name: "atto", symbol: "a", exponent: "10^-18" },
  { name: "zepto", symbol: "z", exponent: "10^-21" },
  { name: "yocto", symbol: "y", exponent: "10^-24" },
];

const chipBaseClassName =
  "rounded-md border border-border px-3 py-1 font-mono text-sm text-foreground transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SIPrefixesCard() {
  const [selectedPrefix, setSelectedPrefix] = useState<SIPrefix>(siPrefixes[7]);

  return (
    <section className="rounded-xl border border-border p-5">
      <h2 className="text-xl font-semibold">Múltiplos y submúltiplos (SI)</h2>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Prefijos SI comunes">
        {siPrefixes.map((prefix) => {
          const isSelected = selectedPrefix.symbol === prefix.symbol;

          return (
            <li key={prefix.symbol}>
              <button
                type="button"
                className={cn(
                  chipBaseClassName,
                  isSelected && "border-primary bg-primary/10 text-foreground",
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
        {selectedPrefix.name} — {selectedPrefix.symbol} — {selectedPrefix.exponent}
      </p>
    </section>
  );
}
