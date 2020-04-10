import { call, put, select } from "redux-saga/effects";
import { ProxyAction, updateGFWList } from "@/actions/proxy";
import fetchGFWList from "@/utils/fetch-gfwlist";
import { State } from "@/store/query-store";
import asyncSaga from "./utils/async-saga";

function* _updateGFWListSaga(_: ProxyAction) {
  const gfwUrl = yield select((state: State) => state.proxy.gfwUrl);
  if (gfwUrl) {
    const _gfwList: string[] = yield call(fetchGFWList, gfwUrl);
    yield put(updateGFWList(_gfwList));
  } else {
    yield put(updateGFWList([]));
  }
}

export const updateGFWListSaga = asyncSaga(_updateGFWListSaga);
