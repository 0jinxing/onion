import { Action } from "redux";

export enum ReportTypeEnum {
  ADD_REPORT = "ADD_REPORT",
  DELETE_REPORT = "DELETE_REPORT",
}

const { ADD_REPORT, DELETE_REPORT } = ReportTypeEnum;

export interface ReportAction extends Action {
  payload: {
    hostname: string;
    mime?: string;
  };
}

export function addReport(hostname: string, mime?: string): ReportAction {
  return { type: ADD_REPORT, payload: { hostname, mime } };
}

export function deleteReport(hostname: string): ReportAction {
  return { type: DELETE_REPORT, payload: { hostname } };
}
