# ASSEMBLY GUIDE – Hướng dẫn Lắp ráp Trang từ Blocks

> **Mục tiêu**: Nhận bất kỳ thiết kế Figma nào → lắp ráp thành trang hoàn chỉnh trong **< 30 phút** bằng hệ thống blocks có sẵn.

---

## KIẾN TRÚC 3 TẦNG

```
┌─────────────────────────────────────────────────────────┐
│                    PAGE (app/page.tsx)                    │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              PATTERNS (page-recipes.ts)              │ │
│  │  "Landing Page = Hero + Logos + Features + CTA"     │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │              BLOCKS (blocks/*.tsx)                   │ │
│  │  HeroCentered, FeaturesGrid, PricingTable...       │ │
│  │  14 blocks cover 95% mọi thiết kế                  │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │              PRIMITIVES (primitives/*.tsx)           │ │
│  │  Section, SectionHeader, Grid, Card, Button, Badge │ │
│  │  6 atoms dùng chung cho mọi blocks                 │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## BƯỚC 1: NHẬN DIỆN LOẠI TRANG

Nhìn vào Figma → xác định loại trang → chọn recipe:

| Figma nhìn giống... | Chọn Recipe | File tham khảo |
|---------------------|-------------|----------------|
| Landing page marketing | `landing` | 8 blocks |
| Website doanh nghiệp | `corporate` | 8 blocks |
| Chi tiết 1 dịch vụ | `serviceDetail` | 6 blocks |
| Danh sách dự án/portfolio | `portfolio` | 4 blocks |
| Giới thiệu / đội ngũ | `about` | 6 blocks |
| Form liên hệ | `contact` | 3 blocks |
| Sản phẩm SaaS | `saas` | 8 blocks |
| Danh sách bài viết | `blogListing` | 3 blocks |

---

## BƯỚC 2: MAP TỪNG SECTION FIGMA → BLOCK

Đọc Figma từ trên xuống. Mỗi "section" trong Figma map sang 1 block:

| Figma Section nhìn giống... | Block tương ứng | Variant |
|-----------------------------|----------------|---------|
| Banner lớn full-width, text giữa | `HeroCentered` | có/không background image |
| Banner 2 cột: text + ảnh | `HeroSplit` | `reversed` nếu ảnh bên trái |
| Grid 3-4 cards icon + text | `FeaturesGrid` | `cols`: 2, 3, hoặc 4 |
| Rows xen kẽ text/ảnh trái phải | `FeaturesAlternating` | - |
| Banner màu nổi bật + nút CTA | `CtaBanner` | `background`: primary/dark |
| Quotes/reviews khách hàng | `TestimonialsCarousel` | - |
| Bảng giá 2-3 cột | `PricingTable` | `isPopular` cho gói nổi bật |
| Dãy con số thống kê | `StatsBar` | - |
| Danh sách Q&A mở/đóng | `FaqAccordion` | - |
| Grid ảnh portfolio | `GalleryGrid` | `cols`: 2, 3, hoặc 4 |
| Grid avatar + tên + chức vụ | `TeamGrid` | - |
| Input email + nút subscribe | `NewsletterBanner` | - |
| Dải logo đối tác | `LogoCloud` | - |
| Text dài + ảnh bên cạnh | `ContentWithImage` | `reversed` nếu ảnh trái |

---

## BƯỚC 3: COPY CODE VÀ THAY DATA

### Ví dụ: Lắp ráp Landing Page

```tsx
// src/app/landing/page.tsx
import {
  HeroCentered,
  LogoCloud,
  FeaturesGrid,
  StatsBar,
  TestimonialsCarousel,
  PricingTable,
  FaqAccordion,
  CtaBanner,
} from "@/components/blocks";

