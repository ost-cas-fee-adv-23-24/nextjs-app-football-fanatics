'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { BreakpointsContext, IBreakpoint } from '@/stores/Breakpoints.context';
import {
  EBreakpointsEnum,
  EBreakpointValuesEnum,
} from '@/utils/enums/Breakpoints.enum';

interface IProps {
  children: ReactNode;
}

const breakpoints: Array<IBreakpoint> = [
  {
    name: EBreakpointsEnum.XS,
    value: EBreakpointValuesEnum.EXTRA_SMALL,
    abbreviation: 'XS',
  },
  {
    name: EBreakpointsEnum.SM,
    value: EBreakpointValuesEnum.SMALL,
    abbreviation: 'SM',
  },
  {
    name: EBreakpointsEnum.MD,
    value: EBreakpointValuesEnum.MEDIUM,
    abbreviation: 'MD',
  },
  {
    name: EBreakpointsEnum.LG,
    value: EBreakpointValuesEnum.LARGE,
    abbreviation: 'LG',
  },
  {
    name: EBreakpointsEnum.XL,
    value: EBreakpointValuesEnum.EXTRA_LARGE,
    abbreviation: 'XL',
  },
  {
    name: EBreakpointsEnum.UL,
    value: EBreakpointValuesEnum.ULTRA_LARGE,
    abbreviation: 'UL',
  },
];

export const BreakpointsProvider = ({ children }: IProps) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<IBreakpoint>({
    name: EBreakpointsEnum.UL,
    value: EBreakpointValuesEnum.ULTRA_LARGE,
    abbreviation: 'UL',
  });
  const [, setCurrentWidth] = useState<number>(
    EBreakpointValuesEnum.ULTRA_LARGE,
  );

  const onResize = () => {
    const width = window.innerWidth;
    setCurrentWidth(width);
    breakpoints.forEach((breakpoint) => {
      const isSameBreakpoint = currentBreakpoint.name === breakpoint.name;
      if (width >= breakpoint.value && !isSameBreakpoint) {
        setCurrentBreakpoint(breakpoint);
      }
    });
  };

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    onResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // we could also expose the currentWith
  return (
    <BreakpointsContext.Provider
      value={{
        currentBreakpoint,
        isBpXLDown: currentBreakpoint.value <= EBreakpointValuesEnum.LARGE,
        isBpLGDown: currentBreakpoint.value <= EBreakpointValuesEnum.MEDIUM,
        isBpMDDown: currentBreakpoint.value <= EBreakpointValuesEnum.SMALL,
      }}
    >
      {children}
    </BreakpointsContext.Provider>
  );
};
