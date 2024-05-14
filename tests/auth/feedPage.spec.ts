import { expect, test } from "@playwright/test";


test("should redirect from home page to feed or feed new page when user is logged in", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/feed(\/new)?/);

});


