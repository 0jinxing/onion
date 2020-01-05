import { handleActions, Action } from "redux-actions";
import { setProxy } from "@/actions/proxy";

export default handleActions(
  {
    [String(setProxy)]: (_, action: Action<string>) => action.payload
  },
  ""
);
