'use client';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import LayoutMumbleContext from '@/stores/LayoutMumble.context';
import { GlobalHeader } from '@/components/global-header/GlobalHeader';

interface IProps {
  children: ReactNode;
}

export enum ELayoutKind {
  DEFAULT = 'default',
  SCROLLABLE = 'scrollable',
}

export const LayoutMumbleProvider = ({ children }: IProps) => {
  const [layoutKind, setLayoutKind] = useState<ELayoutKind>(
    ELayoutKind.DEFAULT,
  );
  const [currentTabProfile, setCurrentTabProfile] = useState(0);

  const contentCss = useMemo(() => {
    if (layoutKind === ELayoutKind.SCROLLABLE) {
      return 'content bg-slate-100 flex flex-col overflow-hidden grow';
    } else {
      return 'content flex flex-col bg-slate-100 overflow-y-scroll grow';
    }
  }, [layoutKind]);

  return (
    <LayoutMumbleContext.Provider
      value={{ setLayoutKind, setCurrentTabProfile, currentTabProfile }}
    >
      <div className="main-wrapper w-full flex flex-col h-screen min-h-screen overflow-y-hidden">
        <div className="header bg-violet-600 py-3">
          <div className="global-width mx-auto px-8 md:px-0">
            <GlobalHeader />
          </div>
        </div>
        <div className={contentCss}>{children}</div>
      </div>
    </LayoutMumbleContext.Provider>
  );
};
