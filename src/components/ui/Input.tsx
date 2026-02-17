import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted-foreground shadow-[0_8px_22px_-18px_var(--shadow-color)] focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
