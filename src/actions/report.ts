import { createAction } from "redux-actions";

// types
export type Report = { hostname: string; href: string; timestamp: number };
export type ReportState = { val: Report[] };
export type ReportPayload = { url: string };

export const report = createAction("REPORT", (url: string) => ({ url }));
