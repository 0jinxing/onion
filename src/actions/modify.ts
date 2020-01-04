import { createAction } from "redux-actions";

// types
export type ModifyState = { val: boolean };

export const createModify = createAction("CREATE_MODIFY");
export const saveModify = createAction("SAVE_MODIFY");
