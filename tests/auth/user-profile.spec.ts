import { expect, test } from "@playwright/test";


test("should display the profile page after clicking on the 'Profile' button", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel('Picture Upload');
  await page.getByLabel('Profile').click();

  await expect(page).toHaveURL(/\/profiles\/[A-Z0-9]+/);
  await expect(page.getByRole('button', { name: 'edit' })).toBeVisible();
});


