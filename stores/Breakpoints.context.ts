import { createContext } from 'react';
import {
  EBreakpointsEnum,
  EBreakpointValuesEnum,
} from '@/utils/enums/Breakpoints.enum';

export interface IBreakpoint {
  name: EBreakpointsEnum;
  value: EBreakpointValuesEnum;
  abbreviation: string;
}

export interface IBreakpointsContext {
  currentBreakpoint: IBreakpoint;
  isBpXLDown: boolean;
  isBpLGDown: boolean;
  isBpMDDown: boolean;
}

export const BreakpointsContext = createContext<IBreakpointsContext | null>(
  null,
);
