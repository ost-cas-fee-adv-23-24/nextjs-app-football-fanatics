import { expect, test } from "@playwright/test";


test("should navigate to the home page and show three posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText('Login to have a full')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.post-wrapper')).toHaveCount(3);
});


