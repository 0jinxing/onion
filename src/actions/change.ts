import { Action } from "redux";

export enum ChangeTypeEnum {
  "CREATE_CHANGE",
  "SAVE_CHANGE"
}

export interface ChangeAction extends Action {
  type: ChangeTypeEnum;
}

export const createChange = () => {
  return { type: "CREATE_CHANGE" };
};

export const saveChange = () => {
  return { type: "SAVE_CHANGE" };
};
