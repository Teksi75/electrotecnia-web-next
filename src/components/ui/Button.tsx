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
  solid: "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300",
  outline:
    "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
};

export function Button(props: ButtonAsButton | ButtonAsChild) {
  const variant = props.variant ?? "solid";

  if (props.asChild) {
    const { children, className } = props;

    return React.cloneElement(children, {
      className: cn(
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors",
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
        "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors",
        variants[variant],
        className,
      )}
      {...buttonProps}
    />
  );
}
