'use client';
import React, { ReactNode, useCallback, useMemo, useReducer } from 'react';
import { GlobalHeader } from '@/components/global-header/GlobalHeader';
import Modal from '@/components/modal/Modal';
import {
  ELayoutActions,
  ELayoutKind,
  EOverlayKind,
  EOverlayState,
} from '@/providers/layout/utils/enums/layout.enum';
import LayoutContext from '@/stores/Layout.context';
import { reducer } from '@/providers/layout/reducer';

interface IProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    layoutKind: ELayoutKind.DEFAULT,
    overlayState: EOverlayState.CLOSED,
    overlayTitle: '',
    overlayContent: null,
    overlayKind: EOverlayKind.REGULAR,
    currentTabProfile: 0,
  });

  const { layoutKind, currentTabProfile, overlayState } = state;

  const contentCss = useMemo(() => {
    const baseStyles = 'content bg-slate-100 overflow-y-scroll';
    if (layoutKind === ELayoutKind.SCROLLABLE) {
      return `${baseStyles} h-screen block`;
    }
    return `${baseStyles}`;
  }, [layoutKind]);

  const headerStyles = useMemo(() => {
    return 'header fixed w-full py-3 bg-violet-600 top-0';
  }, []);

  const overlayStyles = useMemo(() => {
    const baseStyles = 'opacity fixed duration-500 ease';
    if (overlayState === EOverlayState.OPEN) {
      return `${baseStyles} overlay top-0 left-0 right-0 bottom-0 opacity-100`;
    }
    return `${baseStyles} opacity-0`;
  }, [overlayState]);

  const closeModal = useCallback(() => {
    dispatch({
      type: ELayoutActions.CLOSE_OVERLAY,
      payload: null,
    });

    setTimeout(() => {
      dispatch({
        type: ELayoutActions.CLEAR_OVERLAY_CONTENT,
        payload: null,
      });
    }, 500);
  }, []);

  return (
    <LayoutContext.Provider
      value={{ dispatchLayout: dispatch, currentTabProfile, closeModal }}
    >
      {/* z-indexes/paddings are not applying correctly while using tailwindcss.
      most probably because of the dynamical creation of the same*/}
      <div className={headerStyles} style={{ zIndex: 20 }}>
        <div className="global-width mx-auto px-8 md:px-0">
          <GlobalHeader />
        </div>
      </div>
      <div className={contentCss} style={{ paddingTop: 78 }}>
        {children}
      </div>
      <div
        className={overlayStyles}
        style={
          overlayState === EOverlayState.OPEN
            ? { zIndex: 100 }
            : { zIndex: -100 } // avoids jumping of the overlay
        }
      >
        <Modal
          title={state.overlayTitle}
          content={state.overlayContent}
          state={state.overlayState}
          fullWidth={state.overlayKind === EOverlayKind.FULL_WIDTH}
        />
      </div>
    </LayoutContext.Provider>
  );
};
