'use client';
import React, { useState } from 'react';
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

  return (
    <>
      {/*fix tabs on design system to apply the effect on the tab position */}
      {/* the selection (active state) is correct. the effect position should be persisted too */}
      <Tabs
        updateSelection={(item) => {
          setTabInternal(item);
          setTimeout(() => {
            const url =
              item === 0
                ? `/profiles/${userIdentifier}`
                : `/profiles/${userIdentifier}/likes`;
            push(url);
          }, redirectionDelay);
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
        ]}
      />
    </>
  );
};

export default ProfileSwitch;
