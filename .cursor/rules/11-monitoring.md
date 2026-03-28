# Rule: Monitoring

## Áp dụng: Khi viết services, APIs

### Logging (Pino – Structured JSON)
```typescript
// src/lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "development"
    ? { target: "pino-pretty" }
    : undefined,
  // Production: JSON output → Grafana Loki / ELK
});

// Usage
logger.info({ userId: user.id, action: "login" }, "User logged in");
logger.error({ err, path: req.path }, "Request failed");
logger.warn({ remaining: rateLimitRemaining }, "Rate limit approaching");
```

### Log Levels
| Level | Usage |
|-------|-------|
| `fatal` | App crash, không thể recover |
| `error` | Operation failed, cần investigate |
| `warn` | Unusual nhưng không fail (deprecated API, rate limit warning) |
| `info` | Business events (user login, order created) |
| `debug` | Technical details (query time, cache hit/miss) |
| `trace` | Verbose debugging (only dev) |

### Metrics (Prometheus)
```typescript
// src/lib/metrics.ts
import { Registry, Counter, Histogram, collectDefaultMetrics } from "prom-client";

export const register = new Registry();
collectDefaultMetrics({ register });

// HTTP request metrics
export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register],
});

export const httpRequestTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

// Business metrics
export const ordersCreated = new Counter({
  name: "orders_created_total",
  help: "Total orders created",
  registers: [register],
});

// Expose endpoint
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
```

### Health Check Endpoint
```typescript
// GET /health
app.get("/health", async (_req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    rabbitmq: await checkRabbitMQ(),
  };

  const healthy = Object.values(checks).every((c) => c.status === "ok");

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
});
```

### Rules
1. **Không log sensitive data**: passwords, tokens, PII
2. **Structured logging**: JSON format, không `console.log`
3. **Request ID tracing**: mỗi request có unique ID xuyên suốt
4. **Alert thresholds**: Error rate > 1%, Response time P95 > 2s, CPU > 80%
