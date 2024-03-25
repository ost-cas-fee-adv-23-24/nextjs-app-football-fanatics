import { useContext } from 'react';
import ModalContext from '@/stores/Modal.context';

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModal must be used within a ModalProvider (see main layout)',
    );
  }

  return context;
};

export default useModal;
