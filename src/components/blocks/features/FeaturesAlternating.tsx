import { Section, SectionHeader, Button } from "@/components/primitives";

// ============================================================
// FeaturesAlternating – Feature rows xen kẽ image trái/phải.
// Dùng cho: Product features, how-it-works, process steps.
// ============================================================

export interface AlternatingFeature {
  title: string;
  description: string;
  image: string;
  cta?: { text: string; href: string };
  bullets?: string[];
}

export interface FeaturesAlternatingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: AlternatingFeature[];
}

export function FeaturesAlternating({
  badge,
  title,
  subtitle,
  features,
}: FeaturesAlternatingProps) {
  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className="mt-16 space-y-24">
        {features.map((feature, i) => (
          <div
            key={i}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="mt-4 text-muted-foreground">{feature.description}</p>
              {feature.bullets && (
                <ul className="mt-4 space-y-2">
                  {feature.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {feature.cta && (
                <Button variant="outline" className="mt-6" href={feature.cta.href}>
                  {feature.cta.text}
                </Button>
              )}
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <img
                src={feature.image}
                alt={feature.title}
                className="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
