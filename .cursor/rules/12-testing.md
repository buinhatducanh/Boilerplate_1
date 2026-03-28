# Rule: Testing

## Áp dụng: Khi viết và review code

### Coverage Requirements
| Type | Minimum | Target |
|------|---------|--------|
| Unit Tests | 80% | 90% |
| Integration Tests | 60% | 80% |
| E2E Tests | Critical paths | Happy + error flows |

### Test Pyramid
```
         ╱╲
        ╱ E2E ╲           Ít tests, chậm, đắt
       ╱────────╲          Playwright: 10-20 tests
      ╱Integration╲       Vừa: API + DB
     ╱──────────────╲      Vitest: 30-50 tests
    ╱   Unit Tests    ╲    Nhiều tests, nhanh, rẻ
   ╱────────────────────╲  Vitest: 100+ tests
```

### Test Structure (AAA Pattern)
```typescript
describe("ServiceService", () => {
  describe("findAll", () => {
    it("returns paginated services sorted by order", async () => {
      // Arrange – Setup data, mocks
      const mockServices = [
        { id: 1, title: "Design", order: 1 },
        { id: 2, title: "Dev", order: 2 },
      ];
      vi.mocked(prisma.service.findMany).mockResolvedValue(mockServices);
      vi.mocked(prisma.service.count).mockResolvedValue(2);

      // Act – Execute
      const result = await serviceService.findAll({ page: 1, limit: 10 });

      // Assert – Verify
      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(prisma.service.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { order: "asc" } }),
      );
    });
  });
});
```

### What to Test

**LUÔN TEST:**
- Business logic (services, utilities)
- API endpoints (request → response)
- Input validation (valid + invalid cases)
- Error paths (not found, unauthorized, server error)
- Edge cases (empty array, null, boundary values)
- Critical user flows (E2E: login, form submit, navigation)

**KHÔNG CẦN TEST:**
- Framework internals (React rendering, Next.js routing)
- Third-party library functionality
- Pure UI layout (dùng visual regression nếu cần)
- Private/internal functions (test qua public interface)
- Constants / type definitions

### Component Testing
```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { ServiceCard } from "@/components/ui/ServiceCard";

describe("ServiceCard", () => {
  const mockService = {
    id: 1,
    title: "UI/UX Design",
    description: "Design services",
    icon: "palette",
    features: ["Wireframe", "Prototype"],
    slug: "ui-ux",
    order: 1,
  };

  it("renders service title and description", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
    expect(screen.getByText("Design services")).toBeInTheDocument();
  });

  it("renders all features", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Wireframe")).toBeInTheDocument();
    expect(screen.getByText("Prototype")).toBeInTheDocument();
  });
});
```

### Test Config
```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```
