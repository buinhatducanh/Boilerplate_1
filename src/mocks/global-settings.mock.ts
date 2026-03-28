import type { GlobalSettings } from "@/types";

export const globalSettingsMock: GlobalSettings = {
  siteName: "Starter Agency",
  siteDescription: "Công ty thiết kế và phát triển web chuyên nghiệp",
  logo: "/images/logo.svg",
  favicon: "/favicon.ico",
  email: "hello@starteragency.com",
  phone: "+84 999 888 777",
  address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com/starteragency" },
    { platform: "instagram", url: "https://instagram.com/starteragency" },
    { platform: "linkedin", url: "https://linkedin.com/company/starteragency" },
  ],
  footerText: "© 2024 Starter Agency. All rights reserved.",
  googleAnalyticsId: "G-XXXXXXXXXX",
};
