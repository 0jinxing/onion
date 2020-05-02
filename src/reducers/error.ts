import { ErrorAction, ErrorTypeEnum } from "@/actions/error";

export type ErrorState = { [key: string]: Error | undefined };

export default function errorReducer(state: ErrorState = {}, action: ErrorAction) {
  if (action.type === ErrorTypeEnum.THROW_ERROR) {
    return {
      ...state,
      [action.payload.namespace]: action.payload.error
    };
  } else if (action.type === ErrorTypeEnum.CATCH_ERROR) {
    const namespace = Object.keys(state).find(key => state[key] === action.payload.error);
    return {
      ...state,
      [namespace!]: void 0
    };
  }
  return state;
}
