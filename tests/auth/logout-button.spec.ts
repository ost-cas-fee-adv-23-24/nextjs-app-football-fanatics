import { expect, test } from "@playwright/test";


test("user should be signed in and see logout button", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel('Logout')).toBeVisible();
});


