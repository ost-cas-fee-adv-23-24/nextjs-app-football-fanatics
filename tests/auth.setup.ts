import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const urlRegex = /https:\/\/cas-fee-adv-ed1ide\.zitadel\.cloud\/ui\/login\/login\?authRequestID=\d+/
const username = process.env.TEST_USER_NAME || '';
const password = process.env.TEST_USER_PASSWORD || '';


setup('authenticate', async ({ page }) => {
  setup.slow();
  await page.goto("/");
  await expect(page.getByRole('button', { name: 'Comment' }).first(), "content should be loaded");
  await page.getByLabel('Login').click();
  await page.waitForURL(urlRegex);
  await page.getByPlaceholder('username@domain').fill(
    username);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByLabel('Logout')).toBeVisible();

  await page.context().storageState({ path: authFile });
});