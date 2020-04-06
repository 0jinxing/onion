import { LoadingAction, LoadingTypeEnum } from "@/actions/loading";

const { START_LOADING, END_LOADING } = LoadingTypeEnum;

export type LoadingState = { [key: string]: boolean };

function loadingReducer(
  state: LoadingState = {},
  action: LoadingAction
) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return { ...state, [payload]: true };
    case END_LOADING:
      return { ...state, [payload]: false };
    default:
      return state;
  }
}

export default loadingReducer;
