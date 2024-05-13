import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ButtonIconRounded,
  EIConTypes,
  Icon,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useLayout from '@/hooks/useLayout';
import { EOverlayState } from '@/providers/layout/utils/enums/layout.enum';

const escapeKeyCode = 27;

interface IProps {
  title: string;
  content: React.ReactNode;
  state: EOverlayState;
  fullWidth?: boolean;
}

const Modal = ({ title, fullWidth = false, state, content }: IProps) => {
  const positionCommon = 'top-0 right-0 bottom-0 left-0 absolute';
  const transitionOptions = 'opacity duration-500 ease';
  const width = `${fullWidth ? 'max-width-[100%]' : 'max-w-[680px]'}`;
  const { closeModal } = useLayout();
  const isOpen = state === EOverlayState.OPEN;

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
    } else if (!isOpen && !content) {
      document.body.style.overflow = `auto`;
    }
  }, [isOpen, content]);

  const topContainer = useMemo(() => {
    return `flex flex-col items-center justify-center rounded ${positionCommon} ${transitionOptions}`;
  }, [positionCommon]);

  const backdropStyles = useMemo(() => {
    return `bg-violet-500 bg-opacity-100 md:bg-opacity-50 ${positionCommon} ${transitionOptions}`;
  }, [positionCommon]);

  const wrapperStyles =
    'my-auto flex items-center z-40 w-full h-screen md:w-[calc(100%-48px)] md:h-[calc(100%-48px)] md:px-[50px] md:py-[50px]';

  return (
    <div
      className={`h-screen flex-col items-center justify-center ${positionCommon}`}
    >
      <div
        className={topContainer}
        onDrop={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
        onDragOver={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
        onDragLeave={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
      >
        <div className={`modal-backdrop ${backdropStyles}`} />
        <div className={`modal-wrapper ${wrapperStyles}`}>
          <div
            className={`modal-content margin-10 pb-10 relative overflow-x-hidden overflow-y-scroll grow flex flex-col max-h-full mx-auto rounded-2xl ${width}`}
          >
            <div
              className="modal-close absolute right-4 md:right-4 top-4"
              style={{ zIndex: 50 }}
            >
              <a
                href="#"
                className="rounded-full h-12 w-12 flex items-center justify-center text-white bg-violet-700  hover:bg-violet-800"
                aria-label="close modal"
                onClick={(evt) => {
                  evt.preventDefault();
                  closeModal();
                }}
              >
                <div className="w-5 h-5">
                  <Icon type={EIConTypes.CANCEL} fitParent={true} />
                </div>
              </a>
            </div>
            <div
              className={`modal-title flex justify-between items-center self-stretch relative overflow-hidden bg-transparent md:bg-violet-600 py-6 px-4 md:px-8`}
            >
              <h2
                className={`text-white not-italic font-semibold leading-10 truncate text-2xl md:text-3xl pr-14 md:pr-10`}
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
    </div>
  );
};

export default Modal;
