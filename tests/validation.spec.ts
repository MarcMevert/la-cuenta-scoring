import { test, expect } from '@playwright/test';

test('prevents submitting bills above player savings and allows submit after correction', async ({ page }) => {
  await page.goto('/');

  await page.locator('.count-btn[data-count="3"]').click();

  const nameInputs = page.locator('.name-input');
  await nameInputs.nth(0).fill('AAA');
  await nameInputs.nth(1).fill('BBB');
  await nameInputs.nth(2).fill('CCC');

  await page.locator('#start-btn').click();

  const aaaInput = page.locator('.bill-input[data-player="AAA"]');
  await aaaInput.fill('901');

  const aaaError = aaaInput.locator('xpath=ancestor::div[contains(@class,"bill-field")]//div[contains(@class,"bill-error")]');
  await expect(aaaError).toContainText('Max');

  await page.locator('.bill-input[data-player="BBB"]').fill('1');
  await page.locator('.bill-input[data-player="CCC"]').fill('1');
  await page.locator('#submit-round').click();

  // Round must not advance while any value is above the player's savings.
  await expect(page.locator('#round-label')).toHaveText('Round 1');

  await aaaInput.fill('899');
  await expect(aaaError).toHaveText('');

  await page.locator('#submit-round').click();
  await expect(page.locator('#round-label')).toHaveText('Round 2');
});
