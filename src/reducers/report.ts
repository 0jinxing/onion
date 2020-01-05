import { handleActions, Action } from "redux-actions";
import { report, Report } from "@/actions/report";

export default handleActions(
  {
    [String(report)]: (state: Report[], action: Action<string>) => {
      const { hostname, href } = new URL(action.payload);
      const delInd = state.findIndex(rp => rp.hostname === hostname);

      let nextState = state;
      if (delInd < 0) {
        nextState = [...state, { hostname, href, timestamp: Date.now() }];
      } else {
        nextState = [
          ...state.slice(0, delInd),
          ...state.slice(delInd + 1, state.length),
          { hostname, href, timestamp: Date.now() }
        ];
      }
      return nextState.slice(Math.max(nextState.length - 20, 0), 20);
    }
  },
  []
);
