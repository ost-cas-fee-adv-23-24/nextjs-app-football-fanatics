'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  EButtonSizes,
  EButtonTypes,
  EIConTypes,
  Tabs,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';
import useBreakpoints from '@/hooks/useBreakpoints';

interface IProps {
  selectedTab: number;
  userIdentifier: string;
  redirectionDelay?: number;
  showSuggestions?: boolean;
}

const ProfileSwitch = ({
  selectedTab,
  userIdentifier,
  redirectionDelay = 300,
}: IProps) => {
  const [tabInternal, setTabInternal] = useState(selectedTab);
  const { push } = useRouter();
  const { isBpMDDown } = useBreakpoints();

  useEffect(() => {
    let redirectUrl = `/profiles/${userIdentifier}`;
    switch (tabInternal) {
      case 0:
        redirectUrl = `/profiles/${userIdentifier}`;
        break;
      case 1:
        redirectUrl = `/profiles/${userIdentifier}/likes`;
        break;
      case 2:
        redirectUrl = `/profiles/${userIdentifier}/followers`;
        break;
      case 3:
        redirectUrl = `/profiles/${userIdentifier}/following`;
        break;
      case 4:
        redirectUrl = `/profiles/${userIdentifier}/suggestions`;
        break;
    }

    setTimeout(() => {
      push(redirectUrl);
    }, redirectionDelay);
  }, [tabInternal, userIdentifier, push, redirectionDelay]);

  if (isBpMDDown) {
    return (
      <div className="w-full flex flex-col gap-4">
        <Button
          icon={EIConTypes.MUMBLE}
          label="Mumbles"
          name="mumbles-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() => setTabInternal(0)}
        />
        <Button
          icon={EIConTypes.HEART_BORDERED}
          label="Likes"
          name="likes-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() => setTabInternal(1)}
        />
        <Button
          icon={EIConTypes.SHARE}
          label="Followers"
          name="follers-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() => setTabInternal(2)}
        />
        <Button
          icon={EIConTypes.CHECKMARK}
          label="Following"
          name="follewing-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() => setTabInternal(3)}
        />
        <Button
          icon={EIConTypes.REPOST}
          label="Suggestions"
          name="suggestions-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() => setTabInternal(4)}
        />
      </div>
    );
  }

  return (
    <>
      {/*TODO fix tabs on design system to apply the effect on the tab position  and add responsiveness*/}
      {/* the selection (active state) is correct. the effect position should be persisted too */}
      {/*******/}
      {/* I would not invest time making the tabs responsive. There was not*/}
      {/* requirement for it on the design library. We already were punished and*/}
      {/* given a bad grade on that part, and it was clearly said that improvements*/}
      {/* will not be taken into account. We already improved a lot the design*/}
      {/* library and we are not going to invest more time on it. hence ... Simple*/}
      {/*Buttons on mobile*/}
      <Tabs
        updateSelection={(item) => {
          setTabInternal(item);
        }}
        tabItems={(() => {
          const data = [
            {
              isActive: tabInternal === 0,
              text: 'Mumbles',
              identifier: 'tab-1',
            },
            {
              isActive: tabInternal === 1,
              text: 'Likes',
              identifier: 'tab-2',
            },
            {
              isActive: tabInternal === 2,
              text: 'Followers',
              identifier: 'tab-3',
            },
            {
              isActive: tabInternal === 3,
              text: 'Following',
              identifier: 'tab-4',
            },
            {
              isActive: tabInternal === 4,
              text: 'Suggestions',
              identifier: 'tab-5',
            },
          ];

          return data;
        })()}
      />
    </>
  );
};

export default ProfileSwitch;
