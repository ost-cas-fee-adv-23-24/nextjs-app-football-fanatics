import React, { useCallback, useEffect, useRef } from 'react';
import {
  ButtonIconRounded,
  EIConTypes,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useModal from '@/hooks/useModal';

const escapeKeyCode = 27;
const Modal = () => {
  const { content, isOpen, closeModal, title, fullWidth } = useModal();
  const positionCommon = 'top-0 right-0 bottom-0 left-0';
  const transitionOptions = 'opacity duration-300 ease delay-300';

  const escapeKeyUpHandler = useCallback(
    (evt: KeyboardEvent) => {
      evt.preventDefault();
      if (evt.keyCode === escapeKeyCode) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('keyup', escapeKeyUpHandler);
    } else {
      document.body.removeEventListener('keyup', escapeKeyUpHandler);
    }
  }, [isOpen, escapeKeyUpHandler]);

  useEffect(() => {
    if (isOpen) {
      const scrollTop = document.documentElement.scrollTop;
      document.body.style.top = `${scrollTop}px`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `auto`;
    }
  }, [isOpen]);

  const width = `${fullWidth ? 'max-width-[100%]' : 'max-w-[600px]'}`;

  return (
    <div
      className={`flex items-center justify-center fixed  rounded  ${positionCommon} ${transitionOptions} ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`modal-backdrop fixed ${positionCommon} bg-violet-500 bg-opacity-50`}
      />
      <div className="modal-wrapper w-[calc(100%-48px)] h-[calc(100%-48px)] px-[50px] py-[50px] z-40">
        <div
          className={`o-overlay-content overflow-hidden grow flex flex-col ${width} max-h-[100%] mx-auto`}
        >
          <div className="bg-violet-600 flex pt-6 pb-6 pl-8 pr-8 justify-between items-center self-stretch rounded-t-2xl z-60 relative">
            <h5 className="text-white text-3xl not-italic font-semibold leading-10">
              {title}
            </h5>
            <div className="modal-close">
              <ButtonIconRounded
                icon={EIConTypes.CANCEL}
                label="Close"
                name="close-modal"
                onCustomClick={() => {
                  closeModal();
                }}
              />
            </div>
          </div>
          <div className="modal-content-wrapper bg-white py-8 px-8 grow flex flex-col overflow-hidden">
            <div className="modal-content-wrapper grow pt-4 overflow-auto">
              {content ? content : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