export default function LandingPage() {
  return (
    <>
      <HeroCentered
        title="Tiêu đề chính từ Figma"
        subtitle="Subtitle từ Figma"
        primaryCta={{ text: "Bắt đầu ngay", href: "/signup" }}
        secondaryCta={{ text: "Tìm hiểu thêm", href: "#features" }}
        backgroundImage="/images/hero-bg.jpg"
      />

      <LogoCloud
        title="Được tin dùng bởi"
        logos={[
          { src: "/logos/client-1.svg", alt: "Client 1" },
          { src: "/logos/client-2.svg", alt: "Client 2" },
          { src: "/logos/client-3.svg", alt: "Client 3" },
          { src: "/logos/client-4.svg", alt: "Client 4" },
          { src: "/logos/client-5.svg", alt: "Client 5" },
        ]}
      />

      <FeaturesGrid
        badge="Dịch vụ"
        title="Tại sao chọn chúng tôi?"
        subtitle="Copy từ Figma"
        features={[
          { icon: "🎨", title: "Feature 1", description: "Mô tả..." },
          { icon: "⚡", title: "Feature 2", description: "Mô tả..." },
          { icon: "🔒", title: "Feature 3", description: "Mô tả..." },
        ]}
      />

      <StatsBar
        stats={[
          { value: "200+", label: "Dự án" },
          { value: "50+", label: "Khách hàng" },
          { value: "99%", label: "Hài lòng" },
          { value: "24/7", label: "Hỗ trợ" },
        ]}
      />

      <TestimonialsCarousel
        title="Khách hàng nói gì"
        testimonials={[
          {
            quote: "Copy quote từ Figma",
            author: "Nguyễn Văn A",
            role: "CEO",
            company: "Công ty ABC",
          },
        ]}
      />

      <PricingTable
        title="Bảng giá"
        plans={[
          {
            name: "Starter",
            price: "5tr",
            period: "dự án",
            description: "Phù hợp doanh nghiệp nhỏ",
            features: ["Feature 1", "Feature 2"],
            cta: { text: "Chọn gói", href: "/contact" },
          },
          {
            name: "Pro",
            price: "15tr",
            period: "dự án",
            description: "Phù hợp doanh nghiệp vừa",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            cta: { text: "Chọn gói", href: "/contact" },
            isPopular: true,
          },
        ]}
      />

      <FaqAccordion
        title="Câu hỏi thường gặp"
        faqs={[
          { question: "Câu hỏi 1?", answer: "Trả lời 1..." },
          { question: "Câu hỏi 2?", answer: "Trả lời 2..." },
        ]}
      />

      <CtaBanner
        title="Sẵn sàng bắt đầu?"
        subtitle="Liên hệ để được tư vấn miễn phí"
        primaryCta={{ text: "Liên hệ ngay", href: "/contact" }}
      />
    </>
  );
}
```

---

## QUY TẮC LẮP RÁP (7 RULES)

### Rule 1: Thứ tự bắt buộc
```
Hero (ĐẦU TIÊN) → ... → CTA/Newsletter (CUỐI CÙNG)
```

### Rule 2: Xen kẽ background
```
default → muted → default → primary → default
Không 3 blocks liên tiếp cùng 1 background.
```

### Rule 3: Không đặt cạnh nhau
```
❌ HeroCentered + HeroSplit
❌ CtaBanner + CtaBanner
❌ CtaBanner + NewsletterBanner
❌ FeaturesGrid + FeaturesGrid (dùng Alternating thay thế)
❌ StatsBar + StatsBar
```

### Rule 4: Số lượng items tối ưu
| Block | Min | Tối ưu | Max |
|-------|-----|--------|-----|
| FeaturesGrid | 3 | 4 | 8 |
| FeaturesAlternating | 2 | 3 | 5 |
| TestimonialsCarousel | 2 | 3 | 6 |
| PricingTable | 2 | 3 | 4 |
| StatsBar | 3 | 4 | 6 |
| FaqAccordion | 3 | 6 | 10 |
| GalleryGrid | 3 | 6 | 12 |
| TeamGrid | 2 | 4 | 8 |
| LogoCloud | 4 | 6 | 10 |

### Rule 5: Chọn Hero đúng loại
| Loại trang | Hero | Lý do |
|-----------|------|-------|
| Landing / SaaS | Centered | Focus 100% vào CTA |
| Corporate / About | Split | Cần ảnh để tạo trust |
| Service Detail | Split | Hiện ảnh dịch vụ ngay |
| Portfolio / Blog | Centered | Đơn giản, let content shine |

### Rule 6: Maximum 10 blocks per page
Quá 10 blocks → người dùng scroll quá dài → bounce rate cao.

### Rule 7: Validator
```typescript
import { validatePageBlocks } from "@/components/patterns";

const result = validatePageBlocks([
  "HeroCentered",
  "LogoCloud",
  "FeaturesGrid",
  "CtaBanner",
]);
// { valid: true, warnings: [], errors: [] }
```

---

## AI ASSEMBLY PROMPT

Copy prompt này vào Cursor/Copilot để AI tự động lắp ráp:

```
Bạn là Frontend Assembly Expert. Hãy lắp ráp trang web từ blocks có sẵn.

=== FIGMA SCREENSHOT / MÔ TẢ ===
[Paste screenshot hoặc mô tả layout Figma]

=== BLOCKS CÓ SẴN ===
Import từ "@/components/blocks":
HeroCentered, HeroSplit, FeaturesGrid, FeaturesAlternating,
CtaBanner, TestimonialsCarousel, PricingTable, StatsBar,
FaqAccordion, GalleryGrid, TeamGrid, NewsletterBanner,
LogoCloud, ContentWithImage

=== QUY TẮC ===
1. Hero LUÔN đầu tiên. CTA/Newsletter LUÔN cuối cùng.
2. Xen kẽ background: default → muted → default → primary.
3. Không đặt 2 blocks cùng loại cạnh nhau.
4. Tối đa 10 blocks/trang.
5. Mỗi block phải có data thật từ Figma (không placeholder).

=== YÊU CẦU ===
1. Nhận diện từng section trong Figma → map sang block phù hợp nhất.
2. Sắp xếp blocks theo đúng 7 rules.
3. Điền data thật từ Figma vào props của mỗi block.
4. Output: file page.tsx hoàn chỉnh, copy-paste chạy được ngay.
5. Chạy validatePageBlocks() và sửa nếu có lỗi.
```

---

## TẠO BLOCK MỚI (Khi Figma có section chưa có block)

```
1. Tạo file: src/components/blocks/[category]/[BlockName].tsx
2. Dùng primitives: Section, SectionHeader, Grid, Card, Button, Badge
3. Props interface export kèm component
4. Export trong blocks/[category]/index.ts
5. Thêm vào blocks/index.ts
6. Thêm BlockType vào patterns/page-recipes.ts
7. Thêm DATA_DENSITY vào patterns/assembly-rules.ts
```
