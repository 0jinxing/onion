import { takeLatest } from "redux-saga/effects";
import { updateGFWListSaga } from "./proxy";
import { ProxyTypeEnum } from "@/actions/proxy";

const { FETCH_GFW_LIST } = ProxyTypeEnum;

function* rootSaga() {
  yield takeLatest(FETCH_GFW_LIST, updateGFWListSaga);
}

export default rootSaga;
