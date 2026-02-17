import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "surface-panel rounded-2xl p-5 text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}
