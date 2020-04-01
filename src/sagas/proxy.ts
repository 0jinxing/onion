import { call, put } from "redux-saga/effects";
import {
  ProxyAction,
  updateGFWList,
  startUpdateGFWList,
  finallyUpdateGFWList,
  throwUpdateGFWList
} from "@/actions/proxy";
import fetchGFW from "@/utils/fetchGFW";

export function* updateGFWListSaga(action: ProxyAction) {
  // 根据 gfwUrl 获取新的 gfwList
  const { gfwUrl } = action.payload;
  if (gfwUrl) {
    try {
      const _gfwList: string[] = yield call(fetchGFW, gfwUrl);
      yield put(startUpdateGFWList());
      yield put(updateGFWList(_gfwList));
    } catch (e) {
      yield put(throwUpdateGFWList(e));
    } finally {
      yield put(finallyUpdateGFWList());
    }
  }
}
