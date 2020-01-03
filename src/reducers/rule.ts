import { handleActions, Action } from "redux-actions";
import { allow, disallow } from "@/actions/rule";

export type Rule = {
  pattern: string;
  timestamp: number;
};

export type RuleState = {
  val: Rule[];
};

export type RulePayload = {
  hostname: string;
  delInd: number;
};

export default handleActions(
  {
    [allow.toString()]: (state: RuleState, action: Action<RulePayload>) => {
      const rule = state.val;
      const { hostname, delInd } = action.payload;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length),
            { pattern: hostname, timestamp: Date.now() }
          ]
        };
      }
      return {
        val: [...rule, { pattern: hostname, timestamp: Date.now() }]
      };
    },

    [disallow.toString()]: (state: RuleState, action: Action<RulePayload>) => {
      const rule = state.val;
      const { hostname, delInd } = action.payload;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length),
            { pattern: "@@" + hostname, timestamp: Date.now() }
          ]
        };
      }
      return {
        val: [...rule, { pattern: "@@" + hostname, timestamp: Date.now() }]
      };
    }
  },
  { val: [] }
);
