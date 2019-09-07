import { takeEvery, put, select } from "redux-saga/effects";
import { toggle } from "../actions/rules";

export function* toggleSaga(actions: {
  type: string;
  payload: { url: string };
}) {
  const rules: string[] = yield select(
    (store: { rules: { val: string[] } }) => store.rules.val
  );
  
}

export function* watchToggle() {
  yield takeEvery(toggle.toString(), toggleSaga);
}
