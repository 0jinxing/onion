import { takeEvery, put, select } from "redux-saga/effects";
import { toggle, allow, disallow } from "@/actions/rule";
import { getCurrentFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";

import { Rule } from "@/reducers/rule";
import { State } from "@/store";

export function* toggleSaga(action: {
  type: string;
  payload: { url: string };
}) {
  const url = action.payload.url;
  const rule: Rule[] = yield select((state: State) => state.rule.val);
  const { host } = new URL(url);
  const filter = getCurrentFilter(
    url,
    rule.map(r => r.pattern)
  );
  const ind = filter ? rule.findIndex(r => r.pattern === filter.text) : -1;
  if (filter instanceof BlockingFilter) {
    yield put(disallow(host, ind));
  } else {
    yield put(allow(host, filter ? ind : undefined));
  }
  chrome.tabs.reload();
}

export default function* watchToggle() {
  yield takeEvery(toggle.toString(), toggleSaga);
}
