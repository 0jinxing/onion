import { takeEvery, put, select } from "redux-saga/effects";
import { toggle, allow, disallow } from "../actions/rules";
import { getCurrentFilter } from "../utils";
import { BlockingFilter } from "../lib/adblockplus";

export function* toggleSaga(action: {
  type: string;
  payload: { url: string };
}) {
  const url = action.payload.url;
  const rules: string[] = yield select(
    (store: { rules: { val: string[] } }) => store.rules.val
  );
  const { host } = new URL(url);
  const filter = getCurrentFilter(url, rules);
  if (filter instanceof BlockingFilter) {
    yield put(disallow(host, rules.indexOf(filter.text)));
  } else {
    yield put(allow(host, filter ? rules.indexOf(filter.text) : undefined));
  }
}

export default function* watchToggle() {
  yield takeEvery(toggle.toString(), toggleSaga);
}
