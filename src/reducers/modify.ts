import { handleActions } from "redux-actions";
import { createModify, saveModify } from "@/actions/modify";

export default handleActions(
  {
    [String(createModify)]: () => true,
    [String(saveModify)]: () => false
  },
  false
);
