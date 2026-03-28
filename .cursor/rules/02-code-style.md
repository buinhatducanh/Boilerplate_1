# Rule: Code Style

## Áp dụng: MỌI LÚC

### TypeScript Configuration
- `strict: true` – LUÔN LUÔN
- `noImplicitAny: true`
- `strictNullChecks: true`

### Import Order (top → bottom)
```typescript
// 1. React / Next.js
import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. Third-party libraries
import { z } from "zod";
import useSWR from "swr";

// 3. Internal modules (@/ aliases)
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

// 4. Types (always use `import type`)
import type { Service } from "@/types";

// 5. Styles / Assets (nếu có)
import "./styles.css";
```

### Export Style
```typescript
// ✅ Named exports – DUY NHẤT cho components, hooks, utils
export function ServiceCard() { ... }
export function useServices() { ... }
export const API_URL = "...";

// ❌ Default exports – KHÔNG DÙNG (trừ Next.js pages/layouts)
export default function ServiceCard() { ... }

// ✅ Exception: Next.js page/layout BẮT BUỘC default export
export default function HomePage() { ... }
```

### Formatting Rules
- **Semicolons**: có (`;`)
- **Quotes**: double quotes (`"`)
- **Trailing comma**: có (`es5`)
- **Tab width**: 2 spaces
- **Print width**: 100 characters
- **Bracket spacing**: có (`{ value }`)
- **Arrow parens**: always (`(x) => x`)

### Async/Await
```typescript
// ✅ Luôn dùng async/await
const data = await fetchServices();

// ❌ Không dùng .then() chains
fetchServices().then((data) => { ... });

// ✅ Parallel khi có thể
const [services, projects] = await Promise.all([
  fetchServices(),
  fetchProjects(),
]);
```

### Comments
```typescript
// ✅ Comment giải thích WHY, không phải WHAT
// Offset by 1 because Strapi pagination starts at 1, not 0
const page = queryPage + 1;

// ✅ Business logic bằng tiếng Việt
// Giảm giá 20% cho khách hàng premium trên 2 năm
if (user.isPremium && user.yearsActive > 2) { ... }

// ❌ Comment giải thích code hiển nhiên
// Set name to user.name
const name = user.name;

// ❌ Commented-out code – XÓA, đừng comment
// const oldValue = calculateOld();
```
