import { test, expect } from '@playwright/test';

test('new game clears persisted history before starting another game', async ({ page }) => {
  await page.goto('/');

  // Start game with 3 players.
  await page.locator('.count-btn[data-count="3"]').click();

  const setupInputs3 = page.locator('.name-input');
  await setupInputs3.nth(0).fill('AAA');
  await setupInputs3.nth(1).fill('BBB');
  await setupInputs3.nth(2).fill('CCC');
  await page.locator('#start-btn').click();

  // Add 3 history entries (3 rounds).
  for (let i = 0; i < 3; i++) {
    await page.locator('.bill-input[data-player="AAA"]').fill('10');
    await page.locator('.bill-input[data-player="BBB"]').fill('20');
    await page.locator('.bill-input[data-player="CCC"]').fill('30');
    await page.locator('#submit-round').click();
  }

  await expect(page.locator('#history-body tr')).toHaveCount(4);

  const savedBeforeReset = await page.evaluate(() => {
    const raw = localStorage.getItem('lacuenta');
    return raw ? JSON.parse(raw) : null;
  });
  expect(savedBeforeReset).not.toBeNull();
  expect(savedBeforeReset.history).toHaveLength(3);

  // Start a new game, then create a 4-player game with the same names for first 3.
  await page.locator('#new-game-btn').click();
  await expect(page.locator('#screen-setup')).toHaveClass(/active/);

  await page.locator('.count-btn[data-count="4"]').click();

  const setupInputs4 = page.locator('.name-input');
  await setupInputs4.nth(0).fill('AAA');
  await setupInputs4.nth(1).fill('BBB');
  await setupInputs4.nth(2).fill('CCC');
  await setupInputs4.nth(3).fill('DDD');
  await page.locator('#start-btn').click();

  // History should be empty in the UI for the new game.
  await expect(page.locator('#history-head th')).toHaveCount(5);
  await expect(page.locator('#history-body tr')).toHaveCount(1);
  await expect(page.locator('#history-body tr:not(.history-total)')).toHaveCount(0);
  await expect(page.locator('#history-body tr.history-total td')).toHaveCount(5);
  await expect(page.locator('#history-body tr.history-total')).toContainText('Total');
});
