import { combineReducers } from "redux";
import rulesReducer from "./rules";
import proxyReducer from "./proxy";
import modifyReducer from "./modify";

export default combineReducers({
  rules: rulesReducer,
  proxy: proxyReducer,
  modify: modifyReducer
});
