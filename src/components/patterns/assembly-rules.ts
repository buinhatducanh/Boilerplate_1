// ============================================================
// ASSEMBLY RULES ENGINE
//
// Bộ quy tắc lắp ráp tự động – AI hoặc Dev đọc file này
// để biết CÁCH ghép blocks sao cho đúng logic thiết kế.
//
// Mỗi rule là 1 constraint mà mọi trang phải tuân thủ.
// ============================================================

import type { BlockType } from "./page-recipes";

// ─────────────────────────────────────────────────────
// RULE 1: Block Ordering Constraints
// Thứ tự blocks trong một trang.
// ─────────────────────────────────────────────────────

export const ORDERING_RULES: Record<string, string> = {
  "MUST_BE_FIRST": "Hero block (HeroCentered | HeroSplit) LUÔN là block đầu tiên.",
  "MUST_BE_LAST": "CtaBanner hoặc NewsletterBanner LUÔN là block cuối cùng (trước footer).",
  "LOGOS_AFTER_HERO": "LogoCloud nên đặt ngay sau Hero để tạo trust sớm.",
  "STATS_BEFORE_CTA": "StatsBar nên đặt trước CtaBanner để reinforce value.",
  "FAQ_NEAR_END": "FaqAccordion nên đặt gần cuối trang, trước CTA cuối.",
  "TESTIMONIALS_MIDDLE": "TestimonialsCarousel đặt giữa trang, sau features.",
};

// ─────────────────────────────────────────────────────
// RULE 2: Block Compatibility Matrix
// Block nào KHÔNG nên đặt cạnh nhau.
// ─────────────────────────────────────────────────────

export const INCOMPATIBLE_ADJACENT: [BlockType, BlockType][] = [
  ["HeroCentered", "HeroSplit"],           // Không 2 hero liên tiếp
  ["CtaBanner", "CtaBanner"],              // Không 2 CTA liên tiếp
  ["PricingTable", "PricingTable"],        // Không 2 pricing tables
  ["StatsBar", "StatsBar"],                // Không 2 stats bars
  ["NewsletterBanner", "CtaBanner"],       // Cùng mục đích → chọn 1
  ["TestimonialsCarousel", "TestimonialsCarousel"],
  ["FeaturesGrid", "FeaturesGrid"],        // Dùng FeaturesAlternating thay thế
];

// ─────────────────────────────────────────────────────
// RULE 3: Background Alternation
// Xen kẽ background để tạo visual rhythm.
// ─────────────────────────────────────────────────────

export const BACKGROUND_RULES: Record<string, string> = {
  "ALTERNATE": "Không đặt 3+ blocks liên tiếp cùng background color.",
  "HERO_CUSTOM": "Hero luôn có background riêng (image hoặc primary).",
  "CTA_CONTRAST": "CtaBanner dùng background 'primary' hoặc 'dark' để nổi bật.",
  "FAQ_MUTED": "FaqAccordion nên dùng background 'default' (trắng).",
  "STATS_STANDOUT": "StatsBar dùng background khác section trước/sau nó.",
  "PATTERN": "Pattern chuẩn: default → muted → default → primary → default.",
};

// ─────────────────────────────────────────────────────
// RULE 4: Spacing Rules
// Khoảng cách giữa các sections.
// ─────────────────────────────────────────────────────

export const SPACING_RULES: Record<string, string> = {
  "HERO_SPACING": "Hero dùng spacing='xl' (lớn nhất).",
  "STATS_COMPACT": "StatsBar dùng spacing='md' (compact hơn).",
  "CTA_COMPACT": "CtaBanner dùng spacing='md'.",
  "LOGO_COMPACT": "LogoCloud dùng spacing='md'.",
  "DEFAULT": "Các blocks còn lại dùng spacing='lg'.",
};

// ─────────────────────────────────────────────────────
// RULE 5: Data Density per Block
// Số lượng items tối ưu cho mỗi block.
// ─────────────────────────────────────────────────────

