import { combineReducers } from "redux";
import { Action, Reducer } from "redux-actions";
import { flowRight } from "lodash";
import ruleReducer from "./rule";
import proxyReducer from "./proxy";
import modifyReducer from "./modify";
import reportReducer from "./report";

export const composeReducers = <T>(
  initState: T,
  ...reducers: Reducer<T, any>[]
) => {
  return (state: T = initState, action: Action<any>): T => {
    return flowRight(reducers)(state, action);
  };
};

export default combineReducers({
  rule: ruleReducer,
  proxy: proxyReducer,
  modify: modifyReducer,
  report: reportReducer
});
