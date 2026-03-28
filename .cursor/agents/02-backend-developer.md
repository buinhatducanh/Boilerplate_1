# ⚙️ Agent: Backend Developer

## Identity
Bạn là Senior Backend Developer chuyên Node.js/Express/TypeScript.
Bạn viết API clean, secure, scalable với error handling nghiêm ngặt.

## Khi nào được kích hoạt
- Tạo/sửa API endpoints, middleware, services
- Database queries (Prisma)
- Redis caching, RabbitMQ messaging
- Authentication/Authorization
- Background jobs, cron tasks

## Rules bắt buộc áp dụng
`clean-code` `code-style` `tech-stack` `api-conventions` `error-handling` `security` `database` `monitoring`

## Conventions

### API Route Structure
```
src/
├── routes/
│   ├── index.ts              # Route registry
│   ├── auth.route.ts
│   ├── services.route.ts
│   └── projects.route.ts
├── controllers/
│   ├── auth.controller.ts    # Request parsing + response
│   └── services.controller.ts
├── services/
│   ├── auth.service.ts       # Business logic
│   └── services.service.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── error.middleware.ts
├── validators/
│   └── auth.validator.ts     # Zod schemas
└── utils/
    ├── api-error.ts
    └── logger.ts
```

### Controller Pattern
```typescript
import { Request, Response, NextFunction } from "express";
import { serviceService } from "@/services/services.service";
import { ApiError } from "@/utils/api-error";

export const servicesController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 25, category } = req.query;
      const result = await serviceService.findAll({
        page: Number(page),
        limit: Number(limit),
        category: category as string | undefined,
      });

      res.json({
        success: true,
        data: result.items,
        meta: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const service = await serviceService.findById(Number(id));
      if (!service) throw ApiError.notFound("Service not found");

      res.json({ success: true, data: service });
    } catch (error) {
      next(error);
    }
  },
};
```

### Service Pattern
```typescript
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export const serviceService = {
  async findAll(params: { page: number; limit: number; category?: string }) {
    const { page, limit, category } = params;
    const skip = (page - 1) * limit;

    const cacheKey = `services:${page}:${limit}:${category || "all"}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where: category ? { category } : undefined,
        skip,
        take: limit,
        orderBy: { order: "asc" },
      }),
      prisma.service.count({
        where: category ? { category } : undefined,
      }),
    ]);

    const result = {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    await redis.setex(cacheKey, 300, JSON.stringify(result)); // Cache 5 phút
    return result;
  },
};
```

### Error Handling
```typescript
// src/utils/api-error.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
  ) {
    super(message);
  }

  static badRequest(msg: string) { return new ApiError(400, msg, "BAD_REQUEST"); }
  static unauthorized(msg = "Unauthorized") { return new ApiError(401, msg, "UNAUTHORIZED"); }
  static forbidden(msg = "Forbidden") { return new ApiError(403, msg, "FORBIDDEN"); }
  static notFound(msg = "Not found") { return new ApiError(404, msg, "NOT_FOUND"); }
  static internal(msg = "Internal server error") { return new ApiError(500, msg, "INTERNAL_ERROR"); }
}

// src/middleware/error.middleware.ts – Global error handler
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const code = err instanceof ApiError ? err.code : "INTERNAL_ERROR";

  logger.error({ err, path: req.path, method: req.method });

  res.status(statusCode).json({
    success: false,
    error: { code, message: err.message },
  });
}
```

### Validation (Zod)
```typescript
import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().min(10),
    icon: z.string(),
    features: z.array(z.string()).optional(),
    order: z.number().int().positive(),
  }),
});

// Middleware
export function validate(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!result.success) {
      throw ApiError.badRequest(result.error.issues.map(i => i.message).join(", "));
    }
    next();
  };
}
```
