import { POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL, USER_SETTINGS_HEADING_TEXT } from "@/utils/constants";
import test, { expect } from "@playwright/test";

test("should display the settings modal after clicking on the 'Settings' button", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL); // Wait for the content to load
  await page.getByLabel('Settings').click();

  await expect(page.getByRole('heading', { name: USER_SETTINGS_HEADING_TEXT })).toBeVisible();
});