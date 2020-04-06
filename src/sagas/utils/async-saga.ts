import { Action } from "redux";
import { startLoading, endLoading } from "@/actions/loading";
import { put } from "redux-saga/effects";
import { throwError } from "@/actions/error";

export default function asyncSaga<Fn extends (...args: any[]) => any>(
  saga: Fn
) {
  return function* (action: Action) {
    try {
      yield put(startLoading(action.type));
      yield saga(action);
    } catch (e) {
      yield put(throwError(action.type, e));
    } finally {
      yield put(endLoading(action.type));
    }
  };
}
