import { auth } from '@/app/api/auth/[...nextauth]/auth';
import Header from '@/components/header/Header';
import ProfileFollow from '@/components/profile-follow/ProfileFollow';
import { getAllFollowers } from '@/utils/helpers/followers/getFollowers';
import { getMumbleUserByIdentifier } from '@/utils/helpers/users/getMumbleUserByIdentifier';
import { IMumbleFollowers } from '@/utils/interfaces/mumbleFollowers.interface';
import { notFound } from 'next/navigation';
import ProfileSwitch from '@/components/profile-switch/ProfileSwitch';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

interface IProfileLayoutProps {
  children: ReactNode;
  params: { identifier: number };
}

export const metadata: Metadata = {
  title: 'Mumble | Profile Mumbles',
  description: 'Mumbles/Likes/Followers/Following/Suggestions',
};

export default async function ProfileLayout({
  children,
  params,
}: IProfileLayoutProps) {
  const currentProfileUserIdentifier = params.identifier.toString();

  const session = await auth();

  const userFollowers: IMumbleFollowers[] = await getAllFollowers({
    identifier: currentProfileUserIdentifier,
  });

  try {
    const profileData = await getMumbleUserByIdentifier({
      identifier: currentProfileUserIdentifier,
      useCache: true,
    });

    return (
      <div className="global-width mx-auto">
        <div className="px-8 md:py-8 md:px-0">
          <div className="-mx-8 md:mx-auto">
            <Header user={profileData} />
          </div>
          {session &&
            session.user.identifier !== currentProfileUserIdentifier && (
              <div className="mt-8 mb-4 mx-4">
                <ProfileFollow
                  loggedInUserIdentifier={session.user.identifier}
                  profileIdentifier={currentProfileUserIdentifier}
                  followers={userFollowers}
                  revalidationPath={`/profiles/${currentProfileUserIdentifier}`}
                />
              </div>
            )}
          <div className="mt-8 mb-4">
            <ProfileSwitch userIdentifier={currentProfileUserIdentifier} />
          </div>
          {children}
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
