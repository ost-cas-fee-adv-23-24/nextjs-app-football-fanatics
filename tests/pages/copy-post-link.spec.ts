import { expect, test } from "@playwright/test";


test("should display the profile page after clicking on the 'Profile' button", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel('Copy Link').first().isVisible();
  await page.getByLabel('Copy Link').first().click();


  const clipboardText = await page.evaluate("navigator.clipboard.readText()");
  expect(clipboardText).toMatch(/\/posts\/[A-Z0-9]+/);
});