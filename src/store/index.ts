import { createStore } from "redux";
import { ProxyState } from "@/reducers/proxy";
import { ReportState } from "@/reducers/report";
import { RuleState } from "@/reducers/rule";

export type State = {
  change: boolean;
  proxy: ProxyState;
  rule: RuleState;
  report: ReportState;
};
