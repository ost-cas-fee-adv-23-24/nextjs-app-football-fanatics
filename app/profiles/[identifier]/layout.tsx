import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Header from "@/components/header/Header";
import ProfileFollow from "@/components/profile-follow/ProfileFollow";
import { getAllFollowers } from "@/utils/helpers/followers/getFollowers";
import { getMumbleUserByIdentifier } from "@/utils/helpers/users/getMumbleUserByIdentifier";
import { IMumbleFollowers } from "@/utils/interfaces/mumbleFollowers.interface";
import { notFound } from "next/navigation";

interface IProfileLayoutProps {
  children: React.ReactNode;
  params: { identifier: number };
}


export default async function ProfileLayout({ children, params }: IProfileLayoutProps) {
  const currentProfileUserIdentifier = params.identifier.toString();

  const session = await auth();

  const userFollowers: IMumbleFollowers[] = await getAllFollowers({
    identifier: currentProfileUserIdentifier,
  });

  try {
    const profileData = await getMumbleUserByIdentifier(
      currentProfileUserIdentifier,
    );

    return (
      <div className="mx-auto bg-slate-100 pt-8">
        <div className="global-width  mx-auto py-8">
          <Header user={profileData} />
          {session && session.user.identifier !== currentProfileUserIdentifier && (
            <div className="mt-8 mb-4">
              <ProfileFollow
                loggedInUserIdentifier={session.user.identifier}
                profileIdentifier={currentProfileUserIdentifier}
                followers={userFollowers}
                revalidationPath={`/profiles/${currentProfileUserIdentifier}`}
              />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }

}