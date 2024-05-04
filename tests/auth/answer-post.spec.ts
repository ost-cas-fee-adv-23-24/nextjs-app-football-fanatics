import { expect, test } from "@playwright/test";

const randomNumber = Math.floor(Math.random() * 1000).toString();
const replyContent = `This is a test reply from football fanatics ${randomNumber}`;

test("should create and delete a reply to a post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: 'Comment' }).first().click();

  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
  await expect(page.getByText('Picture Upload').isVisible());

  await page.getByLabel('Send').isDisabled();
  await page.getByPlaceholder('What is your opinion about').fill(replyContent);
  await page.getByLabel('Send').isEnabled();
  await page.getByLabel('Send').click();

  await expect(page.getByText(replyContent, { exact: true }), "reply should be created").toBeDefined();

  await page.getByRole('button', { name: 'Delete Deleted' }).last().click();
  await page.getByRole('heading', { name: 'Delete Post?' }).isVisible();
  await page.getByLabel('Delete').click({ force: true });

  await expect(page.getByRole('heading', { name: 'Delete Post?' })).not.toBeVisible();
  await expect(page.getByText(replyContent), "reply should be deleted").not.toBeVisible();
});


