import { test, expect } from '@playwright/test';

test('rate limits /api/auth/providers', async ({ request }) => {
  let saw429 = false;

  for (let i = 0; i < 40; i++) {
    const res = await request.get('/api/auth/providers');
    if (res.status() === 429) {
      saw429 = true;
      break;
    }
  }

  expect(saw429).toBe(true);
});
