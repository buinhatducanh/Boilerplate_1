import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ============================================================
// Card – Thẻ hiển thị nội dung chuẩn.
// Variants: default (border), elevated (shadow), ghost (no border).
// ============================================================

type CardVariant = "default" | "elevated" | "ghost";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  href?: string;
}

const VARIANT_MAP: Record<CardVariant, string> = {
  default: "rounded-lg border bg-card p-6",
  elevated: "rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow",
  ghost: "rounded-lg p-6",
};

export function Card({ children, variant = "default", className, href }: CardProps) {
  const classes = cn(VARIANT_MAP[variant], className);

  if (href) {
    return (
      <a href={href} className={cn(classes, "block no-underline")}>
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}

// Sub-components cho cấu trúc Card nội bộ
export function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-video w-full rounded-md object-cover", className)}
    />
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}
