import { createContext } from 'react';
import { ELayoutKind } from '@/providers/LayoutMumble.provider';

export interface ILayoutContextOptions {
  setLayoutKind: React.Dispatch<React.SetStateAction<ELayoutKind>>;

  // these 2 properties would need to be part of a general helpers provider
  // for the moment here is fine
  setCurrentTabProfile: React.Dispatch<React.SetStateAction<number>>;
  currentTabProfile: number;
}

const LayoutMumbleContext = createContext<null | ILayoutContextOptions>(null);
LayoutMumbleContext.displayName = 'LayoutContext';

export default LayoutMumbleContext;
