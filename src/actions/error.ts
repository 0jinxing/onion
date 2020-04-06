import { Action } from "redux";

export enum ErrorTypeEnum {
  THROW_ERROR = "THROW_ERROR",
  CATCH_ERROR = "CATCH_ERROR",
}

const { THROW_ERROR, CATCH_ERROR } = ErrorTypeEnum;

export interface ErrorAction extends Action {
  payload: { namespace: string; error?: Error };
}

export function throwError(namespace: string, error: Error): ErrorAction {
  return { type: THROW_ERROR, payload: { namespace, error } };
}

export function catchError(namespace: string): ErrorAction {
  return { type: CATCH_ERROR, payload: { namespace } };
}
