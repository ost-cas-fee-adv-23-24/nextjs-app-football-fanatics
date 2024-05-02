import React, { useCallback, useEffect, useMemo } from 'react';
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
  const width = `${fullWidth ? 'max-width-[100%]' : 'max-w-[680px]'}`;

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

      // @ts-ignore
      document.activeElement?.focus();
    } else {
      document.body.style.overflow = `auto`;
    }
  }, [isOpen]);

  const topContainer = useMemo(() => {
    let styles = `flex flex-col items-center justify-center fixed  rounded  ${positionCommon} ${transitionOptions}`;
    if (isOpen) {
      styles = `${styles} opacity-100`;
    } else {
      styles = `${styles} opacity-0 pointer-events-none`;
    }
    return styles;
  }, [positionCommon, isOpen]);

  const backdropStyles = useMemo(() => {
    let styles = `fixed bg-violet-500 bg-opacity-100 md:bg-opacity-50 ${positionCommon}`;
    if (isOpen) {
      styles = `${styles} block`;
    } else {
      styles = `${styles} hidden`;
    }
    return styles;
  }, [positionCommon, isOpen]);

  const wrapperStyles =
    'my-auto flex items-center z-40 w-full h-screen md:w-[calc(100%-48px)] md:h-[calc(100%-48px)] md:px-[50px] md:py-[50px]';

  return (
    <div className={`modal ${topContainer}`}>
      <div className={`modal-backdrop ${backdropStyles}`} />
      <div className={`modal-wrapper ${wrapperStyles}`}>
        <div className="modal-close absolute right-5 top-5 z-100">
          <ButtonIconRounded
            icon={EIConTypes.CANCEL}
            label="Close"
            name="close-modal"
            onCustomClick={() => {
              closeModal();
            }}
          />
        </div>
        <div
          className={`modal-content relative overflow-hidden grow flex flex-col max-h-full mx-auto rounded-2xl ${width}`}
        >
          <div
            className={`modal-title  flex justify-between items-center self-stretch relative overflow-hidden bg-transparent md:bg-violet-600 py-6 px-4 md:px-8`}
          >
            <h2
              className={`text-white not-italic font-semibold leading-10 truncate text-2xl md:text-3xl`}
            >
              {title}
            </h2>
          </div>
          <div
            className={`modal-content-wrapper px-4 py-0 md:p-8 bg-transparent md:bg-white grow flex flex-col overflow-hidden`}
          >
            <div className="modal-inner grow overflow-auto">
              {content ? content : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
