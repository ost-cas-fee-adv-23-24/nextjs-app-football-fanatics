import { createContext, ReactElement } from 'react';

export enum EModalActions {
  SET_CONTENT = 'setContent',
  CLEAR_CONTENT = 'clearContent',
}

const initialValues = {
  closeModal: () => {},
  dispatchModal: (options: { type: EModalActions; payload: any }) => {},
  content: null as ReactElement | null,
  title: '',
  isOpen: false,
};

const ModalContext = createContext(initialValues);
ModalContext.displayName = 'ModalContext';
export default ModalContext;
