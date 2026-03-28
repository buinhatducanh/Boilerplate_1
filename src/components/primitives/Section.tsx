import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ============================================================
// Section – Wrapper chuẩn cho mọi block.
// Đảm bảo spacing, max-width, padding nhất quán toàn site.
// ============================================================

type SectionBackground = "default" | "muted" | "primary" | "dark";
type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  container?: boolean;
  id?: string;
}

const BG_MAP: Record<SectionBackground, string> = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary text-primary-foreground",
  dark: "bg-foreground text-background",
};

const SPACING_MAP: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

export function Section({
  children,
  className,
  background = "default",
  spacing = "lg",
  container = true,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(BG_MAP[background], SPACING_MAP[spacing], className)}>
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
