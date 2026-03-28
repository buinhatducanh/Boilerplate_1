import { cn } from "@/lib/utils";

// ============================================================
// SectionHeader – Tiêu đề chuẩn cho mọi block section.
// Badge (optional) + Title + Subtitle
// ============================================================

type Alignment = "left" | "center" | "right";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: Alignment;
  className?: string;
}

const ALIGN_MAP: Record<Alignment, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", ALIGN_MAP[align], className)}>
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
