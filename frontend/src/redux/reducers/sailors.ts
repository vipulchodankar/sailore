import * as actions from "../actions/sailors";
import { handleActions } from "redux-actions";
import State from "../../interfaces/sailors/state";
import Sailor from "../../interfaces/Sailor";

const initialState: State = {
  isLoading: false,
  list: [],
  selected: null,
  isDialogOpen: false,
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
    // Dialog
    [actions.doOpenSailorDialog.toString()]: (state) => ({
      ...state,
      isDialogOpen: true,
    }),
    [actions.doCloseSailorDialog.toString()]: (state) => ({
      ...state,
      isDialogOpen: false,
    }),
    // Sort
    [actions.doSortSailors.toString()]: (state, { payload }) => {
      const sailors = [...state.list];
      let temp = [];
      switch (payload) {
        case "name_asc":
          temp = sailors.sort((a: Sailor, b: Sailor) =>
            a.SNAME.localeCompare(b.SNAME)
          );
          break;

        case "name_desc":
          temp = sailors.sort((a: Sailor, b: Sailor) =>
            b.SNAME.localeCompare(a.SNAME)
          );
          break;

        case "rating_asc":
          temp = sailors.sort((a: Sailor, b: Sailor) => a.RATING - b.RATING);
          break;

        case "rating_desc":
          temp = sailors.sort((a: Sailor, b: Sailor) => b.RATING - a.RATING);
          break;

        case "age_asc":
          temp = sailors.sort((a: Sailor, b: Sailor) => a.AGE - b.AGE);
          break;

        case "age_desc":
          temp = sailors.sort((a: Sailor, b: Sailor) => b.AGE - a.AGE);
          break;

        default:
          return state;
      }

      return { ...state, list: temp };
    },
  },
  initialState
);

export default sailorsReducer;
