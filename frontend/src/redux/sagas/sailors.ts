import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/sailors";
import * as actions from "../actions/sailors";
import * as API from "../apis/sailors";

function* fetchSailors() {
  try {
    const {
      data: { data },
    } = yield call(API.fetchSailors);
    yield put(actions.doFetchSailorsSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(actions.doFetchSailorsFailure());
  }
}

const sailorsSaga = [takeLatest(types.FETCH_SAILORS_REQUESTED, fetchSailors)];

export default sailorsSaga;
