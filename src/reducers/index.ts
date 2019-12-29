import { combineReducers } from "redux";
import ruleReducer from "./rule";
import proxyReducer from "./proxy";
import modifyReducer from "./modify";

export default combineReducers({
  rule: ruleReducer,
  proxy: proxyReducer,
  modify: modifyReducer
});
