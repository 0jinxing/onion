import { combineReducers } from "redux";
import ruleReducer from "./rule";
import proxyReducer from "./proxy";
import modifyReducer from "./modify";
import reportReducer from "./report";

export default combineReducers({
  rule: ruleReducer,
  proxy: proxyReducer,
  modify: modifyReducer,
  report: reportReducer
});
