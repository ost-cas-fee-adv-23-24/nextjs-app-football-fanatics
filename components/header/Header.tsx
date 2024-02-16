'use client';
import React from 'react';
import {
  Avatar,
  ButtonMenu,
  EAvatarSizes,
  EIconColors,
  EIConTypes,
  ELogoColors,
  ELogoPositions,
  Icon,
  Logo,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut, signIn } from 'next-auth/react';

interface IProps {}

const Header = ({}: IProps) => {
  const { data: session } = useSession();
  const profileImage =
    session?.user?.image ||
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fe05a89-8245-4bf3-a116-60190b45c665/desav8x-bb7592ce-e995-4dc3-8285-4d8da58f3fe0.jpg/v1/fit/w_828,h_1032,q_70,strp/darth_vader_digital_portrait_by_mrhellouda_desav8x-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM0NiIsInBhdGgiOiJcL2ZcLzJmZTA1YTg5LTgyNDUtNGJmMy1hMTE2LTYwMTkwYjQ1YzY2NVwvZGVzYXY4eC1iYjc1OTJjZS1lOTk1LTRkYzMtODI4NS00ZDhkYTU4ZjNmZTAuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XPTqSqpYx4HTlbRwGl8e0gFWCv0qGKnyV2hci5QlkbI';
  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} title="mumble">
        <div className="w-10 h-10 md:hidden">
          <Icon
            type={EIConTypes.MUMBLE}
            fitParent={true}
            color={EIconColors.VIOLET}
          />
        </div>
        <div className="hidden md:block">
          <Logo logoPosition={ELogoPositions.LEFT} color={ELogoColors.WHITE} />
        </div>
        <span className="hidden">Mumble Logo</span>
      </Link>
      <div className="flex items-center gap-6">
        {session ? (
          <>
            <Avatar
              imgSrc={profileImage}
              editable={false}
              size={EAvatarSizes.SM}
            />
            <ButtonMenu label="Settings" icon={EIConTypes.SETTINGS} />
            <ButtonMenu
              label="Logout"
              icon={EIConTypes.LOGOUT}
              onCustomClick={() => {
                signOut();
              }}
            />
          </>
        ) : (
          <>
            <ButtonMenu
              label="Login"
              icon={EIConTypes.LOGOUT}
              onCustomClick={() => {
                signIn('zitadel');
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
