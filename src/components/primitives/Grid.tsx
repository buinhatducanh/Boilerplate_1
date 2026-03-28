import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ============================================================
// Grid – Layout grid chuẩn, responsive tự động.
// Dùng cho mọi block cần hiển thị nhiều cards/items.
// ============================================================

type GridCols = 1 | 2 | 3 | 4;
type GridGap = "sm" | "md" | "lg";

interface GridProps {
  children: ReactNode;
  cols?: GridCols;
  gap?: GridGap;
  className?: string;
}

const COLS_MAP: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const GAP_MAP: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({ children, cols = 3, gap = "md", className }: GridProps) {
  return (
    <div className={cn("grid", COLS_MAP[cols], GAP_MAP[gap], className)}>
      {children}
    </div>
  );
}
