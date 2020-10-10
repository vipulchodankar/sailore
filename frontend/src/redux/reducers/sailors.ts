import * as actions from "../actions/sailors";
import { handleActions } from "redux-actions";
import State from "../../interfaces/sailors/state";
import Sailor from "../../interfaces/Sailor";

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
    [actions.doCreateSailorSuccess.toString()]: (state, { payload }) => ({
      ...state,
      list: [...state.list, ...payload],
    }),
    [actions.doUpdateSailorSuccess.toString()]: (state, { payload }) => ({
      ...state,
      list: state.list.map((sailor: Sailor) =>
        sailor.SID === payload.SID ? payload : sailor
      ),
    }),
    [actions.doDeleteSailorSuccess.toString()]: (state, { payload }) => ({
      ...state,
      list: state.list.filter((sailor: Sailor) => sailor.SID !== payload),
    }),
    [actions.doSetSelectedSailor.toString()]: (state, { payload }) => ({
      ...state,
      selected: payload,
    }),
  },
  initialState
);

export default sailorsReducer;
