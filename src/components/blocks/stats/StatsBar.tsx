import { Section } from "@/components/primitives";

// ============================================================
// StatsBar – Thanh thống kê con số nổi bật.
// Dùng cho: Social proof, company milestones, achievements.
// ============================================================

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBarProps {
  stats: StatItem[];
  background?: "default" | "muted" | "primary" | "dark";
}

export function StatsBar({ stats, background = "muted" }: StatsBarProps) {
  return (
    <Section background={background} spacing="md">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
