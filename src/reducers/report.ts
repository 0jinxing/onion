import { handleActions, Action } from "redux-actions";
import { report, ReportState, ReportPayload } from "@/actions/report";

export default handleActions(
  {
    [report.toString()]: (
      state: ReportState,
      action: Action<ReportPayload>
    ) => {
      const { hostname, href } = new URL(action.payload.url);
      const delInd = state.val.findIndex(rp => rp.hostname === hostname);
      if (delInd < 0) {
        return {
          val: [{ hostname, href, timestamp: Date.now() }, ...state.val].slice(
            0,
            20
          )
        };
      }
      const val = [
        { hostname, href, timestamp: Date.now() },
        ...state.val.slice(0, delInd),
        ...state.val.slice(delInd + 1, state.val.length)
      ];
      return { val };
    }
  },
  { val: [] }
);
