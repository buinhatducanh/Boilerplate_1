import { Section, Button } from "@/components/primitives";

// ============================================================
// CtaBanner – Call to Action dạng banner full-width.
// Dùng cho: Giữa page để break content, cuối page trước footer.
// ============================================================

export interface CtaBannerProps {
  title: string;
  subtitle?: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  background?: "primary" | "dark" | "muted";
}

export function CtaBanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  background = "primary",
}: CtaBannerProps) {
  const isPrimary = background === "primary";

  return (
    <Section background={background}>
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{subtitle}</p>}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            variant={isPrimary ? "secondary" : "primary"}
            href={primaryCta.href}
          >
            {primaryCta.text}
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" href={secondaryCta.href}>
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
