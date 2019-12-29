import { handleActions } from "redux-actions";
import { setProxy } from "../actions/proxy";

export default handleActions(
  {
    [setProxy.toString()]: (
      state: { val: string },
      { payload: { proxy } }: { payload: { proxy: string } }
    ) => ({ ...state, val: proxy })
  },
  { val: "127.0.0.1:1080" }
);
