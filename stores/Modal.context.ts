import { createContext, Dispatch, ReactElement } from 'react';

export enum EModalActions {
  SET_CONTENT = 'setContent',
  CLEAR_CONTENT = 'clearContent',
}

export interface IModalContextOptions {
  closeModal: () => void;
  dispatchModal: Dispatch<{ type: EModalActions; payload: any }>; // maybe use generics to set payload type
  content: ReactElement | null;
  title: string;
  isOpen: boolean;
  fullWidth: boolean;
}

const ModalContext = createContext<IModalContextOptions | null>(null);
ModalContext.displayName = 'ModalContext';
export default ModalContext;
