import { handleActions } from "redux-actions";
import actions from "../actions";

const { allow, disallow, toggle, updateActionIcon } = actions;

const reducer = handleActions(
  {
    [allow.toString()]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [disallow.toString()]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [toggle.toString()]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [updateActionIcon.toString()]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    })
  },
  { rules: [] }
);

export default reducer;
