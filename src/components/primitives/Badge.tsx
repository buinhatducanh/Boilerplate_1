import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ============================================================
// Badge – Nhãn nhỏ hiển thị trạng thái, category, tag.
// ============================================================

type BadgeVariant = "default" | "primary" | "secondary" | "outline" | "destructive";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_MAP: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-input text-foreground",
  destructive: "bg-destructive/10 text-destructive",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANT_MAP[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
