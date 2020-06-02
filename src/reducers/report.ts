import { ReportAction, ReportTypeEnum } from "@/actions/report";

export type Report = {
  hostname: string;
  href: string;
  type: string;
  timestamp: number;
};

const { ADD_REPORT, DELETE_REPORT } = ReportTypeEnum;

const ReportReducer = (state: Report[] = [], action: ReportAction) => {
  const { type, payload } = action;
  const _state = state.slice();

  switch (type) {
    case ADD_REPORT: {
      const delIndex = _state.findIndex(it => it.href === payload.href);

      if (delIndex >= 0) {
        _state.splice(delIndex, 1);
      }
      _state.unshift({
        hostname: payload.hostname,
        href: payload.href || payload.hostname,
        type: payload.type || "--",
        timestamp: Date.now()
      });
      return _state.splice(0, 100);
    }
    case DELETE_REPORT: {
      return _state.filter(i => i.hostname !== payload.hostname);
    }

    default:
      return state;
  }
};

export default ReportReducer;
