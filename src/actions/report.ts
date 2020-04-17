import { Action } from "redux";

export enum ReportTypeEnum {
  ADD_REPORT = "ADD_REPORT",
  DELETE_REPORT = "DELETE_REPORT"
}

const { ADD_REPORT, DELETE_REPORT } = ReportTypeEnum;

export interface ReportAction extends Action {
  payload: {
    hostname: string;
    href?: string;
    type?: string;
  };
}

export function addReport(hostname: string, href: string, type?: string): ReportAction {
  return { type: ADD_REPORT, payload: { hostname, href, type } };
}

export function deleteReport(hostname: string): ReportAction {
  return { type: DELETE_REPORT, payload: { hostname } };
}
