import type { Banner } from "@/types";

export const bannersMock: Banner[] = [
  {
    id: 1,
    title: "Thiết kế Website Chuyên nghiệp",
    subtitle: "Giải pháp số toàn diện cho doanh nghiệp của bạn",
    image: "/images/banner-01.jpg",
    ctaText: "Liên hệ ngay",
    ctaLink: "/contact",
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    title: "Phát triển Ứng dụng Web",
    subtitle: "ReactJS, NextJS, và các công nghệ hiện đại",
    image: "/images/banner-02.jpg",
    ctaText: "Xem dịch vụ",
    ctaLink: "/services",
    isActive: true,
    order: 2,
  },
];
