# Rule: Block Assembly

## Áp dụng: Khi lắp ráp trang mới từ Figma

### Kiến trúc 3 tầng

```
Primitives (6 atoms) → Blocks (14 sections) → Patterns (8 recipes)
```

- **Primitives** (`@/components/primitives`): Section, SectionHeader, Grid, Card, Button, Badge
- **Blocks** (`@/components/blocks`): 14 section-level components có sẵn
- **Patterns** (`@/components/patterns`): 8 page recipes + assembly rules + validator

### Quy trình lắp ráp

```
Figma → Nhận diện loại trang → Chọn recipe → Map sections → Thay data → Validate
```

### 14 Blocks có sẵn

| Block | Khi nào dùng |
|-------|-------------|
| `HeroCentered` | Hero căn giữa, focus CTA |
| `HeroSplit` | Hero 2 cột: text + image |
| `FeaturesGrid` | Grid cards icon+text (3-4 cols) |
| `FeaturesAlternating` | Rows xen kẽ text/image |
| `CtaBanner` | Call-to-action banner |
| `TestimonialsCarousel` | Đánh giá khách hàng |
| `PricingTable` | Bảng giá packages |
| `StatsBar` | Con số thống kê nổi bật |
| `FaqAccordion` | Q&A accordion |
| `GalleryGrid` | Grid ảnh portfolio |
| `TeamGrid` | Giới thiệu đội ngũ |
| `NewsletterBanner` | Form đăng ký email |
| `LogoCloud` | Dải logo đối tác |
| `ContentWithImage` | Text + image 2 cột |

### 7 Rules bắt buộc

1. **Hero đầu tiên** – Luôn bắt đầu bằng HeroCentered hoặc HeroSplit
2. **CTA cuối cùng** – CtaBanner hoặc NewsletterBanner luôn cuối
3. **Xen kẽ background** – Không 3+ blocks cùng background liên tiếp
4. **Không adjacent trùng** – Không 2 blocks cùng loại cạnh nhau
5. **Data density đúng** – FeaturesGrid 3-8 items, StatsBar 3-6 items
6. **Max 10 blocks/page** – Tránh page quá dài
7. **Validate trước commit** – Chạy `validatePageBlocks()`

### Khi tạo trang mới

```typescript
// 1. Import blocks cần thiết
import { HeroCentered, FeaturesGrid, CtaBanner } from "@/components/blocks";

// 2. Xếp blocks theo recipe + rules
export default function NewPage() {
  return (
    <>
      <HeroCentered title="..." primaryCta={{ text: "...", href: "/..." }} />
      <FeaturesGrid title="..." features={[...]} />
      <CtaBanner title="..." primaryCta={{ text: "...", href: "/..." }} />
    </>
  );
}

// 3. Validate
import { validatePageBlocks } from "@/components/patterns";
validatePageBlocks(["HeroCentered", "FeaturesGrid", "CtaBanner"]);
```

### Khi Figma có section không khớp block nào

1. Xem lại 14 blocks – có thể customize props đã đủ
2. Nếu thật sự cần block mới → tạo tại `blocks/[category]/`
3. Dùng primitives (Section, Grid, Card...) để giữ consistency
4. Thêm vào registry (blocks/index.ts, patterns/page-recipes.ts)
