import { ReportAction, ReportTypeEnum } from "@/actions/report";

export type Report = {
  hostname: string;
  mime: string;
  timestamp: number;
};

export type ReportState = Array<Report>;

const { ADD_REPORT, DELETE_REPORT } = ReportTypeEnum;

const ReportReducer = (state: ReportState = [], action: ReportAction) => {
  const { type, payload } = action;
  const _state = state.slice();

  switch (type) {
    case ADD_REPORT: {
      const delIndex = _state.findIndex(
        (it) => it.hostname === payload.hostname
      );

      if (delIndex >= 0) {
        _state.splice(delIndex, 1);
      }
      _state.unshift({
        hostname: payload.hostname,
        mime: payload.mime || "*",
        timestamp: Date.now(),
      });
      return _state.splice(0, 100);
    }
    case DELETE_REPORT: {
      const delIndex = _state.findIndex((i) => i.hostname === payload.hostname);
      if (delIndex >= 0) {
        _state.splice(delIndex, 1);
      }
      return _state;
    }

    default:
      return state;
  }
};

export default ReportReducer;
