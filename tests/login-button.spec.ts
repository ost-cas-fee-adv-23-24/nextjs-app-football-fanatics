import { expect, test } from "@playwright/test";


test("should display login button when user is not logged in", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel('Login')).toBeVisible();
});


