import { Section, SectionHeader, Grid, Card } from "@/components/primitives";

// ============================================================
// FeaturesGrid – Lưới features/services dạng icon + text.
// Dùng cho: Services listing, features section, benefits.
// ============================================================

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

export interface FeaturesGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  cols?: 2 | 3 | 4;
  background?: "default" | "muted";
}

export function FeaturesGrid({
  badge,
  title,
  subtitle,
  features,
  cols = 3,
  background = "default",
}: FeaturesGridProps) {
  return (
    <Section background={background}>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <Grid cols={cols} className="mt-12">
        {features.map((feature, i) => (
          <Card key={i} variant="ghost" className="text-center">
            {feature.icon && (
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary">
                {feature.icon}
              </div>
            )}
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
