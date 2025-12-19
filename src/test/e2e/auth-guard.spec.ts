import { test, expect } from '@playwright/test';

test('redirects unauthenticated user from /dashboard to /login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});
