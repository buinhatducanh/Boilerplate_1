import { Section, Button } from "@/components/primitives";

// ============================================================
// ContentWithImage – Nội dung + hình ảnh 2 cột.
// Dùng cho: About, mission, vision, any text+image section.
// ============================================================

export interface ContentWithImageProps {
  badge?: string;
  title: string;
  content: string;
  image: string;
  imageAlt?: string;
  cta?: { text: string; href: string };
  reversed?: boolean;
  background?: "default" | "muted";
}

export function ContentWithImage({
  badge,
  title,
  content,
  image,
  imageAlt = "",
  cta,
  reversed = false,
  background = "default",
}: ContentWithImageProps) {
  return (
    <Section background={background}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className={reversed ? "lg:order-2" : ""}>
          {badge && (
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <div
            className="mt-4 space-y-4 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {cta && (
            <Button className="mt-6" href={cta.href}>
              {cta.text}
            </Button>
          )}
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <img
            src={image}
            alt={imageAlt}
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
          />
        </div>
      </div>
    </Section>
  );
}
