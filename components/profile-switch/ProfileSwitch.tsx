'use client';
import React, { useState } from 'react';
import { Tabs } from '@ost-cas-fee-adv-23-24/elbmum-design';
import { useRouter } from 'next/navigation';

interface IProps {
  selectedTab: number;
  userIdentifier: string;
}

const ProfileSwitch = ({ selectedTab, userIdentifier }: IProps) => {
  const [tabInternal, setTabInternal] = useState(selectedTab);
  const { push } = useRouter();

  return (
    <>
      <Tabs
        updateSelection={(item) => {
          setTabInternal(item);
          setTimeout(() => {
            const url =
              item === 0
                ? `/profiles/${userIdentifier}`
                : `/profiles/${userIdentifier}/likes`;
            push(url);
          }, 300);
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
