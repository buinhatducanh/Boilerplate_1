import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Global Settings
  await prisma.globalSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
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
    },
  });

  // Banners
  const banners = [
    {
      title: "Thiết kế Website Chuyên nghiệp",
      subtitle: "Giải pháp số toàn diện cho doanh nghiệp của bạn",
      image: "/images/banner-01.jpg",
      ctaText: "Liên hệ ngay",
      ctaLink: "/contact",
      isActive: true,
      order: 1,
    },
    {
      title: "Phát triển Ứng dụng Web",
      subtitle: "ReactJS, NextJS, và các công nghệ hiện đại",
      image: "/images/banner-02.jpg",
      ctaText: "Xem dịch vụ",
      ctaLink: "/services",
      isActive: true,
      order: 2,
    },
  ];

  for (const banner of banners) {
    await prisma.banner.create({ data: banner });
  }

  // Services
  const services = [
    {
      title: "Thiết kế UI/UX",
      slug: "thiet-ke-ui-ux",
      description: "Thiết kế giao diện người dùng trực quan và trải nghiệm mượt mà.",
      icon: "palette",
      image: "/images/service-uiux.jpg",
      features: ["Wireframe & Prototype", "Design System", "User Research", "Responsive Design"],
      order: 1,
    },
    {
      title: "Phát triển Frontend",
      slug: "phat-trien-frontend",
      description: "Xây dựng giao diện web hiệu năng cao với ReactJS/NextJS.",
      icon: "code",
      image: "/images/service-frontend.jpg",
      features: ["ReactJS / NextJS", "TypeScript", "Performance Optimization", "SEO Friendly"],
      order: 2,
    },
    {
      title: "Headless CMS Integration",
      slug: "headless-cms",
      description: "Tích hợp hệ thống quản trị nội dung không đầu linh hoạt.",
      icon: "database",
      image: "/images/service-cms.jpg",
      features: ["Strapi", "Directus", "Supabase", "Content Modeling"],
      order: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Projects
  const projects = [
    {
      title: "Website Bất động sản XYZ",
      slug: "bat-dong-san-xyz",
      description: "Thiết kế và phát triển website giới thiệu dự án bất động sản cao cấp.",
      thumbnail: "/images/project-01-thumb.jpg",
      images: ["/images/project-01-1.jpg", "/images/project-01-2.jpg"],
      client: "Công ty BĐS XYZ",
      category: "Corporate Website",
      techStack: ["NextJS", "Strapi", "TailwindCSS"],
      liveUrl: "https://example.com",
      completedAt: new Date("2024-06-15"),
    },
    {
      title: "Nền tảng E-learning ABC",
      slug: "e-learning-abc",
      description: "Nền tảng học trực tuyến với hệ thống quản lý khóa học.",
      thumbnail: "/images/project-02-thumb.jpg",
      images: ["/images/project-02-1.jpg", "/images/project-02-2.jpg"],
      client: "Tổ chức Giáo dục ABC",
      category: "Web Application",
      techStack: ["NextJS", "Supabase", "Stripe"],
      liveUrl: "https://example.com",
      completedAt: new Date("2024-09-20"),
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
