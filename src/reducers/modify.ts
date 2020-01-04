import { handleActions } from "redux-actions";
import { createModify, saveModify } from "@/actions/modify";

export default handleActions(
  {
    [createModify.toString()]: () => ({ val: true }),
    [saveModify.toString()]: () => ({ val: false })
  },
  { val: false }
);
