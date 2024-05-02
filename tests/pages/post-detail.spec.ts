import { expect, test } from "@playwright/test";


test("should navigate to the detail view of a post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Comment' }).first().click();
  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
});


