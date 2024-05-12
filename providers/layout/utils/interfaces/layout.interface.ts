import { Dispatch, ReactElement } from 'react';
import {
  ELayoutActions,
  ELayoutKind,
  EOverlayKind,
  EOverlayState,
} from '@/providers/layout/utils/enums/layout.enum';

export interface ILayoutProviderState {
  layoutKind: ELayoutKind;
  overlayState: EOverlayState;
  overlayTitle: string;
  overlayContent: ReactElement | null;
  overlayKind: EOverlayKind;
  currentTabProfile: number;
}

export interface ILayoutContextOptions {
  dispatchLayout: Dispatch<{ type: ELayoutActions; payload: any }>;
  currentTabProfile: number;
  closeModal: () => void;
}
