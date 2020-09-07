import { Action } from "redux";

export enum ErrorTypeEnum {
  THROW_ERROR = "error/throw_error",
  CATCH_ERROR = "error/catch_error"
}

interface ThrowErrorAction extends Action {
  type: ErrorTypeEnum.THROW_ERROR;
  payload: { namespace: string; error: Error };
}

interface CatchErrorAction extends Action {
  type: ErrorTypeEnum.CATCH_ERROR;
  payload: { error: Error };
}

export type ErrorAction = ThrowErrorAction | CatchErrorAction;

export function genErrorNamespace(key: string) {
  return `@@error/${key}`;
}

export function throwError(key: string, error: Error): ErrorAction {
  return { type: ErrorTypeEnum.THROW_ERROR, payload: { namespace: genErrorNamespace(key), error } };
}

export function catchError(error: Error): ErrorAction {
  return { type: ErrorTypeEnum.CATCH_ERROR, payload: { error } };
}
