'use client';
import ProfileContext from '@/stores/Profile.context';
import { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EApiMethods } from '@/utils/enums/general.enum';

interface IProps {
  children: ReactNode;
}

export interface IProfileData {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userName: string;
  identifier: string;
}

export const ProfileProvider = ({ children }: IProps) => {
  const [profileInfo, setProfileInfo] = useState<IProfileData>({
    avatarUrl: '',
    firstName: '',
    lastName: '',
    userName: '',
    identifier: '',
  });
  const { data: session } = useSession();
  // @ts-ignore
  const identifier = session ? session.user?.identifier : null;

  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (identifier) {
        const data = await fetch(`/api/users/${identifier}`, {
          method: EApiMethods.GET,
        });
        const response = await data.json();
        setProfileInfo({
          avatarUrl: response.avatarUrl,
          firstName: response.firstname,
          lastName: response.lastname,
          userName: response.username,
          identifier,
        });
      } else {
        setProfileInfo({
          avatarUrl: '',
          firstName: '',
          lastName: '',
          userName: '',
          identifier: '',
        });
      }
    })();
  }, [identifier]);

  return (
    <ProfileContext.Provider
      value={{
        identifier: profileInfo.identifier,
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        userName: profileInfo.userName,
        avatarUrl: profileInfo.avatarUrl,
        setProfileInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
