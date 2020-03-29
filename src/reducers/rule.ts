import { RuleTypeEnum, RuleAction } from "@/actions/rule";

export type RuleState = Array<{
  pattern: string;
  timestamp: number;
}>;

const RuleReducer = (state: RuleState, action: RuleAction) => {
  const { type, payload } = action;

  switch (type) {
    case RuleTypeEnum.ADD_RULE:
      return [...state, { pattern: payload, timestamp: Date.now() }];

    case RuleTypeEnum.DELETE_RULE:
      const _state = state.slice();
      const delIndex = _state.findIndex(it => it.pattern === payload);
      _state.splice(delIndex, 1);
      return _state;

    default:
      return state;
  }
};

export default RuleReducer;
