# Rule: Project Structure

## Áp dụng: Khi tạo file/folder mới

### Frontend Structure (Next.js)
```
src/
├── app/                           # App Router
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── loading.tsx                # Global loading UI
│   ├── error.tsx                  # Global error UI
│   ├── not-found.tsx              # 404 page
│   ├── (marketing)/               # Route group: public pages
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx           # /services
│   │   │   └── [slug]/page.tsx    # /services/[slug]
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── (dashboard)/               # Route group: authenticated
│   │   └── admin/
│   │       └── page.tsx
│   └── api/                       # API routes (proxy if needed)
│
├── components/
│   ├── ui/                        # Dumb components (props only)
│   ├── smart/                     # Smart components (hooks + logic)
│   ├── layout/                    # Header, Footer, Sidebar
│   └── seo/                       # Schema markup, Meta components
│
├── hooks/                         # Custom React hooks
├── lib/                           # Utilities, configs, helpers
├── types/                         # TypeScript interfaces
├── mocks/                         # Mock data
├── styles/                        # Global styles, Tailwind config
└── cms-schemas/                   # CMS collection definitions
```

### Backend Structure (Express)
```
server/
├── src/
│   ├── index.ts                   # App entry point
│   ├── app.ts                     # Express app setup
│   ├── routes/
│   │   ├── index.ts               # Route registry
│   │   ├── auth.route.ts
│   │   └── services.route.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── services.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── services.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── error.middleware.ts
│   ├── validators/
│   │   └── auth.validator.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── redis.ts
│   │   ├── rabbitmq.ts
│   │   └── logger.ts
│   └── types/
│       └── index.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── tests/
```

### File Naming Rules
| Type | Convention | Example |
|------|-----------|---------|
| React Component | PascalCase | `ServiceCard.tsx` |
| Page (App Router) | `page.tsx` | `app/services/page.tsx` |
| Layout | `layout.tsx` | `app/(marketing)/layout.tsx` |
| Hook | `use-` prefix, kebab-case | `use-services.ts` |
| Utility | kebab-case | `api-client.ts` |
| Type | kebab-case | `global-settings.ts` |
| Mock | `.mock.ts` suffix | `services.mock.ts` |
| Test | `.test.ts` / `.spec.ts` | `auth.service.test.ts` |
| Route | `.route.ts` suffix | `services.route.ts` |
| Controller | `.controller.ts` suffix | `services.controller.ts` |
| Service | `.service.ts` suffix | `services.service.ts` |
| Middleware | `.middleware.ts` suffix | `auth.middleware.ts` |
| Validator | `.validator.ts` suffix | `auth.validator.ts` |

### Rules
1. **Mỗi file = 1 export chính** (có thể kèm sub-types)
2. **index.ts cho re-export** – không chứa logic
3. **Không nested quá 4 levels** trong folder structure
4. **Shared types** → `src/types/`, local types → trong file component
