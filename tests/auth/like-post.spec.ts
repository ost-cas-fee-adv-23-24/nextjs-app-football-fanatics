import { POST_ACTIONS_BAR_LIKED_BUTTON_LABEL, POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_PLURAL, POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR, POST_ACTIONS_BAR_UNLIKED_BUTTON_LABEL } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("should like and unlike post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page.getByRole('button', { name: `${POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_PLURAL} ${POST_ACTIONS_BAR_LIKED_BUTTON_LABEL}` }).first(), "should liked the post").toBeVisible();

  await page.getByRole('button', { name: POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page.getByRole('button', { name: `${POST_ACTIONS_BAR_LIKE_BUTTON_LABEL_PLURAL} ${POST_ACTIONS_BAR_UNLIKED_BUTTON_LABEL}` }).first(), "should unliked the post").toBeVisible();
});


