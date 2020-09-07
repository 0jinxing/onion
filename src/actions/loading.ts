import { Action } from "redux";

export enum LoadingTypeEnum {
  START_LOADING = "loading/start_loading",
  END_LOADING = "loading/end_loading"
}

const { START_LOADING, END_LOADING } = LoadingTypeEnum;

export interface LoadingAction extends Action {
  payload: string;
}

export function genLoadingNamespace(key: string) {
  return `@@loading/${key}`;
}

export function startLoading(key: string): LoadingAction {
  return { type: START_LOADING, payload: genLoadingNamespace(key) };
}

export function endLoading(key: string): LoadingAction {
  return { type: END_LOADING, payload: genLoadingNamespace(key) };
}
