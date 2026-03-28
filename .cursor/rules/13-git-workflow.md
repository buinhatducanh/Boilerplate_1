# Rule: Git Workflow

## Áp dụng: Khi commit, branch, PR

### Branch Strategy
```
main            ← Production (protected)
  └── develop   ← Staging / Integration
       ├── feature/add-contact-form
       ├── feature/user-auth
       ├── fix/banner-responsive
       └── fix/api-cors-error

hotfix/critical-security-patch  ← From main, merge back to main + develop
release/v1.2.0                  ← From develop, merge to main + develop
```

### Branch Naming
```
feature/[short-description]     # Tính năng mới
fix/[short-description]         # Bug fix
hotfix/[short-description]      # Emergency fix on production
refactor/[short-description]    # Code refactoring
docs/[short-description]        # Documentation only
test/[short-description]        # Test only
chore/[short-description]       # Build, CI, dependencies

✅ feature/add-contact-form
✅ fix/banner-image-overflow
❌ feature/john-task
❌ fix/bug123
❌ my-branch
```

### Commit Message (Conventional Commits)
```
<type>(<scope>): <description>

[optional body]

[optional footer]

Types:
  feat:     Tính năng mới
  fix:      Bug fix
  docs:     Documentation
  style:    Formatting (không thay đổi logic)
  refactor: Refactoring code
  test:     Thêm/sửa tests
  chore:    Build, CI, dependencies
  perf:     Performance improvement

Scope: module bị ảnh hưởng (optional)

✅ feat(services): add service listing page with pagination
✅ fix(auth): resolve JWT refresh token race condition
✅ docs(api): add swagger documentation for v1 endpoints
✅ chore(deps): upgrade next.js to 14.2.5

❌ fixed stuff
❌ WIP
❌ update
❌ misc changes
```

### Pull Request Rules
1. **Title**: Follows conventional commit format
2. **Description**: What + Why + How + Screenshots (if UI)
3. **Size**: Max 400 lines changed (trừ generated files)
4. **Reviews**: Minimum 1 approval required
5. **CI**: All checks must pass
6. **Conflicts**: Resolve trước khi request review

### PR Template
```markdown
## What
[Mô tả thay đổi]

## Why
[Lý do / linked issue]

## How
[Approach / technical decisions]

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass (nếu có UI changes)
- [ ] Manual testing trên local

## Screenshots
[Nếu có thay đổi UI]

## Checklist
- [ ] TypeScript strict, no `any`
- [ ] Error handling đầy đủ
- [ ] No hardcoded values
- [ ] No console.log (dùng logger)
- [ ] Tests added/updated
```

### Git Rules
- **Không force push** lên `main` hoặc `develop`
- **Rebase** feature branch trước khi merge (clean history)
- **Squash commits** khi merge PR (1 commit per feature)
- **Delete branch** sau khi merge
- **Tag releases**: `v1.0.0`, `v1.1.0` (SemVer)
