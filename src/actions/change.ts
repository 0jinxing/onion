import { Action } from "redux";

export enum ChangeTypeEnum {
  CREATE_CHANGE = "change/create_change",
  SAVE_CHANGE = "change/save_change",
}

export interface ChangeAction extends Action {
  type: ChangeTypeEnum;
}

export function createChange(): ChangeAction {
  return { type: ChangeTypeEnum.CREATE_CHANGE };
}

export function saveChange(): ChangeAction {
  return { type: ChangeTypeEnum.SAVE_CHANGE };
}
