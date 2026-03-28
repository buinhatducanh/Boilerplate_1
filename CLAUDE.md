# CLAUDE.md – Hướng dẫn cho Claude Code

> File này chứa instructions cho Claude Code (CLI / Web / IDE) khi làm việc với repo này.

## Project Overview

NextJS Agency Boilerplate — hệ thống lắp ráp trang web tối ưu cho agency.
Stack: Next.js 14 + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL.

## Key Architecture

```
src/components/
├── primitives/    → 6 atoms (Section, Grid, Card, Button...)
├── blocks/        → 14 section-level blocks (Hero, Features, CTA...)
├── patterns/      → 8 page recipes + 7 assembly rules + validator
├── ui/            → Dumb components (props only, from Figma)
├── smart/         → Smart components (hooks + API logic)
├── layout/        → Header, Footer
└── seo/           → JSON-LD schema markup
```

## Common Commands

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build
npm run lint                   # ESLint
npm run type-check             # TypeScript strict check

# Testing
npm run test                   # Unit tests (Vitest)
npm run test:e2e               # E2E tests (Playwright)
npm run test:coverage          # Coverage report

# Database
npm run db:migrate             # Run Prisma migrations
npm run db:seed                # Seed database
npm run db:studio              # Open Prisma Studio GUI

# Docker
npm run docker:up              # Start PostgreSQL + Redis + RabbitMQ
npm run docker:down            # Stop all containers
```

## Environment Setup

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_USE_MOCK=true to work without backend
```

## Conventions

- **TypeScript strict** — không `any`, dùng `unknown` + type guard
- **Named exports** — không default exports (trừ Next.js pages)
- **Import alias** — `@/` maps to `src/`
- **Components** — PascalCase files, kebab-case utilities
- **Business logic comments** — tiếng Việt; Technical comments — tiếng Anh

## When Creating New Pages

1. Check `src/components/patterns/page-recipes.ts` for matching recipe
2. Import blocks from `@/components/blocks`
3. Follow 7 assembly rules (see `.cursor/rules/14-assembly.md`)
4. Run `validatePageBlocks()` before committing

## When Creating New Components

1. **UI Component** → `src/components/ui/` (props only, no API calls)
2. **Smart Component** → `src/components/smart/` (uses hooks, handles loading/error)
3. **New Block** → `src/components/blocks/[category]/` (uses primitives)

## AI Agents

11 specialized agents defined in `.cursor/agents/`. Route by context:
- Frontend work → `01-frontend-developer.md`
- API/Backend → `02-backend-developer.md`
- Database → `08-database-expert.md`
- Testing → `06-qa-engineer.md`

## Rules

14 mandatory rules in `.cursor/rules/`. All apply automatically.
Critical: `10-security.md` (always), `14-assembly.md` (when building pages).

## File Locations (Quick Reference)

| What | Where |
|------|-------|
| Types | `src/types/*.ts` |
| Mock Data | `src/mocks/*.mock.ts` |
| Custom Hooks | `src/hooks/use-*.ts` |
| API Client | `src/lib/api-client.ts` |
| Prisma Schema | `prisma/schema.prisma` |
| CI Pipeline | `.github/workflows/ci.yml` |
| Docker | `docker/Dockerfile`, `docker-compose.yml` |
| CMS Schemas | `src/cms-schemas/` |
