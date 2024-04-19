import { expect, test } from '@playwright/test';

test('has login button', async ({ page }) => {
  await page.goto('https://www.cusconews.com/');
  await expect(page.getByLabel('Login')).toBeVisible();
});

test('can log in and has Settings, Logout and Profile button', async ({ page }) => {
  await page.goto('https://www.cusconews.com/');
  // await page.goto('localhost:3000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('username@domain').click();
  await page.getByPlaceholder('username@domain').fill('patrick.lehmann@ost.ch');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('&aScKvvwq4^wv2Jwhf3xw8iY9wGD6@');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByLabel('Settings')).toBeVisible();
  await expect(page.getByLabel('Logout')).toBeVisible();
}
);