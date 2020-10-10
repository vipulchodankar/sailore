import { all } from "redux-saga/effects";

import sailors from "./sailors";

function* rootSaga() {
  yield all([...sailors]);
}

export default rootSaga;
