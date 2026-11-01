type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type CheckRateLimitInput = {
  /** Logical bucket, e.g. "find-options" or "save-result". */
  key: string;

  /** Client identifier, usually IP address or user ID. */
  identifier: string;

  /** Maximum requests allowed within the window. */
  limit: number;

  /** Window length in seconds. */
  windowSeconds: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

/**
 * In-memory rate limiter for the MVP.
 *
 * This is per server instance. For multi-instance production deployments,
 * replace the store with Redis, Upstash, or another shared cache.
 */
const store = new Map<string, RateLimitEntry>();

export async function checkRateLimit({
  key,
  identifier,
  limit,
  windowSeconds,
}: CheckRateLimitInput): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const storageKey = `${key}:${identifier}`;

  const existing = store.get(storageKey);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;

    store.set(storageKey, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.resetAt - now) / 1000),
    );

    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  store.set(storageKey, existing);

  return {
    allowed: true,
    limit,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    retryAfterSeconds: 0,
  };
}

/**
 * Prevents unbounded memory growth by removing expired entries.
 * Call this periodically, for example from a cron route or instrumentation hook.
 */
export function pruneExpiredRateLimits(now = Date.now()): void {
  for (const [storageKey, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(storageKey);
    }
  }
}
