import config from '@/config';
import { POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR } from '@/utils/constants';
import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const urlRegex = /https:\/\/cas-fee-adv-ed1ide\.zitadel\.cloud\/ui\/login\/login\?authRequestID=\d+/;
const username = config.testing.username;
const password = config.testing.password;

setup('authenticate', async ({ page }) => {
  setup.slow();
  await page.goto('/');
  await expect(page.getByRole('button', { name: POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR }).first(), 'content should be loaded').toBeVisible();

  await page.getByLabel('Login').click();
  await page.waitForURL(urlRegex);
  await page.getByPlaceholder('username@domain').fill(username);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByLabel('Logout')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
