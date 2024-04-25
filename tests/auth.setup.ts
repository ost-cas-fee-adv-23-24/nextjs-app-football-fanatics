import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const urlRegex = /https:\/\/cas-fee-adv-ed1ide\.zitadel\.cloud\/ui\/login\/login\?authRequestID=\d+/

setup('authenticate', async ({ page }) => {
  setup.slow();
  await page.goto("/");
  // check content is loaded
  await page.getByRole('button', { name: 'Comment' }).first();
  await page.getByLabel('Login').click();
  await page.waitForURL(urlRegex);
  await page.getByPlaceholder('username@domain').fill(
    'patrick.lehmann@ost.ch');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('&aScKvvwq4^wv2Jwhf3xw8iY9wGD6@');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByLabel('Logout')).toBeVisible();

  await page.context().storageState({ path: authFile });
});