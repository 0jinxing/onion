import { handleActions } from "redux-actions";
import { allow, disallow } from "../actions/rules";

export default handleActions(
  {
    [allow.toString()]: (
      state: { val: Array<string> },
      {
        payload: { host, delInd }
      }: { payload: { host: string; delInd: number } }
    ) => {
      const rules = state.val;
      if (typeof delInd === "number") {
        return {
          val: [
            ...rules.slice(0, delInd),
            ...rules.slice(delInd + 1, rules.length),
            host
          ]
        };
      }
      return {
        val: [...rules, host]
      };
    },

    [disallow.toString()]: (
      state: { val: Array<string> },
      {
        payload: { host, delInd }
      }: { payload: { host: string; delInd: number } }
    ) => {
      const rules = state.val;
      if (typeof delInd === "number") {
        return {
          val: [
            ...rules.slice(0, delInd),
            ...rules.slice(delInd + 1, rules.length),
            "@@" + host
          ]
        };
      }
      return { val: [...rules, "@@" + host] };
    }
  },
  { val: [] }
);
