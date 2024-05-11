'use client';
import { useEffect } from 'react';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import useLayout from '@/hooks/useLayout';

interface IProps {
  selectedTab: number;
}

// only purpose is to set the current tab profile
// no markup produced

const TabDispatcher = ({ selectedTab }: IProps) => {
  const { dispatchLayout } = useLayout();
  useEffect(() => {
    dispatchLayout({
      type: ELayoutActions.SET_CURRENT_TAB_PROFILE,
      payload: selectedTab,
    });
  }, [selectedTab, dispatchLayout]);
  return null;
};

export default TabDispatcher;
