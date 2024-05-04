import { expect, test } from "@playwright/test";


test("should like and unlike post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Like' }).first().click();

  await expect(page.getByRole('button', { name: 'Likes Liked' }).first(), "should liked the post").toBeVisible();

  await page.getByRole('button', { name: 'Like' }).first().click();

  await expect(page.getByRole('button', { name: 'Likes Unliked' }).first(), "should unliked the post").toBeVisible();
});


