import * as React from "react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

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
  solid: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
  ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
};

export function Button(props: ButtonAsButton | ButtonAsChild) {
  const variant = props.variant ?? "solid";

  if (props.asChild) {
    const { children, className } = props;

    return React.cloneElement(children, {
      className: cn(
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants[variant],
        className,
      )}
      {...buttonProps}
    />
  );
}
