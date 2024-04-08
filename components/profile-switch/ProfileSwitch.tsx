'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Tabs } from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';

interface IProps {
  selectedTab: number;
  userIdentifier: string;
  redirectionDelay?: number;
}

const ProfileSwitch = ({
  selectedTab,
  userIdentifier,
  redirectionDelay = 300,
}: IProps) => {
  const [tabInternal, setTabInternal] = useState(selectedTab);
  const { push } = useRouter();

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
    }

    setTimeout(() => {
      push(redirectUrl);
    }, redirectionDelay);
  }, [tabInternal, userIdentifier]);

  return (
    <>
      {/*fix tabs on design system to apply the effect on the tab position */}
      {/* the selection (active state) is correct. the effect position should be persisted too */}
      <Tabs
        updateSelection={(item) => {
          setTabInternal(item);
        }}
        tabItems={[
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
        ]}
      />
    </>
  );
};

export default ProfileSwitch;
