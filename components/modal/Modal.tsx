import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ButtonIconRounded,
  EIConTypes,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useModal from '@/hooks/useModal';
import useBreakpoints from '@/hooks/useBreakpoints';

const escapeKeyCode = 27;
const Modal = () => {
  const { content, isOpen, closeModal, title, fullWidth } = useModal();
  const positionCommon = 'top-0 right-0 bottom-0 left-0';
  const transitionOptions = 'opacity duration-300 ease delay-300';
  const width = `${fullWidth ? 'max-width-[100%]' : 'max-w-[680px]'}`;

  const { isBpMDDown } = useBreakpoints();

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
    let styles = `fixed bg-violet-500 ${positionCommon}`;
    if (isOpen) {
      styles = `${styles} block`;
    } else {
      styles = `${styles} hidden`;
    }
    if (isBpMDDown) {
      styles = `${styles} bg-opacity-100`;
    } else {
      styles = `${styles} bg-opacity-50`;
    }
    return styles;
  }, [positionCommon, isOpen, isBpMDDown]);

  const wrapperStyles = useMemo(() => {
    let styles = 'my-auto flex items-center z-40';
    if (isBpMDDown) {
      styles = `${styles} w-full h-screen`;
    } else {
      styles = `${styles} w-[calc(100%-48px)] h-[calc(100%-48px)] px-[50px] py-[50px]`;
    }
    return styles;
  }, [isBpMDDown]);

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
            className={`modal-title  flex pt-6 pb-6 justify-between items-center self-stretch relative overflow-hidden ${isBpMDDown ? 'p-4' : 'bg-violet-600 px-8'}`}
          >
            <h2
              className={`text-white text-3xl not-italic font-semibold leading-10 truncate ${isBpMDDown ? ' text-2xl' : ' text-3xl'}`}
            >
              {title}
            </h2>
          </div>
          <div
            className={`modal-content-wrapper ${isBpMDDown ? 'px-4' : 'p-8 bg-white'}   grow flex flex-col overflow-hidden`}
          >
            <div className="modal-content-wrapper grow overflow-auto">
              {content ? content : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
