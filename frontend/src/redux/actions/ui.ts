import { createAction } from "redux-actions";
import * as types from "../types/ui";

export const doShowNotification = createAction(types.SHOW_NOTIFICATION);
export const doHideNotification = createAction(types.HIDE_NOTIFICATION);
