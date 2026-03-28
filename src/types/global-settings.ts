// ============================================================
// GlobalSettings – Cấu hình chung toàn site
// CMS Collection: global-setting (Single Type)
// ============================================================

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "youtube";
  url: string;
}

export interface GlobalSettings {
  siteName: string;
  siteDescription: string;
  logo: string;          // URL ảnh logo
  favicon: string;       // URL favicon
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
  footerText: string;
  googleAnalyticsId?: string;
}
