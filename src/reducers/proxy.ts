import { handleActions } from "redux-actions";
import { setProxy } from "../actions/proxy";

export default handleActions(
  {
    [setProxy.toString()]: (
      state: { val: string },
      { payload: { val } }: { payload: { val: string } }
    ) => ({ ...state, val })
  },
  {
    val: "PROXY 127.0.0.1:1080"
  }
);
