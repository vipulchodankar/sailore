import { createAction } from "redux-actions";
import * as types from "../types/sailors";

export const doCreateSailor = createAction(types.CREATE_SAILOR_REQUESTED);
export const doCreateSailorSuccess = createAction(
  types.CREATE_SAILOR_SUCCEEDED
);
export const doCreateSailorFailure = createAction(types.CREATE_SAILOR_FAILED);

export const doFetchSailors = createAction(types.FETCH_SAILORS_REQUESTED);
export const doFetchSailorsSuccess = createAction(
  types.FETCH_SAILORS_SUCCEEDED
);
export const doFetchSailorsFailure = createAction(types.FETCH_SAILORS_FAILED);

export const doUpdateSailor = createAction(types.UPDATE_SAILOR_REQUESTED);
export const doUpdateSailorSuccess = createAction(
  types.UPDATE_SAILOR_SUCCEEDED
);
export const doUpdateSailorFailure = createAction(types.UPDATE_SAILOR_FAILED);

export const doDeleteSailor = createAction(types.DELETE_SAILOR_REQUESTED);
export const doDeleteSailorSuccess = createAction(
  types.DELETE_SAILOR_SUCCEEDED
);
export const doDeleteSailorFailure = createAction(types.DELETE_SAILOR_FAILED);

export const doSetSelectedSailor = createAction(types.SET_SELECTED_SAILOR);

export const doOpenSailorDialog = createAction(types.OPEN_SAILOR_DIALOG);
export const doCloseSailorDialog = createAction(types.CLOSE_SAILOR_DIALOG);

export const doSortSailors = createAction(types.SORT_SAILORS);
