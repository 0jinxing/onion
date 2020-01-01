import { handleActions } from "redux-actions";
import { createModify, saveModify } from "@/actions/modify";

export default handleActions(
  {
    [createModify.toString()]: () => {
      return { val: true };
    },
    [saveModify.toString()]: () => {
      return { val: false };
    }
  },
  { val: false }
);
