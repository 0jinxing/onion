import { Action } from "redux";

export enum ReportTypeEnum {
  "TO_REPORT"
}

export interface ReportAction extends Action {
  payload: string;
}

export const toReport = (url: string) => {
  return { type: "TO_REPORT", payload: url };
};
