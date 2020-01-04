import { handleActions, Action } from "redux-actions";
import {
  allow,
  disallow,
  RuleState,
  AllowPayload,
} from "@/actions/rule";

export default handleActions(
  {
    [allow.toString()]: (state: RuleState, action: Action<AllowPayload>) => {
      const rule = state.val;
      const { hostname, delInd } = action.payload;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            { pattern: hostname, timestamp: Date.now() },
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length)
          ]
        };
      }
      return {
        val: [{ pattern: hostname, timestamp: Date.now() }, ...rule]
      };
    },

    [disallow.toString()]: (state: RuleState, action: Action<AllowPayload>) => {
      const rule = state.val;
      const { hostname, delInd } = action.payload;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            { pattern: "@@" + hostname, timestamp: Date.now() },
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length)
          ]
        };
      }
      return {
        val: [{ pattern: "@@" + hostname, timestamp: Date.now() }, ...rule]
      };
    }
  },
  { val: [] }
);
