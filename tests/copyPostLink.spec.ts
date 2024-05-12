import { POST_ACTIONS_BAR_COPY_LINK_BUTTON_LABEL } from "@/utils/constants";
import { expect, test } from "@playwright/test";


test("should copy post link", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(POST_ACTIONS_BAR_COPY_LINK_BUTTON_LABEL).first().isVisible();
  await page.getByLabel(POST_ACTIONS_BAR_COPY_LINK_BUTTON_LABEL).first().click();

  const clipboardText = await page.evaluate("navigator.clipboard.readText()");

  expect(clipboardText).toMatch(/\/posts\/[A-Z0-9]+/);
});