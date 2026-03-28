import Redis from "ioredis";
import { logger } from "./logger";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 2000);
    return delay;
  },
});

redis.on("connect", () => logger.info("Redis connected"));
redis.on("error", (err) => logger.error({ err }, "Redis connection error"));

// Helper: get with JSON parse
export async function cacheGet<T>(key: string): Promise<T | null> {
  const cached = await redis.get(key);
  if (!cached) return null;
  return JSON.parse(cached) as T;
}

// Helper: set with JSON stringify + TTL
export async function cacheSet(key: string, data: unknown, ttlSeconds = 300): Promise<void> {
  await redis.setex(key, ttlSeconds, JSON.stringify(data));
}

// Helper: invalidate by pattern
export async function cacheInvalidate(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
