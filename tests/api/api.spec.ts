import { expect, test } from '@playwright/test';
import postSchema from '../schemas/postSchema';

test('GET Mumble Posts', async ({ request }) => {
  const getPosts = await request.get("https://mumble-api-prod-4cxdci3drq-oa.a.run.app/posts?offset=0&limit=100");
  expect(getPosts.ok()).toBeTruthy();
  const responseJson = await getPosts.json();
  expect(() => postSchema.parse(responseJson)).not.toThrow();
});