import { handleActions, Action } from "redux-actions";
import { allow, disallow, del, toggle, Rule } from "@/actions/rule";
import { flowReducers } from "@/utils";

type AllowAction = Action<{ hostname: string; delInd: number }>;

const allowReducerMap = {
  [String(allow)]: (state: Rule[], action: AllowAction) => {
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

  [String(disallow)]: (state: Rule[], action: AllowAction) => {
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

const delReducerMap = {
  [String(del)]: (state: Rule[], action: Action<string[]>) => {
    const patterns = action.payload;
    return state.filter(v => patterns.findIndex(p => p === v.pattern) < 0);
  }
};

const delReducer = handleActions(delReducerMap, []);

export default flowReducers([], allowReducer, delReducer);
