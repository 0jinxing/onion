import { handleActions, Action } from "redux-actions";
import { report } from "@/actions/report";

export type Report = { hostname: string; timestamp: number };
export type ReportState = { val: Report[] };
export type ReportPayload = { url: string };

export default handleActions(
  {
    [report.toString()]: (
      state: ReportState,
      action: Action<ReportPayload>
    ) => {
      const { hostname } = new URL(action.payload.url);
      const delInd = state.val.findIndex(rp => rp.hostname === hostname);
      if (delInd < 0) {
        return {
          val: [{ hostname, timestamp: Date.now() }, ...state.val].slice(0, 20)
        };
      }
      const val = [
        { hostname, timestamp: Date.now() },
        ...state.val.slice(0, delInd),
        ...state.val.slice(delInd + 1, state.val.length)
      ];
      return { val };
    }
  },
  { val: [] }
);
