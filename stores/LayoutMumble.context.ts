import { createContext } from 'react';
import { ELayoutKind } from '@/providers/LayoutMumble.provider';

export interface ILayoutContextOptions {
  setLayoutKind: React.Dispatch<React.SetStateAction<ELayoutKind>>;
}

const LayoutMumbleContext = createContext<null | ILayoutContextOptions>(null);
LayoutMumbleContext.displayName = 'LayoutContext';

export default LayoutMumbleContext;
