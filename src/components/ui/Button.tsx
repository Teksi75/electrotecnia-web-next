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
  default: "bg-primary text-primary-foreground hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85 focus-visible:ring-2 focus-visible:ring-ring",
  outline: "border border-border bg-background text-foreground hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring",
  ghost: "bg-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
};

export function Button(props: ButtonAsButton | ButtonAsChild) {
  const variant = props.variant ?? "default";

  if (props.asChild) {
    const { children, className } = props;

    return React.cloneElement(children, {
      className: cn(
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none",
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
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none",
        variants[variant],
        className,
      )}
      {...buttonProps}
    />
  );
}
