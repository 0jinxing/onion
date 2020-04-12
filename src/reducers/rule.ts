import { RuleTypeEnum, RuleAction } from "@/actions/rule";

export type Rule = {
  pattern: string;
  timestamp: number;
};

export type RuleState = Array<Rule>;

const { ADD_RULE, DELETE_RULE } = RuleTypeEnum;

const RuleReducer = (state: RuleState = [], action: RuleAction) => {
  const { type, payload } = action;
  const _state = state.slice();

  switch (type) {
    case ADD_RULE: {
      const delIndex = state.findIndex((i) => i.pattern === payload);
      if (delIndex >= 0) {
        _state.splice(delIndex, 1);
      }
      return [..._state, { pattern: payload, timestamp: Date.now() }];
    }

    case DELETE_RULE: {
      const delIndex = _state.findIndex((it) => it.pattern === payload);
      if (delIndex >= 0) {
        _state.splice(delIndex, 1);
      }
      return _state;
    }

    default:
      return state;
  }
};

export default RuleReducer;
