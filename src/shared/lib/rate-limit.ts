type Result = { ok: boolean; remaining: number; resetMs: number };

const memory = new Map<string, number[]>();

function now() {
  return Date.now();
}

function readIp(headers: Headers) {
  const xff = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const xri = headers.get('x-real-ip')?.trim();
  return xff || xri || 'unknown';
}

async function upstashRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<Result | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  const windowKey = `${key}:${Math.floor(now() / windowMs)}`;
  const incr = await fetch(`${url}/incr/${encodeURIComponent(windowKey)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!incr.ok) return null;

  const data = (await incr.json()) as { result: number };
  const count = data.result;

  await fetch(`${url}/pexpire/${encodeURIComponent(windowKey)}/${windowMs}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const remaining = Math.max(0, limit - count);
  const resetMs = windowMs - (now() % windowMs);

  return { ok: count <= limit, remaining, resetMs };
}

function memoryRateLimit(key: string, limit: number, windowMs: number): Result {
  const t = now();
  const start = t - windowMs;

  const arr = memory.get(key) ?? [];
  const fresh = arr.filter((x) => x > start);
  fresh.push(t);

  memory.set(key, fresh);

  const remaining = Math.max(0, limit - fresh.length);
  const resetMs = windowMs - (t % windowMs);

  return { ok: fresh.length <= limit, remaining, resetMs };
}

export async function rateLimitFromRequest(input: {
  reqHeaders: Headers;
  routeKey: string;
  limit: number;
  windowMs: number;
}): Promise<{ ip: string } & Result> {
  const ip = readIp(input.reqHeaders);
  const key = `rl:${input.routeKey}:${ip}`;

  const upstash = await upstashRateLimit(key, input.limit, input.windowMs);
  const res = upstash ?? memoryRateLimit(key, input.limit, input.windowMs);

  return { ip, ...res };
}
