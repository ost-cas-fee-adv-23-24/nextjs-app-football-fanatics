import { auth } from '@/app/api/auth/[...nextauth]/auth';
import Header from '@/components/header/Header';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { Session } from 'next-auth';
import React from 'react';
import FeedAuthorizedNew from '@/components/feed-authorized-new/FeedAuthorizedNew';

// Is new user if the user is not following anyone.
// We could also check if the user has any posts.
// see middleware.ts

export default async function Page() {
  // middleware checks if user is authenticated before hitting this page
  const session = (await auth()) as Session;

  const profileData = await getMumbleUserByIdentifier({
    identifier: session.user.identifier,
    useCache: true,
  });

  return (
    <div className="mx-auto">
      <div className="global-width mx-auto pb-8 md:py-8">
        <Header user={profileData} />
      </div>
      <div className="global-width mx-auto px-8 md:px-0">
        <FeedAuthorizedNew userIdentifier={session.user.identifier} />
      </div>
    </div>
  );
}
