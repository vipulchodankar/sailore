import * as actions from "../actions/sailors";
import { handleActions } from "redux-actions";
import State from "../../interfaces/sailors/state";

const initialState: State = {
  isLoading: false,
  list: [],
  selected: null,
};

const sailorsReducer = handleActions<any, any>(
  {
    [actions.doFetchSailors.toString()]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [actions.doFetchSailorsSuccess.toString()]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      list: payload,
    }),
    [actions.doFetchSailorsFailure.toString()]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState
);

export default sailorsReducer;
