import { expect, test } from "@playwright/test";


test("should redirect home page to feed page when user is logged in", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/feed/);
});


