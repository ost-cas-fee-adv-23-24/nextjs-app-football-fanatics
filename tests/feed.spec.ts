import { NOT_LOGGED_IN_MESSAGE } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("should navigate to the home page and show three posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(NOT_LOGGED_IN_MESSAGE)).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.post-wrapper')).toHaveCount(3);
});


