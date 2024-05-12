import { POST_ACTIONS_BAR_DELETE_TITLE_TEXT, POST_EDITOR_GENERAL_POST_PLACEHOLDER_TEXT, POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL, POST_EDITOR_SEND_BUTTON_LABEL } from "@/utils/constants";
import { expect, test } from "@playwright/test";

const randomNumber = Math.floor(Math.random() * 1000).toString();
const postContent = `This is a test post from football fanatics ${randomNumber}`;

test("should create and delete a post", async ({ page }) => {
  await page.goto("/");

  await page.getByText(POST_EDITOR_PICTURE_UPLOAD_BUTTON_LABEL).isVisible();

  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).isDisabled();
  await page.getByPlaceholder(POST_EDITOR_GENERAL_POST_PLACEHOLDER_TEXT).fill(postContent);
  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).isEnabled();
  await page.getByLabel(POST_EDITOR_SEND_BUTTON_LABEL).click();

  await expect(page.getByText(postContent, { exact: true }), "post should be created").toBeDefined();

  await page.getByRole('button', { name: 'Delete Deleted' }).first().click();
  await page.getByRole('heading', { name: POST_ACTIONS_BAR_DELETE_TITLE_TEXT }).isVisible();
  await page.getByLabel('Delete').click({ force: true });

  await expect(page.getByRole('heading', { name: POST_ACTIONS_BAR_DELETE_TITLE_TEXT })).not.toBeVisible();
  await expect(page.getByText(postContent), "post should be deleted").not.toBeVisible();
});


