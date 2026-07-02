import { test, expect } from '@playwright/test';

test('should display the leaderboard page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
