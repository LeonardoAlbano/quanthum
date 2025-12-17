import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  AUTH_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  NASA_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

let cached = null as z.infer<typeof serverEnvSchema> | null;

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => i.path.join('.') + ': ' + i.message).join('\n');
    throw new Error('Invalid environment variables:\n' + issues);
  }
  cached = parsed.data;
  return cached;
}
