import { describe, it, expect, beforeEach } from 'vitest';
import { rateLimitFromRequest } from './rate-limit';

describe('rateLimitFromRequest', () => {
  beforeEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it('blocks after exceeding limit within window', async () => {
    const headers = new Headers({ 'x-forwarded-for': '127.0.0.1' });

    const a = await rateLimitFromRequest({
      reqHeaders: headers,
      routeKey: 'test',
      limit: 3,
      windowMs: 10_000,
    });
    const b = await rateLimitFromRequest({
      reqHeaders: headers,
      routeKey: 'test',
      limit: 3,
      windowMs: 10_000,
    });
    const c = await rateLimitFromRequest({
      reqHeaders: headers,
      routeKey: 'test',
      limit: 3,
      windowMs: 10_000,
    });
    const d = await rateLimitFromRequest({
      reqHeaders: headers,
      routeKey: 'test',
      limit: 3,
      windowMs: 10_000,
    });

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
    expect(c.ok).toBe(true);
    expect(d.ok).toBe(false);
  });
});
