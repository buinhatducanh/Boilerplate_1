import { Section } from "@/components/primitives";

// ============================================================
// LogoCloud – Dải logo đối tác/khách hàng.
// Dùng cho: Trust badges, partner logos, client logos.
// ============================================================

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

export interface LogoCloudProps {
  title?: string;
  logos: LogoItem[];
  background?: "default" | "muted";
}

export function LogoCloud({ title, logos, background = "default" }: LogoCloudProps) {
  return (
    <Section background={background} spacing="md">
      {title && (
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo, i) => {
          const img = (
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10"
            />
          );

          return logo.href ? (
            <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer">
              {img}
            </a>
          ) : (
            <div key={i}>{img}</div>
          );
        })}
      </div>
    </Section>
  );
}
