# Contributing Guide

## Getting Started

```bash
git clone <repo-url>
cd boilerplate
npm install
cp .env.example .env.local
npm run docker:up        # Start infrastructure
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run dev              # http://localhost:3000
```

## Branch Strategy

```
main      ← Production (protected)
develop   ← Staging
feature/* ← New features (from develop)
fix/*     ← Bug fixes (from develop)
hotfix/*  ← Emergency fixes (from main)
```

## Workflow

1. Checkout từ `develop`: `git checkout -b feature/ten-tinh-nang develop`
2. Code theo conventions trong `.cursor/rules/`
3. Viết tests (coverage >= 80%)
4. Commit theo Conventional Commits: `feat(scope): description`
5. Push và tạo PR vào `develop`
6. Chờ review (minimum 1 approval)
7. Squash merge

## Commit Messages

```
feat(services): add service listing page with pagination
fix(auth): resolve JWT refresh token race condition
docs(api): add swagger documentation for v1 endpoints
test(contact): add unit tests for contact form validation
chore(deps): upgrade next.js to 14.2.5
```

## Code Standards

- TypeScript strict mode — no `any`
- Named exports (no default exports except Next.js pages)
- Max function length: 30 lines
- Max file length: 300 lines
- Error handling: no empty catch blocks
- Security: no hardcoded secrets, validate all inputs

Full rules: `.cursor/rules/01-14-*.md`

## Creating New Pages

Xem [ASSEMBLY-GUIDE.md](./ASSEMBLY-GUIDE.md) để lắp ráp trang từ blocks có sẵn.

## Pull Request Checklist

- [ ] TypeScript strict, không `any`
- [ ] Error handling đầy đủ
- [ ] Tests thêm/cập nhật (coverage >= 80%)
- [ ] No hardcoded values / secrets
- [ ] No `console.log` (dùng logger)
- [ ] Lint + type-check pass
- [ ] PR size < 400 lines changed
