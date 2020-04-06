import { Action } from "redux";

export enum LoadingTypeEnum {
  START_LOADING = "START_LOADING",
  END_LOADING = "END_LOADING",
}

const { START_LOADING, END_LOADING } = LoadingTypeEnum;

export interface LoadingAction extends Action {
  payload: string;
}

export function startLoading(namespace: string): LoadingAction {
  return { type: START_LOADING, payload: `@@loading/${namespace}` };
}

export function endLoading(namespace: string): LoadingAction {
  return { type: END_LOADING, payload: `@@loading/${namespace}` };
}
