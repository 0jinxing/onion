import { handleActions, Action } from "redux-actions";
import { setProxy, ProxyPayload, ProxyState } from "@/actions/proxy";

export default handleActions(
  {
    [setProxy.toString()]: (
      state: ProxyState,
      action: Action<ProxyPayload>
    ) => ({ ...state, val: action.payload.proxy })
  },
  { val: "127.0.0.1:1080" }
);
