import test, { expect } from "@playwright/test";

test("should display the settings modal after clicking on the 'Settings' button", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel('Picture Upload');
  await page.getByLabel('Settings').click();

  await expect(page.getByRole('heading', { name: 'Personal settings' })).toBeVisible();
});