import { Section, SectionHeader } from "@/components/primitives";
import { cn } from "@/lib/utils";

// ============================================================
// GalleryGrid – Lưới hình ảnh portfolio/gallery.
// Dùng cho: Portfolio, project showcase, image gallery.
// ============================================================

export interface GalleryImage {
  src: string;
  alt: string;
  href?: string;
  caption?: string;
}

export interface GalleryGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  cols?: 2 | 3 | 4;
}

export function GalleryGrid({
  badge,
  title,
  subtitle,
  images,
  cols = 3,
}: GalleryGridProps) {
  const colsClass: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className={cn("mt-12 grid gap-4", colsClass[cols])}>
        {images.map((image, i) => {
          const content = (
            <>
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full rounded-lg object-cover transition-transform hover:scale-105"
              />
              {image.caption && (
                <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
              )}
            </>
          );

          return image.href ? (
            <a key={i} href={image.href} className="group block overflow-hidden">
              {content}
            </a>
          ) : (
            <div key={i} className="overflow-hidden">{content}</div>
          );
        })}
      </div>
    </Section>
  );
}
