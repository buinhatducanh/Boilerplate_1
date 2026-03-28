// ============================================================
// Banner – Hero banners / Sliders
// CMS Collection: banners
// ============================================================

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;         // URL ảnh banner
  ctaText?: string;      // Text nút CTA
  ctaLink?: string;      // Link nút CTA
  isActive: boolean;
  order: number;
}
