'use client';
import { useEffect } from 'react';
import useLayoutMumble from '@/hooks/useLayoutMumble';

interface IProps {
  selectedTab: number;
}

// only purpose is to set the current tab profile
// no markup produced

const TabDispatcher = ({ selectedTab }: IProps) => {
  const { setCurrentTabProfile } = useLayoutMumble();
  console.log(selectedTab);
  useEffect(() => {
    setCurrentTabProfile(selectedTab);
  }, [selectedTab]);
  return null;
};

export default TabDispatcher;
