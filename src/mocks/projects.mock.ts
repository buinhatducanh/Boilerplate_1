import type { Project } from "@/types";

export const projectsMock: Project[] = [
  {
    id: 1,
    title: "Website Bất động sản XYZ",
    slug: "bat-dong-san-xyz",
    description: "Thiết kế và phát triển website giới thiệu dự án bất động sản cao cấp.",
    thumbnail: "/images/project-01-thumb.jpg",
    images: ["/images/project-01-1.jpg", "/images/project-01-2.jpg"],
    client: "Công ty BĐS XYZ",
    category: "Corporate Website",
    techStack: ["NextJS", "Strapi", "TailwindCSS"],
    liveUrl: "https://example.com",
    completedAt: "2024-06-15",
  },
  {
    id: 2,
    title: "Nền tảng E-learning ABC",
    slug: "e-learning-abc",
    description: "Nền tảng học trực tuyến với hệ thống quản lý khóa học.",
    thumbnail: "/images/project-02-thumb.jpg",
    images: ["/images/project-02-1.jpg", "/images/project-02-2.jpg"],
    client: "Tổ chức Giáo dục ABC",
    category: "Web Application",
    techStack: ["NextJS", "Supabase", "Stripe"],
    liveUrl: "https://example.com",
    completedAt: "2024-09-20",
  },
];
