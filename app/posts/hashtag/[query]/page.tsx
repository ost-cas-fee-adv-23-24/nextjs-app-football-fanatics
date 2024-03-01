import React from 'react';
import { getMumblePosts } from '@/utils/helpers/posts/getMumblePosts';
import config from '@/config';
import PostFeed from '@/components/post-feed/PostFeed';
import {
  ETypographyLevels,
  Heading,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

export default async function Page({ params }: { params: { query: string } }) {
  const { query } = params;
  const feedData = await getMumblePosts({
    offset: 0,
    limit: config.feed.defaultAmount,
    tags: [query],
  });

  return (
    <div className="mx-auto bg-slate-100 pt-8">
      <div className="max-w-4xl mx-auto py-8">
        <Heading
          text={`#${query}`}
          level={ETypographyLevels.ONE}
          inheritColor={true}
        />
        <div className="max-w-4xl mr-auto ml-auto">
          <PostFeed
            data={feedData.data}
            next={feedData.next}
            prev={feedData.prev}
            count={feedData.count}
          />
        </div>
      </div>
    </div>
  );
}
