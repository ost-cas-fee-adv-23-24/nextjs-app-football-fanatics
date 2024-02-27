'use client';
import { IPostCreator } from '@/utils/interfaces/mumblePost.interface';
import {
  Avatar,
  ButtonIcon,
  EAvatarSizes,
  EButtonTypes,
  EIConTypes,
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import Image from 'next/image';

interface Props {
  user: IPostCreator;
}

function Header({ user }: Props) {
  return (
    <div className="w-[680px]">
      <div className="rounded-2xl overflow-hidden">
        <Image
          src={'/header.png'}
          alt="Header Image"
          width={680}
          height={320}
        />
      </div>

      <div className="absolute">
        <Avatar
          nameHtml="avatar"
          size={EAvatarSizes.XL}
          editable={false}
          imgSrc={user.avatarUrl}
        />
      </div>

      <div className="pt-6">
        <div className="pb-2 text-slate-900">
          <Heading
            level={ETypographyLevels.THREE}
            text={user.username}
            inheritColor
          />
        </div>

        <div className="flex gap-4">
          <ButtonIcon
            name="profile"
            icon={EIConTypes.PROFILE}
            type={EButtonTypes.PRIMARY}
            label={user.username}
          />
          <ButtonIcon
            name="location"
            icon={EIConTypes.LOCATION}
            type={EButtonTypes.SECONDARY}
            label="Chur"
          />
          <ButtonIcon
            name="calendar"
            icon={EIConTypes.CALENDAR}
            type={EButtonTypes.SECONDARY}
            label="Mitglied seit 3 Jahren"
          />
        </div>

        <div className="pt-3 text-slate-400 font-medium">
          <Paragraph
            size={EParagraphSizes.MEDIUM}
            text={`Hey there! I'm ${user.username}, and I'm all about capturing life through my lens. 🌟 By day, I'm diving into the world of insurance, but when the sun sets, you'll find me chasing the perfect shot. 🌅 Let's explore the beauty of both worlds together!`}
            inheritColor
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
