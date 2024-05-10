export enum ELayoutKind {
  DEFAULT = 'default',
  SCROLLABLE = 'scrollable',
}
export enum ELayoutActions {
  SET_LAYOUT_KIND = 'setLayoutKind',
  SET_OVERLAY_CONTENT = 'setModalContent',
  OPEN_OVERLAY = 'openOverlay',
  CLOSE_OVERLAY = 'closeOverlay',
  CLEAR_OVERLAY_CONTENT = 'clearOverlayContent',
  SET_CURRENT_TAB_PROFILE = 'setCurrentTabProfile',
}

export enum EOverlayState {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum EOverlayKind {
  REGULAR = 'regular',
  FULL_WIDTH = 'fullWidth',
}
