import React from 'react';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import PostFeed from '@/components/post-feed/PostFeed';
import type { Metadata } from 'next';
import frontendConfig from '@/config/configFrontend';
import Cloud from '@/components/cloud/Cloud';

export const metadata: Metadata = {
  title: 'Mumble | HashTags',
  description: 'Mumbles/Likes/Followers/Following/Suggestions',
};

export default async function Page({ params }: { params: { query: string } }) {
  const { query } = params;
  const feedData = await getMumblePosts({
    offset: 0,
    limit: frontendConfig.feed.defaultAmount,
    tags: [query],
  });

  return (
    <div className="global-width mx-auto">
      <div className="py-8 px-8 md:px-0">
        <Cloud query={query} />
        <div className="global-width mx-auto mt-4">
          <PostFeed data={feedData.data} />
        </div>
      </div>
    </div>
  );
}
