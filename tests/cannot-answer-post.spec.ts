import { POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR, POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL, POST_EDITOR_SEND_BUTTON_NAME } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("cannot create a reply to a post when user is not logged in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
  // buttons should not be rendered when user is not logged in
  await expect(page.getByRole('button', { name: POST_EDITOR_SEND_BUTTON_NAME })).not.toBeVisible();
  await expect(page.getByText(POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL)).not.toBeVisible();

});


