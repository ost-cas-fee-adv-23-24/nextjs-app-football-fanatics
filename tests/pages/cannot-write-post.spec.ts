import { expect, test } from "@playwright/test";


test("cannot write post because buttons are not rendered", async ({ page }) => {
  await page.goto("/");


  await page.getByRole('button', { name: 'Comment' }).first().isVisible();

  await expect(page.getByRole('button', { name: 'post-submit' })).not.toBeVisible();
  await expect(page.getByText('Picture Upload')).not.toBeVisible();
});


