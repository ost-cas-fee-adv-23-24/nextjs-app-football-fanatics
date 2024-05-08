import { expect, test } from "@playwright/test";


test("cannot write post when user is not logged in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Comment' }).first().isVisible();

  // buttons should not be rendered when user is not logged in
  await expect(page.getByRole('button', { name: 'post-submit' })).not.toBeVisible();
  await expect(page.getByText('Picture Upload')).not.toBeVisible();
});


