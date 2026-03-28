# Rule: Tech Stack

## Áp dụng: MỌI LÚC

### Stack được phê duyệt

| Category | Technology | Version | Notes |
|----------|-----------|---------|-------|
| **Frontend** | Next.js | 14.x | App Router only |
| | TypeScript | 5.x | Strict mode |
| | Tailwind CSS | 3.4+ | Utility-first |
| | shadcn/ui | latest | Component library |
| | SWR | 2.x | Client-side data fetching |
| | React Hook Form | 7.x | Forms |
| | Zod | 3.x | Validation |
| **Backend** | Express | 4.x | REST API |
| | TypeScript | 5.x | Strict mode |
| | Prisma | 5.x | ORM |
| | PostgreSQL | 16.x | Primary database |
| | Redis | 7.x | Cache + sessions |
| | RabbitMQ | 3.x | Message queue |
| **Testing** | Vitest | 1.x | Unit + integration |
| | Playwright | 1.x | E2E |
| **Infra** | Docker | 24+ | Containerization |
| | GitHub Actions | v4 | CI/CD |
| | Prometheus | latest | Metrics |
| | Grafana | latest | Dashboards |

### Quy tắc chọn technology
1. **KHÔNG thêm dependency mới** mà không có approval từ tech lead
2. **Ưu tiên thứ tự**: Built-in → Stack item → Lightweight lib → Heavy framework
3. **Không dùng**: jQuery, Moment.js, Lodash toàn bộ (dùng lodash-es nếu cần), CSS-in-JS (styled-components, emotion)
4. **Date handling**: dùng `date-fns` hoặc native `Intl`
5. **HTTP client**: Axios (đã configured), không dùng `node-fetch` riêng

### Version Pinning
```json
// ✅ Exact versions trong package.json
"dependencies": {
  "next": "14.2.5",
  "react": "18.3.1"
}

// ❌ Loose versions
"dependencies": {
  "next": "^14.0.0",
  "react": "*"
}
```
