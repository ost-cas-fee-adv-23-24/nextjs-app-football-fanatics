import { expect, test } from "@playwright/test";

const randomNumber = Math.floor(Math.random() * 1000).toString();
const postContent = `This is a test post from football fanatics ${randomNumber}`;

test("should create and delete a post", async ({ page }) => {
  await page.goto("/");

  await page.getByText('Picture Upload').isVisible();

  await page.getByLabel('Send').isDisabled();
  await page.getByPlaceholder('Say it louder for the people').fill(postContent);
  await page.getByLabel('Send').isEnabled();
  await page.getByLabel('Send').click();

  await expect(page.getByText(postContent, { exact: true }), "post should be created").toBeDefined();

  await page.getByRole('button', { name: 'Delete Deleted' }).first().click();
  await page.getByRole('heading', { name: 'Delete Post?' }).isVisible();
  await page.getByLabel('Delete').click({ force: true });

  await expect(page.getByRole('heading', { name: 'Delete Post?' })).not.toBeVisible();
  await expect(page.getByText(postContent), "post should be deleted").not.toBeVisible();
});


