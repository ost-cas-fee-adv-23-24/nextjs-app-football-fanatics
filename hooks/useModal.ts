import { useContext } from 'react';
import ModalContext from '@/stores/Modal.context';

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
