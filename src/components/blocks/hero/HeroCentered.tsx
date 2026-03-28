import { Section } from "@/components/primitives";
import { Button } from "@/components/primitives";
import { cn } from "@/lib/utils";

// ============================================================
// HeroCentered – Hero layout căn giữa, phổ biến nhất.
// Dùng cho: Landing page, trang giới thiệu, marketing.
// ============================================================

export interface HeroCenteredProps {
  title: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  backgroundImage?: string;
  className?: string;
}

export function HeroCentered({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  className,
}: HeroCenteredProps) {
  return (
    <Section
      spacing="xl"
      container={false}
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center",
        backgroundImage && "text-white",
        className,
      )}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">{subtitle}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {primaryCta && (
              <Button size="lg" href={primaryCta.href}>
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" href={secondaryCta.href}>
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
