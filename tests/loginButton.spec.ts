import { GLOBAL_HEADER_LOGIN_BUTTON_LABEL } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("should display login button when user is not logged in", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel(GLOBAL_HEADER_LOGIN_BUTTON_LABEL)).toBeVisible();
});


