import { all, call } from "redux-saga/effects";
import rulesSagas from "./rules";

export default function*() {
  yield all([rulesSagas].map(call));
}
