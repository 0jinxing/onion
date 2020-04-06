import { takeLatest, all, fork } from "redux-saga/effects";
import { updateGFWListSaga } from "./proxy";
import { ProxyTypeEnum } from "@/actions/proxy";

const { EMIT_FETCH_GFW_LIST } = ProxyTypeEnum;

function* watchFetchGFWList() {
  yield takeLatest(EMIT_FETCH_GFW_LIST, updateGFWListSaga);
}

function* rootSaga() {
  yield all([fork(watchFetchGFWList)]);
}

export default rootSaga;
