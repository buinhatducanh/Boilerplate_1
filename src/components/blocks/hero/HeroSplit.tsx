import { Section, Button } from "@/components/primitives";

// ============================================================
// HeroSplit – Hero 2 cột: text trái + image phải.
// Dùng cho: SaaS landing, product page, about page.
// ============================================================

export interface HeroSplitProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  reversed?: boolean; // Image bên trái, text bên phải
}

export function HeroSplit({
  title,
  subtitle,
  image,
  imageAlt = "",
  primaryCta,
  secondaryCta,
  reversed = false,
}: HeroSplitProps) {
  return (
    <Section spacing="xl">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className={reversed ? "lg:order-2" : ""}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-6 text-lg text-muted-foreground">{subtitle}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {primaryCta && (
                <Button size="lg" href={primaryCta.href}>{primaryCta.text}</Button>
              )}
              {secondaryCta && (
                <Button variant="outline" size="lg" href={secondaryCta.href}>
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <img
            src={image}
            alt={imageAlt}
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg"
          />
        </div>
      </div>
    </Section>
  );
}
