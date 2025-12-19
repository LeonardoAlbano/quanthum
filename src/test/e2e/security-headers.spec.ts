import { test, expect } from '@playwright/test';

test('serves CSP header on home', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);

  const headers = res.headers();
  expect(headers['content-security-policy']).toBeTruthy();
  expect(headers['x-content-type-options']).toBe('nosniff');
});
