import { expect, test } from "@playwright/test";


test("cannot like post when user is not logged in", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Like' }).first().click();

  await expect(page.getByText('You need to be logged in to like a post')).toBeVisible();
});

