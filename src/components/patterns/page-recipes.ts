// ============================================================
// PAGE RECIPES – Công thức lắp ráp trang từ Blocks.
//
// Mỗi recipe là một mảng blocks theo thứ tự render.
// Team Dev chỉ cần chọn recipe → copy → thay data.
//
// CÁC KIỂU TRANG CHUẨN TRONG AGENCY:
// 1. Landing Page (marketing)
// 2. Corporate / Company website
// 3. Service Detail page
// 4. Portfolio / Projects page
// 5. About / Team page
// 6. Contact page
// 7. SaaS / Product page
// 8. Blog / Article listing
// ============================================================

export type BlockType =
  | "HeroCentered"
  | "HeroSplit"
  | "FeaturesGrid"
  | "FeaturesAlternating"
  | "CtaBanner"
  | "TestimonialsCarousel"
  | "PricingTable"
  | "StatsBar"
  | "FaqAccordion"
  | "GalleryGrid"
  | "TeamGrid"
  | "NewsletterBanner"
  | "LogoCloud"
  | "ContentWithImage";

export interface PageRecipe {
  name: string;
  description: string;
  blocks: { type: BlockType; note: string }[];
}

export const PAGE_RECIPES: Record<string, PageRecipe> = {
  // ─────────────────────────────────────────────────────
  // 1. LANDING PAGE – Trang đích marketing
  // ─────────────────────────────────────────────────────
  landing: {
    name: "Landing Page",
    description: "Trang marketing với mục tiêu conversion cao",
    blocks: [
      { type: "HeroCentered", note: "Hero full-width với CTA chính" },
      { type: "LogoCloud", note: "Logo đối tác/khách hàng → trust" },
      { type: "FeaturesGrid", note: "3-4 tính năng/lợi ích chính" },
      { type: "StatsBar", note: "4 con số nổi bật (clients, projects...)" },
      { type: "TestimonialsCarousel", note: "2-4 đánh giá khách hàng" },
      { type: "PricingTable", note: "2-3 gói dịch vụ/sản phẩm" },
      { type: "FaqAccordion", note: "5-8 câu hỏi thường gặp" },
      { type: "CtaBanner", note: "CTA cuối trang trước footer" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 2. CORPORATE – Website doanh nghiệp
  // ─────────────────────────────────────────────────────
  corporate: {
    name: "Corporate Website",
    description: "Website giới thiệu công ty chuẩn",
    blocks: [
      { type: "HeroSplit", note: "Hero 2 cột: tagline + ảnh công ty" },
      { type: "LogoCloud", note: "Khách hàng tiêu biểu" },
      { type: "FeaturesGrid", note: "Dịch vụ chính (3-6 items)" },
      { type: "ContentWithImage", note: "Giới thiệu công ty / sứ mệnh" },
      { type: "StatsBar", note: "Thành tựu: năm KN, dự án, khách hàng" },
      { type: "GalleryGrid", note: "Portfolio dự án nổi bật" },
      { type: "TestimonialsCarousel", note: "Khách hàng nói gì" },
      { type: "CtaBanner", note: "Liên hệ tư vấn" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 3. SERVICE DETAIL – Chi tiết dịch vụ
  // ─────────────────────────────────────────────────────
  serviceDetail: {
    name: "Service Detail",
    description: "Trang chi tiết 1 dịch vụ cụ thể",
    blocks: [
      { type: "HeroSplit", note: "Tên dịch vụ + ảnh minh họa" },
      { type: "FeaturesAlternating", note: "Các tính năng xen kẽ ảnh" },
      { type: "StatsBar", note: "Số liệu liên quan dịch vụ" },
      { type: "GalleryGrid", note: "Case studies sử dụng dịch vụ" },
      { type: "FaqAccordion", note: "FAQ về dịch vụ" },
      { type: "CtaBanner", note: "Đặt lịch tư vấn" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 4. PORTFOLIO – Danh sách dự án
  // ─────────────────────────────────────────────────────
  portfolio: {
    name: "Portfolio Page",
    description: "Trang showcase dự án/case studies",
    blocks: [
      { type: "HeroCentered", note: "Tiêu đề 'Dự án' + subtitle" },
      { type: "GalleryGrid", note: "Grid dự án với filter categories" },
      { type: "TestimonialsCarousel", note: "Client testimonials" },
      { type: "CtaBanner", note: "CTA liên hệ làm dự án" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 5. ABOUT / TEAM – Giới thiệu đội ngũ
  // ─────────────────────────────────────────────────────
  about: {
    name: "About Page",
    description: "Giới thiệu công ty và đội ngũ",
    blocks: [
      { type: "HeroSplit", note: "Story / sứ mệnh + ảnh team" },
      { type: "ContentWithImage", note: "Lịch sử / hành trình (reversed)" },
      { type: "StatsBar", note: "Thành tựu công ty" },
      { type: "TeamGrid", note: "Đội ngũ chủ chốt" },
      { type: "LogoCloud", note: "Đối tác chiến lược" },
      { type: "CtaBanner", note: "Tham gia đội ngũ / Liên hệ" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 6. CONTACT – Trang liên hệ
  // ─────────────────────────────────────────────────────
  contact: {
    name: "Contact Page",
    description: "Trang liên hệ với form + thông tin",
    blocks: [
      { type: "HeroCentered", note: "Tiêu đề liên hệ + subtitle" },
      { type: "ContentWithImage", note: "Form liên hệ + map/ảnh văn phòng" },
      { type: "FaqAccordion", note: "FAQ về quy trình làm việc" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 7. SAAS / PRODUCT – Trang sản phẩm SaaS
  // ─────────────────────────────────────────────────────
  saas: {
    name: "SaaS Product Page",
    description: "Landing page cho sản phẩm SaaS",
    blocks: [
      { type: "HeroCentered", note: "Product tagline + CTA signup" },
      { type: "LogoCloud", note: "Trusted by X companies" },
      { type: "FeaturesAlternating", note: "3 core features với screenshots" },
      { type: "StatsBar", note: "Users, uptime, response time" },
      { type: "PricingTable", note: "Free / Pro / Enterprise" },
      { type: "TestimonialsCarousel", note: "Customer reviews" },
      { type: "FaqAccordion", note: "Product FAQ" },
      { type: "NewsletterBanner", note: "Get updates / free trial" },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 8. BLOG LISTING – Danh sách bài viết
  // ─────────────────────────────────────────────────────
  blogListing: {
    name: "Blog Listing",
    description: "Trang liệt kê bài viết blog",
    blocks: [
      { type: "HeroCentered", note: "Tiêu đề Blog + search" },
      { type: "GalleryGrid", note: "Grid bài viết (cards)" },
      { type: "NewsletterBanner", note: "Subscribe blog updates" },
    ],
  },
};
