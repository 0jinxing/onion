import { combineReducers } from "redux";

import change from "./change";
import proxy from "./proxy";
import report from "./report";
import rule from "./rule";
import loading from "./loading";
import error from "./error";

const rootReducer = combineReducers({
  change,
  report,
  proxy,
  rule,
  loading,
  error,
});

export default rootReducer;
