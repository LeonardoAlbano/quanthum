import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/test/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3100',
  },
  webServer: {
    command: 'pnpm exec next dev -p 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      UPSTASH_REDIS_REST_URL: '',
      UPSTASH_REDIS_REST_TOKEN: '',
    },
  },
});
