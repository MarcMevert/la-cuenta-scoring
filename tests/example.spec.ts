import { test, expect } from '@playwright/test';

test('ends immediately when someone reaches zero and picks highest savings winner', async ({ page }) => {
  await page.goto('/');

  await page.locator('.count-btn[data-count="3"]').click();

  const nameInputs = page.locator('.name-input');
  await nameInputs.nth(0).fill('AAA');
  await nameInputs.nth(1).fill('BBB');
  await nameInputs.nth(2).fill('CCC');

  await page.locator('#start-btn').click();

  await page.locator('.bill-input[data-player="AAA"]').fill('100');
  await page.locator('.bill-input[data-player="BBB"]').fill('100');
  await page.locator('.bill-input[data-player="CCC"]').fill('100');
  await page.locator('#submit-round').click();

  await expect(page.locator('#round-label')).toHaveText('Round 2');

  await page.locator('.bill-input[data-player="AAA"]').fill('800');
  await page.locator('.bill-input[data-player="BBB"]').fill('10');
  await page.locator('.bill-input[data-player="CCC"]').fill('20');
  await page.locator('#submit-round').click();

  await expect(page.locator('#round-label')).toHaveText('Game Over');
  await expect(page.locator('.winner-msg')).toContainText('BBB');
  await expect(page.locator('.winner-msg')).toContainText('790');
  await expect(page.locator('.bill-input')).toHaveCount(0);
});
