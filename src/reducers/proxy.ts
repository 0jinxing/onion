import { handleActions, Action } from "redux-actions";
import { setProxy } from "@/actions/proxy";

export default handleActions(
  {
    [String(setProxy)]: (_, action: Action<string>) => action.payload
  },
  "127.0.0.1:1080"
);
