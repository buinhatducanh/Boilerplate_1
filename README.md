# NextJS Agency Boilerplate

> Boilerplate tối ưu cho agency thiết kế & phát triển web — tích hợp AI governance system, Figma-to-CMS workflow, và full-stack infrastructure.

## Quick Start

```bash
# Clone & Install
git clone <repo-url>
cd boilerplate
npm install

# Setup environment
cp .env.example .env.local

# Option A: Chạy với Mock Data (không cần backend)
# .env.local → NEXT_PUBLIC_USE_MOCK=true
npm run dev

# Option B: Chạy full stack với Docker
docker compose up -d          # PostgreSQL + Redis + RabbitMQ
npx prisma migrate dev        # Run migrations
npx prisma db seed             # Seed data
npm run dev                    # http://localhost:3000
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Express, TypeScript, Prisma |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Queue | RabbitMQ 3 |
| Testing | Vitest (unit), Playwright (E2E) |
| CI/CD | GitHub Actions |
| Container | Docker + Docker Compose |

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts)
│   ├── (marketing)/        # Public pages: services, projects, contact
│   └── api/                # API routes (proxy if needed)
├── components/
│   ├── ui/                 # Dumb components (props only, from Figma)
│   ├── smart/              # Smart components (hooks + logic)
│   ├── layout/             # Header, Footer
│   └── seo/                # JSON-LD schema markup
├── hooks/                  # Custom React hooks (SWR + Axios)
├── lib/                    # Utilities (api-client, prisma, redis, logger)
├── types/                  # TypeScript interfaces
├── mocks/                  # Mock data for UI development
├── styles/                 # Global CSS + Tailwind
└── cms-schemas/            # CMS collection definitions

.cursor/
├── agents/                 # 11 AI Agent personas
└── rules/                  # 13 mandatory rules
```

## AI Governance System

### 11 AI Agents (`.cursor/agents/`)

| Agent | Expertise |
|-------|----------|
| Frontend Developer | Components, pages, Tailwind, performance |
| Backend Developer | API, services, Prisma, Redis, RabbitMQ |
| Project Manager | Sprint planning, user stories, estimation |
| Systems Architect | ADR, system design, scalability |
| UI/UX Designer | Design system, accessibility, responsive |
| QA Engineer | Vitest, Playwright, test plans |
| Copywriter & SEO | Meta tags, JSON-LD, microcopy |
| Database Expert | Schema, migrations, query optimization |
| CI/CD Engineer | GitHub Actions, deployment pipelines |
| Docker Expert | Dockerfiles, compose, optimization |
| Documentation Writer | README, API docs, guides |

### 13 Rules (`.cursor/rules/`)

| Category | Rules |
|----------|-------|
| Code Quality | clean-code, code-style, error-handling |
| Architecture | tech-stack, system-design, project-structure, api-conventions |
| Data & Naming | naming-conventions, database |
| Operations | security, monitoring, testing, git-workflow |

## Figma → CMS Workflow

Xem chi tiết tại [SOP.md](./SOP.md).

```
Phase 1: Design → Figma export
Phase 2: UI Dev → components/ui + types + mocks
Phase 3: CMS Setup → Strapi/Directus collections (parallel)
Phase 4: Dev + AI → hooks + smart components (AI-assisted)
```

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint code |
| `npm run type-check` | TypeScript type checking |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run docker:up` | Start Docker infrastructure |
| `npm run docker:down` | Stop Docker infrastructure |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:1337/api` | Headless CMS API URL |
| `NEXT_PUBLIC_USE_MOCK` | No | `true` | Toggle mock/real data |
| `DATABASE_URL` | Yes* | - | PostgreSQL connection string |
| `REDIS_URL` | Yes* | - | Redis connection string |
| `RABBITMQ_URL` | No | - | RabbitMQ connection string |
| `JWT_ACCESS_SECRET` | Yes* | - | JWT access token secret |
| `JWT_REFRESH_SECRET` | Yes* | - | JWT refresh token secret |
| `LOG_LEVEL` | No | `info` | Pino log level |

\* Required khi chạy full stack (không dùng mock)

## Docker

```bash
# Development (full stack)
docker compose up -d

# Services:
# - App: http://localhost:3000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
# - RabbitMQ: localhost:5672 (management: localhost:15672)
```
