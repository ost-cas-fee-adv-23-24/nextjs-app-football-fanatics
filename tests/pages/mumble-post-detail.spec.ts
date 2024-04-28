import { expect, test } from "@playwright/test";


test("should navigate to the detail view of a post and check reply buttons", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Comment' }).first().click();
  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
  await expect(page.getByRole('button', { name: 'post-submit' })).toBeDefined();
  await expect(page.getByText('Picture Upload')).toBeVisible();
});


