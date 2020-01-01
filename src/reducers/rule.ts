import { handleActions } from "redux-actions";
import { allow, disallow } from "@/actions/rule";

export type Rule = {
  pattern: string;
  modifyAt: number;
};

export type RuleReduceState = {
  val: Rule[];
};

export type RuleReducePayload = {
  host: string;
  delInd: number;
};

export default handleActions(
  {
    [allow.toString()]: (
      state: RuleReduceState,
      action: { payload: RuleReducePayload }
    ) => {
      const rule = state.val;
      const { host, delInd } = action.payload;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length),
            { pattern: host, modifyAt: Date.now() }
          ]
        };
      }
      return {
        val: [...rule, { pattern: host, modifyAt: Date.now() }]
      };
    },

    [disallow.toString()]: (
      state: RuleReduceState,
      { payload: { host, delInd } }: { payload: RuleReducePayload }
    ) => {
      const rule = state.val;
      if (typeof delInd === "number" && delInd >= 0) {
        return {
          val: [
            ...rule.slice(0, delInd),
            ...rule.slice(delInd + 1, rule.length),
            { pattern: "@@" + host, modifyAt: Date.now() }
          ]
        };
      }
      return {
        val: [...rule, { pattern: "@@" + host, modifyAt: Date.now() }]
      };
    }
  },
  { val: [] }
);
