'use client';
import React, { useEffect, useMemo } from 'react';
import {
  Button,
  EButtonSizes,
  EButtonTypes,
  EIConTypes,
  Tabs,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';
import useBreakpoints from '@/hooks/useBreakpoints';
import useLayout from '@/hooks/useLayout';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import useUserInfo from '@/hooks/useUserInfo';

interface IProps {
  userIdentifier: string;
  redirectionDelay?: number;
  showSuggestions?: boolean;
}

const ProfileSwitch = ({ userIdentifier, redirectionDelay = 0 }: IProps) => {
  const { push } = useRouter();
  const { isBpMDDown } = useBreakpoints();
  const { currentTabProfile, dispatchLayout } = useLayout();
  const { identifier } = useUserInfo();

  useEffect(() => {
    return () => {
      dispatchLayout({
        type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
        payload: 0,
      });
    };
  }, [dispatchLayout]);

  useEffect(() => {
    let redirectUrl = `/profiles/${userIdentifier}`;
    switch (currentTabProfile) {
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
      push(redirectUrl, { scroll: false });
    }, redirectionDelay);
  }, [currentTabProfile, userIdentifier, push, redirectionDelay]);

  const tabItems = useMemo(() => {
    return [
      {
        isActive: currentTabProfile === 0,
        text: 'Mumbles',
        identifier: 'tab-1',
      },
      {
        isActive: currentTabProfile === 1,
        text: 'Likes',
        identifier: 'tab-2',
      },
      {
        isActive: currentTabProfile === 2,
        text: 'Followers',
        identifier: 'tab-3',
      },
      {
        isActive: currentTabProfile === 3,
        text: 'Following',
        identifier: 'tab-4',
      },
      {
        isActive: currentTabProfile === 4,
        text: 'Suggestions',
        identifier: 'tab-5',
      },
    ];
  }, [currentTabProfile]);

  if (isBpMDDown) {
    return (
      <div className="w-full flex flex-col gap-4">
        <Button
          selected={currentTabProfile === 0}
          icon={EIConTypes.MUMBLE}
          label="Mumbles"
          name="mumbles-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() =>
            dispatchLayout({
              type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
              payload: 0,
            })
          }
        />
        <Button
          selected={currentTabProfile === 1}
          icon={EIConTypes.HEART_BORDERED}
          label="Likes"
          name="likes-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() =>
            dispatchLayout({
              type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
              payload: 1,
            })
          }
        />
        <Button
          selected={currentTabProfile === 2}
          icon={EIConTypes.SHARE}
          label="Followers"
          name="follers-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() =>
            dispatchLayout({
              type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
              payload: 2,
            })
          }
        />
        <Button
          selected={currentTabProfile === 3}
          icon={EIConTypes.CHECKMARK}
          label="Following"
          name="follewing-link"
          fitParent={true}
          size={EButtonSizes.MEDIUM}
          type={EButtonTypes.TERTIARY}
          onCustomClick={() =>
            dispatchLayout({
              type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
              payload: 3,
            })
          }
        />
        {identifier === userIdentifier && (
          <Button
            selected={currentTabProfile === 4}
            icon={EIConTypes.REPOST}
            label="Suggestions"
            name="suggestions-link"
            fitParent={true}
            size={EButtonSizes.MEDIUM}
            type={EButtonTypes.TERTIARY}
            onCustomClick={() =>
              dispatchLayout({
                type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
                payload: 4,
              })
            }
          />
        )}
      </div>
    );
  }

  return (
    <>
      {/*TODO fix tabs on design system:*/}
      {/* - add responsiveness*/}
      {/* - pusher direct reload to persists position*/}

      {/* the selection (active state) is correct. the effect position should be persisted too
          I would not invest time making the tabs responsive. There was no
          requirement for it on the design library.
          We already were punished and
          given a bad grade on that part, and it was clearly said that improvements
          will not be taken into account.
          We already improved a lot the design library, and we are not going to invest more time on it.
          hence... Simple Buttons on mobile
      */}
      <Tabs
        updateSelection={(item) => {
          dispatchLayout({
            type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
            payload: item,
          });
        }}
        tabItems={tabItems}
      />
    </>
  );
};

export default ProfileSwitch;
