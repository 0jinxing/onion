import { Action } from "redux";

export enum RuleTypeEnum {
  ADD_RULE = "rule/add_rule",
  DELETE_RULE = "rule/delete_rule"
}


export interface RuleAction extends Action {
  payload: string;
}

export const addRule = (pattern: string) => {
  return { type: RuleTypeEnum.ADD_RULE, payload: pattern };
};

export const deleteRule = (pattern: string) => {
  return { type: RuleTypeEnum.DELETE_RULE, payload: pattern };
};
