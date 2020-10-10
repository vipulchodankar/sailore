import * as actions from "../actions/ui";
import { handleActions } from "redux-actions";

const initialState = {
  notification: {
    isOpen: false,
    type: "success",
    message: "",
  },
};

const uiReducer = handleActions<any, any>(
  {
    [actions.doShowNotification.toString()]: (
      state,
      { payload: { type = "success", message } }
    ) => ({
      ...state,
      notification: { isOpen: true, type, message },
    }),
    [actions.doHideNotification.toString()]: (state, { payload }) => ({
      ...state,
      notification: { ...initialState.notification },
    }),
  },
  initialState
);

export default uiReducer;
