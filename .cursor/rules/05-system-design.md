# Rule: System Design

## Áp dụng: Khi thiết kế kiến trúc hệ thống

### Architecture Layers
```
┌──────────────────────────────────────────────┐
│               CLIENT (Browser)                │
├──────────────────────────────────────────────┤
│           FRONTEND (Next.js SSR/CSR)          │
│  ┌─────────────┐  ┌─────────────────────┐    │
│  │ Server Comp. │  │ Client Components   │    │
│  │ (fetch API)  │  │ (SWR + hooks)       │    │
│  └─────────────┘  └─────────────────────┘    │
├──────────────────────────────────────────────┤
│           API LAYER (Express + TypeScript)     │
│  ┌────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Routes │→│Controller│→│   Service    │   │
│  └────────┘ └──────────┘ └──────────────┘   │
│       ↑                        ↓   ↓         │
│  ┌─────────┐            ┌──────┐ ┌─────┐    │
│  │Middleware│            │Prisma│ │Redis│    │
│  └─────────┘            └──────┘ └─────┘    │
├──────────────────────────────────────────────┤
│           DATA LAYER                          │
│  ┌───────────┐  ┌───────┐  ┌──────────┐     │
│  │PostgreSQL │  │ Redis │  │ RabbitMQ │     │
│  │(persistent)│  │(cache) │  │(async)   │     │
│  └───────────┘  └───────┘  └──────────┘     │
└──────────────────────────────────────────────┘
```

### API Design Rules
- RESTful naming: `/api/v1/services`, `/api/v1/projects/:id`
- Plural nouns for collections
- Consistent response format (success + data + meta + error)
- Pagination: cursor-based cho infinite scroll, offset cho admin

### Caching Strategy
| Data Type | TTL | Invalidation |
|-----------|-----|-------------|
| Static pages (SSG) | ISR 60s | On-demand revalidate |
| API list queries | 5 min | On create/update/delete |
| Single item | 10 min | On update/delete |
| User session | 24h | On logout |
| Global settings | 1h | Manual invalidate |

### Request Flow
```
1. Browser → Next.js (SSR/SSG)
2. Next.js Server Component → Express API
3. Express: Middleware (auth, validate, rate-limit)
4. Express: Controller (parse request)
5. Express: Service (business logic)
6. Service → Redis (cache check)
7. Service → Prisma → PostgreSQL (if cache miss)
8. Service → RabbitMQ (async tasks: email, notification)
9. Response → Next.js → Browser
```
