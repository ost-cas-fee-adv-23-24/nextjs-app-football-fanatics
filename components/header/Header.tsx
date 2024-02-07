'use client';
import React from 'react';
import {
  Avatar,
  ButtonMenu,
  EAvatarSizes,
  EIConTypes,
  ELogoColors,
  ELogoPositions,
  Logo,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {}

const Header = ({}: IProps) => {
  return (
    <div className="flex justify-between">
      <Logo logoPosition={ELogoPositions.LEFT} color={ELogoColors.WHITE} />
      <div className="flex items-center gap-8">
        <Avatar
          imgSrc="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fe05a89-8245-4bf3-a116-60190b45c665/desav8x-bb7592ce-e995-4dc3-8285-4d8da58f3fe0.jpg/v1/fit/w_828,h_1032,q_70,strp/darth_vader_digital_portrait_by_mrhellouda_desav8x-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM0NiIsInBhdGgiOiJcL2ZcLzJmZTA1YTg5LTgyNDUtNGJmMy1hMTE2LTYwMTkwYjQ1YzY2NVwvZGVzYXY4eC1iYjc1OTJjZS1lOTk1LTRkYzMtODI4NS00ZDhkYTU4ZjNmZTAuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XPTqSqpYx4HTlbRwGl8e0gFWCv0qGKnyV2hci5QlkbI"
          editable={false}
          size={EAvatarSizes.SM}
        />
        <ButtonMenu label="Settings" icon={EIConTypes.SETTINGS} />
        <ButtonMenu label="Logout" icon={EIConTypes.LOGOUT} />
      </div>
    </div>
  );
};

export default Header;
