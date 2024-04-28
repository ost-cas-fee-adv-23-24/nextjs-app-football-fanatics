import { expect, test } from "@playwright/test";


test("should navigate to the home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('h2').first()).toHaveText(
    "Welcome to Mumble",
  );
});

