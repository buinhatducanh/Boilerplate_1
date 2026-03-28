import { Section, SectionHeader, Grid, Card, Button, Badge } from "@/components/primitives";
import { cn } from "@/lib/utils";

// ============================================================
// PricingTable – Bảng giá dạng cards.
// Dùng cho: SaaS pricing, service packages, plans.
// ============================================================

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { text: string; href: string };
  isPopular?: boolean;
}

export interface PricingTableProps {
  badge?: string;
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export function PricingTable({ badge, title, subtitle, plans }: PricingTableProps) {
  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <Grid cols={plans.length <= 3 ? (plans.length as 2 | 3) : 3} gap="lg" className="mt-12">
        {plans.map((plan, i) => (
          <Card
            key={i}
            variant={plan.isPopular ? "elevated" : "default"}
            className={cn(
              "flex flex-col",
              plan.isPopular && "ring-2 ring-primary",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {plan.isPopular && <Badge variant="primary">Phổ biến</Badge>}
            </div>

            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && (
                <span className="text-muted-foreground">/{plan.period}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.isPopular ? "primary" : "outline"}
              fullWidth
              className="mt-8"
              href={plan.cta.href}
            >
              {plan.cta.text}
            </Button>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