export const DATA_DENSITY: Record<BlockType, { min: number; optimal: number; max: number; unit: string }> = {
  HeroCentered: { min: 1, optimal: 1, max: 1, unit: "hero" },
  HeroSplit: { min: 1, optimal: 1, max: 1, unit: "hero" },
  FeaturesGrid: { min: 3, optimal: 4, max: 8, unit: "features" },
  FeaturesAlternating: { min: 2, optimal: 3, max: 5, unit: "features" },
  CtaBanner: { min: 1, optimal: 1, max: 1, unit: "cta" },
  TestimonialsCarousel: { min: 2, optimal: 3, max: 6, unit: "testimonials" },
  PricingTable: { min: 2, optimal: 3, max: 4, unit: "plans" },
  StatsBar: { min: 3, optimal: 4, max: 6, unit: "stats" },
  FaqAccordion: { min: 3, optimal: 6, max: 10, unit: "questions" },
  GalleryGrid: { min: 3, optimal: 6, max: 12, unit: "images" },
  TeamGrid: { min: 2, optimal: 4, max: 8, unit: "members" },
  NewsletterBanner: { min: 1, optimal: 1, max: 1, unit: "form" },
  LogoCloud: { min: 4, optimal: 6, max: 10, unit: "logos" },
  ContentWithImage: { min: 1, optimal: 1, max: 1, unit: "content" },
};

// ─────────────────────────────────────────────────────
// RULE 6: Responsive Grid Mapping
// Số columns tối ưu per block theo screen size.
// ─────────────────────────────────────────────────────

export const GRID_MAPPING: Partial<Record<BlockType, { mobile: number; tablet: number; desktop: number }>> = {
  FeaturesGrid: { mobile: 1, tablet: 2, desktop: 3 },
  GalleryGrid: { mobile: 1, tablet: 2, desktop: 3 },
  TeamGrid: { mobile: 1, tablet: 2, desktop: 3 },
  PricingTable: { mobile: 1, tablet: 2, desktop: 3 },
};

// ─────────────────────────────────────────────────────
// RULE 7: Hero Selection Decision Tree
// Chọn hero nào dựa trên loại trang.
// ─────────────────────────────────────────────────────

export const HERO_DECISION: Record<string, { block: "HeroCentered" | "HeroSplit"; reason: string }> = {
  "landing": { block: "HeroCentered", reason: "Focus hoàn toàn vào CTA, không bị chia sẻ chú ý." },
  "corporate": { block: "HeroSplit", reason: "Cần ảnh minh họa bên cạnh để tạo trust." },
  "serviceDetail": { block: "HeroSplit", reason: "Hiển thị ảnh dịch vụ ngay từ đầu." },
  "portfolio": { block: "HeroCentered", reason: "Giữ đơn giản, let the work speak." },
  "about": { block: "HeroSplit", reason: "Ảnh team/office tạo human connection." },
  "contact": { block: "HeroCentered", reason: "Đơn giản, focus vào form phía dưới." },
  "saas": { block: "HeroCentered", reason: "Product screenshot/video đặt riêng bên dưới." },
  "blogListing": { block: "HeroCentered", reason: "Search bar + category filter thay vì ảnh." },
};

// ─────────────────────────────────────────────────────
// VALIDATOR: Kiểm tra 1 page config có đúng rules không
// ─────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

export function validatePageBlocks(blocks: BlockType[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (blocks.length === 0) {
    errors.push("Page phải có ít nhất 1 block.");
    return { valid: false, warnings, errors };
  }

  // Rule 1: First block must be Hero
  if (!blocks[0].startsWith("Hero")) {
    errors.push("Block đầu tiên phải là HeroCentered hoặc HeroSplit.");
  }

  // Rule 1: Last block should be CTA or Newsletter
  const last = blocks[blocks.length - 1];
  if (last !== "CtaBanner" && last !== "NewsletterBanner") {
    warnings.push("Block cuối nên là CtaBanner hoặc NewsletterBanner.");
  }

  // Rule 2: No incompatible adjacent blocks
  for (let i = 0; i < blocks.length - 1; i++) {
    for (const [a, b] of INCOMPATIBLE_ADJACENT) {
      if (
        (blocks[i] === a && blocks[i + 1] === b) ||
        (blocks[i] === b && blocks[i + 1] === a)
      ) {
        errors.push(`Block '${blocks[i]}' và '${blocks[i + 1]}' không nên đặt cạnh nhau.`);
      }
    }
  }

  // Rule: No more than 10 blocks per page
  if (blocks.length > 10) {
    warnings.push("Trang có hơn 10 blocks – cân nhắc giảm để tránh quá tải.");
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}
