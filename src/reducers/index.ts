import { handleActions } from "redux-actions";
import actions from "../actions";

const { allow, disallow, toggle, updateActionIcon } = (actions as unknown) as {
  allow: string;
  disallow: string;
  toggle: string;
  updateActionIcon: string;
};

const reducer = handleActions(
  {
    [allow]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [disallow]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [toggle]: (
      state: { rules: Array<string> },
      { payload: { url } }: { payload: { url: string } }
    ) => ({
      // @TODO
      ...state
    }),
    [updateActionIcon]: (
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
