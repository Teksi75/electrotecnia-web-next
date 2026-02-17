import * as React from "react";

import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost";

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: false;
};

type ButtonAsChild = {
  variant?: Variant;
  asChild: true;
  className?: string;
  children: React.ReactElement<{ className?: string }>;
};

const variants: Record<Variant, string> = {
  default:
    "border border-transparent bg-[var(--brand-strong)] text-primary-foreground shadow-[0_12px_30px_-18px_var(--shadow-color)] hover:brightness-110",
  secondary:
    "border border-border/80 bg-secondary text-secondary-foreground hover:bg-accent",
  outline:
    "border border-border bg-card text-foreground hover:border-[var(--highlight)] hover:bg-accent",
  ghost:
    "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
};

export function Button(props: ButtonAsButton | ButtonAsChild) {
  const variant = props.variant ?? "default";

  if (props.asChild) {
    const { children, className } = props;

    return React.cloneElement(children, {
      className: cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        className,
        children.props.className,
      ),
    });
  }

  const { className, ...buttonProps } = props;

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        className,
      )}
      {...buttonProps}
    />
  );
}
