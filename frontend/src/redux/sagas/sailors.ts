import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/sailors";
import * as actions from "../actions/sailors";
import * as API from "../apis/sailors";

function* createSailor({ payload }: any) {
  try {
    const {
      data: { data },
    } = yield call(API.createSailor, payload);
    yield put(actions.doCreateSailorSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(actions.doCreateSailorFailure());
  }
}
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
function* updateSailor({ payload }: any) {
  try {
    yield call(API.updateSailor, payload);
    yield put(actions.doUpdateSailorSuccess(payload));
  } catch (error) {
    console.error(error);
    yield put(actions.doUpdateSailorFailure());
  }
}
function* deleteSailor({ payload }: any) {
  try {
    yield call(API.deleteSailor, payload);
    yield put(actions.doDeleteSailorSuccess(payload));
  } catch (error) {
    console.error(error);
    yield put(actions.doDeleteSailorFailure());
  }
}

const sailorsSaga = [
  takeLatest(types.CREATE_SAILOR_REQUESTED, createSailor),
  takeLatest(types.FETCH_SAILORS_REQUESTED, fetchSailors),
  takeLatest(types.UPDATE_SAILOR_REQUESTED, updateSailor),
  takeLatest(types.DELETE_SAILOR_REQUESTED, deleteSailor),
];

export default sailorsSaga;
