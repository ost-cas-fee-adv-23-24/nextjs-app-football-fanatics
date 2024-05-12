import { POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("should navigate to the detail view of a post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
});


