import { ReportAction, ReportTypeEnum } from "@/actions/report";

export type ReportState = Array<{
  hostname: string;
  href: string;
  timestamp: number;
}>;

const ReportReducer = (state: ReportState, action: ReportAction) => {
  const { type, payload } = action;

  switch (type) {
    case ReportTypeEnum.TO_REPORT:
      const { hostname, href } = new URL(payload);
      const _state = state.slice();
      const lastIndex = _state.findIndex(it => it.hostname === hostname);
      if (lastIndex >= 0) {
        _state[lastIndex] = {
          hostname: hostname,
          href: href,
          timestamp: Date.now()
        };
        return _state;
      }

    default:
      return state;
  }
};

export default ReportReducer;
