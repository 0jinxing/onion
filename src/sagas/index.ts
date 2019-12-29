import { all, call } from "redux-saga/effects";
import ruleSagas from "./rule";

export default function*() {
  yield all([ruleSagas].map(call));
}
