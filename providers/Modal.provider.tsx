'use client';
import { ReactElement, ReactNode, useEffect, useReducer } from 'react';
import ModalContext, { EModalActions } from '@/stores/Modal.context';
import Modal from '@/components/modal/Modal';
import { cloneDeep } from 'lodash';

interface IProps {
  children: ReactNode;
}

interface IModalState {
  content: ReactElement | null;
  isOpen: boolean;
  title: string;
}

const reducer = (
  state: IModalState,
  action: { type: EModalActions; payload: any },
) => {
  const stateCopy = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case EModalActions.CLEAR_CONTENT:
      stateCopy.content = null;
      stateCopy.title = '';
      state.isOpen = false;
      return stateCopy;
    case EModalActions.SET_CONTENT:
      state.isOpen = true;
      stateCopy.title = payload.title;
      stateCopy.content = payload.content;
      return stateCopy;
    default:
      return stateCopy;
  }
};
export const ModalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    content: null,
    title: '',
    isOpen: false,
  });
  const content = state.content;

  const closeModal = () => {
    dispatch({ type: EModalActions.CLEAR_CONTENT, payload: null });
  };

  return (
    <ModalContext.Provider
      value={{
        closeModal,
        dispatchModal: dispatch,
        content: state.content,
        title: state.title,
        isOpen: state.isOpen,
      }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};
