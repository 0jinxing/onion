import { createAction } from "redux-actions";
import { Action } from "redux";

export type ModifyAction = Action<{}>;

export const createModify = createAction("CREATE_MODIFY");
export const saveModify = createAction("SAVE_MODIFY");
