import { handleActions, Action } from "redux-actions";
import { report, Report } from "@/actions/report";

export default handleActions(
  {
    [String(report)]: (state: Report[], action: Action<string>) => {
      const { hostname, href } = new URL(action.payload);
      const delInd = state.findIndex(rp => rp.hostname === hostname);

      let _state = state;
      if (delInd < 0) {
        _state = [{ hostname, href, timestamp: Date.now() }, ...state];
      } else {
        _state = [
          { hostname, href, timestamp: Date.now() },
          ...state.slice(0, delInd),
          ...state.slice(delInd + 1, state.length)
        ];
      }
      return _state.slice(0, 20);
    }
  },
  []
);
