import type { Service } from "@/types";

export const servicesMock: Service[] = [
  {
    id: 1,
    title: "Thiết kế UI/UX",
    slug: "thiet-ke-ui-ux",
    description: "Thiết kế giao diện người dùng trực quan và trải nghiệm mượt mà.",
    icon: "palette",
    image: "/images/service-uiux.jpg",
    features: ["Wireframe & Prototype", "Design System", "User Research", "Responsive Design"],
    order: 1,
  },
  {
    id: 2,
    title: "Phát triển Frontend",
    slug: "phat-trien-frontend",
    description: "Xây dựng giao diện web hiệu năng cao với ReactJS/NextJS.",
    icon: "code",
    image: "/images/service-frontend.jpg",
    features: ["ReactJS / NextJS", "TypeScript", "Performance Optimization", "SEO Friendly"],
    order: 2,
  },
  {
    id: 3,
    title: "Headless CMS Integration",
    slug: "headless-cms",
    description: "Tích hợp hệ thống quản trị nội dung không đầu linh hoạt.",
    icon: "database",
    image: "/images/service-cms.jpg",
    features: ["Strapi", "Directus", "Supabase", "Content Modeling"],
    order: 3,
  },
];
