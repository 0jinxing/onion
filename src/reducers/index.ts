import { combineReducers } from "redux";
import rulesReducer from "./rules";
import proxyReducer from "./proxy";

export default combineReducers({ rules: rulesReducer, proxy: proxyReducer });
