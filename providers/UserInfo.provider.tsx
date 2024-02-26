'use client';
import UserInfoContext from '@/stores/UserInfo.context';
import { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EApiMethods } from '@/utils/enums/general.enum';

interface IProps {
  children: ReactNode;
}

export interface IUserInfoData {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userName: string;
  nameZitadel: string;
  identifier?: string;
  isLoggedIn: boolean;
  token?: string;
}

export const UserInfoProvider = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<IUserInfoData>({
    avatarUrl: '', // not available in session
    firstName: '', // not available in session
    lastName: '', // not available in session
    userName: '', // not available in session
    nameZitadel:
      session && session.user && typeof session.user.name === 'string'
        ? session.user.name
        : '',
    identifier: session ? session.user.identifier : undefined,
    isLoggedIn: status === 'authenticated',
    token: session ? session.accessToken : undefined,
  });

  useEffect(() => {
    const identifier = session?.user?.identifier;
    if (!identifier) return;
    (async () => {
      const data = await fetch(`/api/users/${identifier}`, {
        method: EApiMethods.GET,
      });
      const response = await data.json();
      setUserInfo({
        avatarUrl: response.avatarUrl,
        firstName: response.firstname,
        lastName: response.lastname,
        userName: response.username,
        identifier,
        isLoggedIn: status === 'authenticated',
        token: session ? session.accessToken : undefined,
        nameZitadel:
          session && session.user && typeof session.user.name === 'string'
            ? session.user.name
            : '',
      });
    })();
  }, [session]);

  return (
    <UserInfoContext.Provider
      value={{
        identifier: userInfo.identifier,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userName: userInfo.userName,
        avatarUrl: userInfo.avatarUrl,
        token: userInfo.token,
        zitadelName: userInfo.nameZitadel,
        isLoggedIn: userInfo.isLoggedIn,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
