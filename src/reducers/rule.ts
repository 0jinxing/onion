import { handleActions, Action } from "redux-actions";
import {
  allow,
  disallow,
  dele,
  Rule,
  AllowPayload,
  DelePayload
} from "@/actions/rule";

import { composeReducers } from "@/reducers";

const allowReducerMap = {
  [allow.toString()]: (state: Rule[], action: Action<AllowPayload>) => {
    const { hostname, delInd } = action.payload;
    if (typeof delInd === "number" && delInd >= 0) {
      return [
        { pattern: hostname, timestamp: Date.now() },
        ...state.slice(0, delInd),
        ...state.slice(delInd + 1, state.length)
      ];
    }
    return [{ pattern: hostname, timestamp: Date.now() }, ...state];
  },

  [disallow.toString()]: (state: Rule[], action: Action<AllowPayload>) => {
    const { hostname, delInd } = action.payload;
    if (typeof delInd === "number" && delInd >= 0) {
      return [
        { pattern: "@@" + hostname, timestamp: Date.now() },
        ...state.slice(0, delInd),
        ...state.slice(delInd + 1, state.length)
      ];
    }
    return [{ pattern: "@@" + hostname, timestamp: Date.now() }, ...state];
  }
};

const allowReducer = handleActions(allowReducerMap, []);

const deleReducerMap = {
  [dele.toString()]: (state: Rule[], action: Action<DelePayload>) => {
    const patterns = action.payload.patterns;
    return state.filter(v => patterns.findIndex(p => p === v.pattern) < 0);
  }
};

const deleReducer = handleActions(deleReducerMap, []);

export default allowReducer;
// export default composeReducers([], allowReducer, deleReducer);
