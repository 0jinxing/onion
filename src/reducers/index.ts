import { combineReducers } from "redux";

import change from "./change";
import proxy from "./proxy";
import rule from "./rule";
import loading from "./loading";
import error from "./error";

const rootReducer = combineReducers({
  change,
  proxy,
  rule,
  loading,
  error,
});

export default rootReducer;
