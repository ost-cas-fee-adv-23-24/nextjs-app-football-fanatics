import { POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR, POST_ACTIONS_BAR_DELETE_TITLE_TEXT, POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL, POST_EDITOR_SEND_BUTTON_LABEL } from "@/utils/constants";
import { expect, test } from "@playwright/test";

const randomNumber = Math.floor(Math.random() * 1000).toString();
const replyContent = `This is a test reply from football fanatics ${randomNumber}`;

test("should create and delete a reply to a post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('button', { name: POST_ACTIONS_BAR_COMMENT_BUTTON_LABEL_SINGULAR }).first().click();

  await expect(page).toHaveURL(/\/posts\/[A-Z0-9]+/);
  await expect(page.getByText(POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL)).toBeVisible();

  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).isDisabled();
  await page.getByPlaceholder('What is your opinion about').fill(replyContent);
  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).isEnabled();
  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).click();

  await expect(page.getByText(replyContent, { exact: true }), "reply should be created").toBeDefined();

  await page.getByRole('button', { name: 'Delete Deleted' }).last().click();
  await page.getByRole('heading', { name: POST_ACTIONS_BAR_DELETE_TITLE_TEXT }).isVisible();
  await page.getByLabel('Delete').click({ force: true });

  await expect(page.getByRole('heading', { name: POST_ACTIONS_BAR_DELETE_TITLE_TEXT })).not.toBeVisible();
  await expect(page.getByText(replyContent), "reply should be deleted").not.toBeVisible();
});


