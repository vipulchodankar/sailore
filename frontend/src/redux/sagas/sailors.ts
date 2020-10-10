import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types/sailors";
import * as actions from "../actions/sailors";
import * as API from "../apis/sailors";
import { doShowNotification } from "../actions/ui";

function* createSailor({ payload }: any) {
  try {
    const {
      data: { data },
    } = yield call(API.createSailor, payload);
    yield put(actions.doCreateSailorSuccess(data));
    yield put(actions.doCloseSailorDialog());
    yield put(doShowNotification({ message: "Successfully created sailor" }));
  } catch (error) {
    console.error(error);
    yield put(actions.doCreateSailorFailure());
    yield put(
      doShowNotification({ message: "Couldn't create sailor", type: "warning" })
    );
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
    yield put(
      doShowNotification({ message: "Couldn't fetch sailors", type: "warning" })
    );
  }
}
function* updateSailor({ payload }: any) {
  try {
    yield call(API.updateSailor, payload);
    yield put(actions.doUpdateSailorSuccess(payload));
    yield put(actions.doCloseSailorDialog());
    yield put(doShowNotification({ message: "Successfully updated sailor" }));
  } catch (error) {
    console.error(error);
    yield put(actions.doUpdateSailorFailure());
    yield put(
      doShowNotification({ message: "Couldn't update sailor", type: "warning" })
    );
  }
}
function* deleteSailor({ payload }: any) {
  try {
    yield call(API.deleteSailor, payload);
    yield put(actions.doDeleteSailorSuccess(payload));
    yield put(doShowNotification({ message: "Successfully deleted sailor" }));
  } catch (error) {
    console.error(error);
    yield put(actions.doDeleteSailorFailure());
    yield put(
      doShowNotification({ message: "Couldn't delete sailor", type: "warning" })
    );
  }
}

const sailorsSaga = [
  takeLatest(types.CREATE_SAILOR_REQUESTED, createSailor),
  takeLatest(types.FETCH_SAILORS_REQUESTED, fetchSailors),
  takeLatest(types.UPDATE_SAILOR_REQUESTED, updateSailor),
  takeLatest(types.DELETE_SAILOR_REQUESTED, deleteSailor),
];

export default sailorsSaga;
