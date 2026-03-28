# SOP: Quy trình Ghép nối UI Figma ↔ Headless CMS

> **Mục tiêu**: Rút ngắn thời gian từ "Figma bàn giao" đến "Website live với data thật" xuống mức tối thiểu, bằng cách chuẩn hóa đầu vào, đầu ra và tự động hóa bước mapping bằng AI.

---

## MỤC LỤC

1. [Kiến trúc thư mục](#1-kiến-trúc-thư-mục)
2. [Quy chuẩn đầu vào cho Team UI/Design](#2-quy-chuẩn-đầu-vào-cho-team-uidesign)
3. [Kiến trúc Headless API đúc sẵn](#3-kiến-trúc-headless-api-đúc-sẵn)
4. [Bộ Prompt thực thi cho Team Dev](#4-bộ-prompt-thực-thi-cho-team-dev)
5. [Quy trình vận hành End-to-End](#5-quy-trình-vận-hành-end-to-end)

---

## 1. KIẾN TRÚC THƯ MỤC

```
src/
├── app/                          # NextJS App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Trang chủ (compose Smart Components)
│   ├── (marketing)/              # Route group: Landing, About, Contact...
│   └── api/                      # API Routes (nếu cần proxy)
│
├── components/
│   ├── ui/                       # 🎨 DUMB COMPONENTS (từ Figma)
│   │   ├── BannerSlider.tsx      #    - Chỉ nhận props, không gọi API
│   │   ├── ServiceCard.tsx       #    - Có TypeScript interface rõ ràng
│   │   ├── ProjectCard.tsx       #    - Dùng mock data khi dev độc lập
│   │   └── ContactForm.tsx
│   │
│   └── smart/                    # 🧠 SMART COMPONENTS
│       ├── BannerSection.tsx     #    - Gọi custom hook fetch API
│       ├── ServicesSection.tsx   #    - Truyền data thật xuống UI comp
│       ├── ProjectsSection.tsx   #    - Xử lý Loading / Error states
│       └── ContactSection.tsx
│
├── hooks/                        # 🔗 Custom hooks (SWR + Axios)
│   ├── use-banners.ts
│   ├── use-services.ts
│   ├── use-projects.ts
│   ├── use-global-settings.ts
│   └── use-contact.ts
│
├── types/                        # 📐 TypeScript Interfaces
│   ├── banner.ts
│   ├── service.ts
│   ├── project.ts
│   ├── contact.ts
│   ├── global-settings.ts
│   └── index.ts                  # Re-export all
│
├── mocks/                        # 🧪 Mock Data JSON
│   ├── banners.mock.ts
│   ├── services.mock.ts
│   ├── projects.mock.ts
│   ├── global-settings.mock.ts
│   └── index.ts
│
├── lib/                          # ⚙️ Utilities
│   ├── api-client.ts             # Axios instance + SWR fetcher
│   └── use-mock.ts               # Toggle mock/real data
│
├── cms-schemas/                  # 📋 CMS Collection definitions
│   ├── strapi-schema.md
│   └── api-response-standard.json
│
└── styles/                       # CSS / Tailwind
```

### Nguyên tắc kiến trúc

| Layer | Trách nhiệm | Ai viết? |
|-------|-------------|----------|
| `components/ui` | Render UI thuần túy, nhận props | Team UI (từ Figma) |
| `types` + `mocks` | Định nghĩa shape data + dữ liệu mẫu | Team UI bàn giao kèm |
| `hooks` | Fetch API, toggle mock/real | Team Dev (hoặc AI sinh) |
| `components/smart` | Kết nối hook → UI component | Team Dev (hoặc AI sinh) |
| `cms-schemas` | Cấu trúc Collection trên CMS | Team Dev / DevOps |

---

## 2. QUY CHUẨN ĐẦU VÀO CHO TEAM UI/DESIGN

### Quy tắc 1: Mỗi UI Component PHẢI có TypeScript Interface

Khi bàn giao component, team UI **bắt buộc** tạo file interface tại `src/types/`.

```typescript
// ❌ SAI – Component nhận `any` hoặc inline type
function ServiceCard({ data }: { data: any }) { ... }

// ✅ ĐÚNG – Import interface từ @/types
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}
```

### Quy tắc 2: Mock Data phải khớp 100% với Interface

File mock tại `src/mocks/` phải import đúng type và có ít nhất 2 items.

```typescript
// ✅ ĐÚNG – Mock data typed đúng interface
import type { Service } from "@/types";

export const servicesMock: Service[] = [
  {
    id: 1,
    title: "Thiết kế UI/UX",
    slug: "thiet-ke-ui-ux",
    description: "Mô tả dịch vụ...",
    icon: "palette",
    features: ["Wireframe", "Prototype"],
    order: 1,
  },
  // ... ít nhất 2 items
];
```

### Quy tắc 3: Component phải là "Dumb" – KHÔNG chứa logic fetch

UI Component **chỉ được** nhận data qua props. Không import axios, fetch, SWR, hay bất kỳ side-effect nào.

```typescript
// ❌ SAI – UI Component gọi API
import useSWR from "swr";
export function ServiceCard() {
  const { data } = useSWR("/api/services", fetcher); // ← KHÔNG ĐƯỢC
  return <div>{data?.title}</div>;
}

// ✅ ĐÚNG – Nhận props thuần túy
export function ServiceCard({ service }: ServiceCardProps) {
  return <div>{service.title}</div>;
}
```

### Quy tắc 4: Đặt tên file và export nhất quán

| Đối tượng | Convention | Ví dụ |
|-----------|-----------|-------|
| UI Component | PascalCase file + named export | `ServiceCard.tsx` → `export function ServiceCard` |
| Type file | kebab-case | `global-settings.ts` |
| Mock file | kebab-case + `.mock.ts` | `services.mock.ts` |
| Hook file | kebab-case + `use-` prefix | `use-services.ts` |

### Quy tắc 5: Xử lý hình ảnh dùng placeholder path

Khi Figma export, dùng path ảnh local hoặc placeholder. Team Dev sẽ map sang URL từ CMS sau.

```typescript
// Mock data dùng path ảnh convention
{
  image: "/images/service-uiux.jpg",       // ← Path chuẩn
  thumbnail: "/images/project-01-thumb.jpg" // ← Có prefix rõ ràng
}
```

---

## 3. KIẾN TRÚC HEADLESS API ĐÚC SẴN

### 3.1 Collection Schema (Strapi v4)

> Chi tiết đầy đủ xem file: `src/cms-schemas/strapi-schema.md`

| Collection | Type | Mục đích |
|-----------|------|----------|
| `global-setting` | Single Type | Logo, contact info, social links, footer |
| `banners` | Collection | Hero banners / sliders |
| `services` | Collection | Danh sách dịch vụ |
| `projects` | Collection | Portfolio / case studies |
| `contact-messages` | Collection | Lưu form liên hệ |

### 3.2 Chuẩn JSON Response

**Collection Response** (danh sách):
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Thiết kế UI/UX",
        "slug": "thiet-ke-ui-ux",
        "description": "Mô tả...",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 5 }
  }
}
```

**Single Type Response**:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "siteName": "My Agency",
      "email": "hello@agency.com",
      "socialLinks": [
        { "platform": "facebook", "url": "https://..." }
      ]
    }
  },
  "meta": {}
}
```

**Media Field Response** (ảnh):
```json
{
  "image": {
    "data": {
      "id": 10,
      "attributes": {
        "url": "/uploads/banner_01.jpg",
        "formats": {
          "thumbnail": { "url": "/uploads/thumbnail_banner_01.jpg" },
          "medium":    { "url": "/uploads/medium_banner_01.jpg" },
          "large":     { "url": "/uploads/large_banner_01.jpg" }
        }
      }
    }
  }
}
```

### 3.3 Helper Flatten Response

Strapi v4 wraps data trong `{ data: { id, attributes } }`. Boilerplate đã cung cấp sẵn helper tại `src/lib/api-client.ts`:

```typescript
import { flattenStrapiResponse } from "@/lib/api-client";

// Input:  { data: [{ id: 1, attributes: { title: "A" } }], meta: {...} }
// Output: [{ id: 1, title: "A" }]
const services = flattenStrapiResponse(apiResponse);
```

---

## 4. BỘ PROMPT THỰC THI CHO TEAM DEV

### PROMPT 1: Sinh TypeScript Interface từ UI Component + Mock Data

> **Khi nào dùng**: Team UI bàn giao component mới chưa có file type, hoặc mock data chưa có interface.

```
Bạn là TypeScript expert. Hãy phân tích 2 file sau và tạo TypeScript Interface chuẩn.

=== FILE 1: UI COMPONENT ===
[Paste nội dung file component, ví dụ: src/components/ui/TestimonialCard.tsx]

=== FILE 2: MOCK DATA ===
[Paste nội dung file mock, ví dụ: src/mocks/testimonials.mock.ts]

=== YÊU CẦU ===

1. Tạo TypeScript Interface mô tả chính xác shape data mà component nhận qua props.
2. Suy luận type từ cả 2 nguồn:
   - Từ component: xem những field nào được render (ví dụ: `item.title`, `item.image`).
   - Từ mock data: xem giá trị thực tế để xác định type (string, number, boolean, array...).
3. Đánh dấu optional (?) cho field xuất hiện trong mock nhưng có thể vắng (kiểm tra qua conditional render trong component như `{item.subtitle && ...}`).
4. Với field là array, định nghĩa item type cụ thể thay vì `any[]`.
5. Với field là URL/image, dùng type `string` và thêm comment `// URL`.
6. Xuất file output theo format:

```typescript
// src/types/[tên-entity].ts
export interface [TênEntity] {
  id: number;
  // ... các fields
}
```

7. Nếu phát hiện nested object, tạo sub-interface riêng.
8. KHÔNG dùng `any`, `unknown`, hoặc `Record<string, any>`.
```

---

### PROMPT 2: Tạo Custom Hook + Thay Mock Data bằng API thật

> **Khi nào dùng**: Đã có UI Component + Mock Data + Interface, cần kết nối API thật.

```
Bạn là Senior NextJS Developer. Hãy thực hiện 3 bước sau để kết nối UI Component với Headless CMS API.

=== CONTEXT ===
- Framework: NextJS 14 (App Router)
- Data fetching: SWR + Axios
- CMS: Strapi v4 (response format: { data: { id, attributes }, meta })
- API Base URL: env var NEXT_PUBLIC_API_URL
- Đã có sẵn utilities tại:
  - `@/lib/api-client` (apiClient, swrFetcher, flattenStrapiResponse)
  - `@/lib/use-mock` (USE_MOCK flag)

=== FILE 1: UI COMPONENT ===
[Paste nội dung file, ví dụ: src/components/ui/TestimonialCard.tsx]

=== FILE 2: MOCK DATA ===
[Paste nội dung file, ví dụ: src/mocks/testimonials.mock.ts]

=== FILE 3: TYPESCRIPT INTERFACE ===
[Paste nội dung file, ví dụ: src/types/testimonial.ts]

=== YÊU CẦU ===

**Bước 1: Tạo Custom Hook** (`src/hooks/use-[entity].ts`)
- Dùng SWR với swrFetcher từ `@/lib/api-client`.
- Khi `USE_MOCK === true`: return mock data (không gọi API).
- Khi `USE_MOCK === false`: gọi API endpoint `/[entity-plural]?populate=*`.
- Dùng `flattenStrapiResponse()` để chuẩn hóa response.
- Return object: `{ [entity]: T[], isLoading: boolean, error: any }`.

**Bước 2: Tạo Smart Component** (`src/components/smart/[Entity]Section.tsx`)
- Import custom hook từ bước 1.
- Import UI component từ `@/components/ui`.
- Render loading skeleton khi `isLoading === true`.
- Render error message khi `error !== null`.
- Map data từ hook xuống UI component qua props.
- Thêm `"use client"` directive.

**Bước 3: Mapping Fields**
- So sánh field names giữa Interface và Strapi response.
- Nếu field là Media (image), extract URL: `attributes.image.data.attributes.url`.
- Nếu field là Component repeatable (features, techStack), map: `attributes.features.map(f => f.value)`.
- Liệt kê bảng mapping fields ở comment đầu file hook.

=== OUTPUT FORMAT ===
Trả về 2 file hoàn chỉnh, copy-paste được ngay:
1. `src/hooks/use-[entity].ts`
2. `src/components/smart/[Entity]Section.tsx`
```

---

## 5. QUY TRÌNH VẬN HÀNH END-TO-END

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW TỔNG QUAN                           │
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ PHASE 1  │───▶│ PHASE 2  │───▶│ PHASE 3  │───▶│ PHASE 4  │  │
│  │ Design   │    │ UI Code  │    │ CMS Setup│    │ Mapping  │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│   Figma          Components      Strapi/CMS     Hook + Smart   │
│   Handoff        + Mock + Type   + Content       Components    │
│                                                                 │
│   [Designer]     [UI Dev]        [Dev/DevOps]   [Dev + AI]     │
└─────────────────────────────────────────────────────────────────┘
```

### Phase 1 – Design Handoff (Designer)
- Export Figma → React components (dùng Locofy, Anima, hoặc thủ công).
- Output: File `.tsx` thuần UI.

### Phase 2 – UI Standardization (UI Dev)
- Đặt component vào `src/components/ui/`.
- Tạo TypeScript Interface tại `src/types/`.
- Tạo Mock Data tại `src/mocks/`.
- **Kiểm tra**: Component render đúng với mock data.

### Phase 3 – CMS Setup (Dev/DevOps) — Chạy song song với Phase 2
- Tạo Collection Types trên Strapi theo schema trong `src/cms-schemas/`.
- Nhập content mẫu.
- Verify API response đúng format chuẩn.

### Phase 4 – AI-Assisted Mapping (Dev + AI)
1. Mở Cursor/Copilot.
2. Paste **Prompt 1** → sinh Interface (nếu chưa có).
3. Paste **Prompt 2** → sinh Hook + Smart Component.
4. Review code, test, merge.

### Checklist bàn giao mỗi Component

- [ ] File UI Component tại `src/components/ui/`
- [ ] TypeScript Interface tại `src/types/`
- [ ] Mock Data tại `src/mocks/` (ít nhất 2 items)
- [ ] Component render đúng với mock data
- [ ] Custom Hook tại `src/hooks/`
- [ ] Smart Component tại `src/components/smart/`
- [ ] Test toggle `USE_MOCK=true` / `USE_MOCK=false`

---

## Ghi chú bổ sung

### Toggle Mock / Real Data

Trong file `.env.local`:
```bash
# Dùng mock data (team UI dev độc lập)
NEXT_PUBLIC_USE_MOCK=true

# Dùng API thật (team Dev sau khi setup CMS)
NEXT_PUBLIC_USE_MOCK=false
```

### Áp dụng cho CMS khác (Directus, Supabase)

Chỉ cần thay đổi:
1. `src/lib/api-client.ts` – Đổi base URL và response format.
2. Hàm `flattenStrapiResponse` → viết hàm flatten tương ứng cho CMS mới.
3. Hooks giữ nguyên interface trả về, chỉ đổi logic bên trong.
