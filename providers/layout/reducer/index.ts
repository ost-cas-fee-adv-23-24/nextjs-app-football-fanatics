import { ILayoutProviderState } from '@/providers/layout/utils/interfaces/layout.interface';
import _cloneDeep from 'lodash/cloneDeep';
import {
  ELayoutActions,
  EOverlayKind,
  EOverlayState,
} from '@/providers/layout/utils/enums/layout.enum';

export const reducer = (
  state: ILayoutProviderState,
  action: { type: ELayoutActions; payload: any },
) => {
  const stateCopy = _cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case ELayoutActions.SET_CURRENT_TAB_PROFILE:
      stateCopy.currentTabProfile = payload;
      return stateCopy;
    case ELayoutActions.SET_LAYOUT_KIND:
      stateCopy.layoutKind = payload;
      return stateCopy;
    case ELayoutActions.CLEAR_OVERLAY_CONTENT:
      stateCopy.overlayKind = EOverlayKind.REGULAR;
      stateCopy.overlayTitle = '';
      stateCopy.overlayContent = null;
      stateCopy.overlayState = EOverlayState.CLOSED;
      return stateCopy;
    case ELayoutActions.SET_OVERLAY_CONTENT:
      stateCopy.overlayKind = payload.overlayKind;
      stateCopy.overlayTitle = payload.overlayTitle;
      stateCopy.overlayContent = payload.overlayContent;
      stateCopy.overlayState = EOverlayState.OPEN;
      return stateCopy;
    case ELayoutActions.OPEN_OVERLAY:
      stateCopy.overlayState = EOverlayState.OPEN;
      return stateCopy;
    case ELayoutActions.CLOSE_OVERLAY:
      stateCopy.overlayState = EOverlayState.CLOSED;
      return stateCopy;
    default:
      return stateCopy;
  }
};
