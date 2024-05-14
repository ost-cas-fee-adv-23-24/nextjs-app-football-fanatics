import { POST_ACTIONS_BAR_DIALOG_LOGIN_MESSAGE, POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("cannot like post when user is not logged in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page.getByText(POST_ACTIONS_BAR_DIALOG_LOGIN_MESSAGE)).toBeVisible();
});

