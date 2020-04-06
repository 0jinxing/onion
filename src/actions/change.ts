import { Action } from "redux";

export enum ChangeTypeEnum {
  CREATE_CHANGE = "CREATE_CHANGE",
  SAVE_CHANGE = "SAVE_CHANGE",
}

const { CREATE_CHANGE, SAVE_CHANGE } = ChangeTypeEnum;

export interface ChangeAction extends Action {
  type: ChangeTypeEnum;
}

export function createChange(): ChangeAction {
  return { type: CREATE_CHANGE };
}

export function saveChange(): ChangeAction {
  return { type: SAVE_CHANGE };
}
