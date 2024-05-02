import { expect, test } from "@playwright/test";


test("should create a reply to a post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Comment' }).first().click();
  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
  await expect(page.getByRole('button', { name: 'post-submit' })).not.toBeVisible();
  await expect(page.getByText('Picture Upload')).not.toBeVisible();

});


